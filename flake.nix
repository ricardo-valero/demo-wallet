{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };
  outputs = {nixpkgs, ...}: let
    systems = nixpkgs.lib.systems.flakeExposed;
    mkNodejs = pkgs: nodejs: {
      inherit nodejs;
      corepack = pkgs.runCommand "corepack-enable" {} ''
        mkdir -p $out/bin
        ${nodejs}/bin/corepack enable --install-directory $out/bin
      '';
    };
    mkShellApps = pkgs:
      pkgs.lib.mapAttrs (
        name: value:
          if !(pkgs.lib.isDerivation value) && pkgs.lib.isAttrs value
          then pkgs.writeShellApplication (value // {inherit name;})
          else value
      );
  in {
    packages = nixpkgs.lib.genAttrs systems (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
        nodejs = mkNodejs pkgs pkgs.nodejs-slim_22;
      in
        mkShellApps pkgs {
          install = {
            runtimeInputs = builtins.attrValues nodejs;
            text = ''
              cd frontend
              pnpm install
            '';
            meta.description = "Pnpm - install dependencies";
          };
          build = {
            runtimeInputs = builtins.attrValues nodejs;
            text = ''
              cd frontend
              pnpm vite build --base "''${BASE_PATH:-/}"
            '';
            meta.description = "Vite - build project";
          };
        }
    );
    devShells = nixpkgs.lib.genAttrs systems (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      nodejs = mkNodejs pkgs pkgs.nodejs-slim_22;
    in {
      default = pkgs.mkShell {
        packages = builtins.attrValues (
          {inherit (pkgs) nixd nil alejandra;}
          // nodejs
        );
      };
    });
  };
}
