{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };
  outputs = {nixpkgs, ...}: let
    systems = nixpkgs.lib.systems.flakeExposed;
  in {
    devShells = nixpkgs.lib.genAttrs systems (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      nodejs = nodejs: {
        inherit nodejs;
        corepack = pkgs.runCommand "corepack-enable" {} ''
          mkdir -p $out/bin
          ${nodejs}/bin/corepack enable --install-directory $out/bin
        '';
      };
    in {
      default = pkgs.mkShell {
        packages = builtins.attrValues (
          {inherit (pkgs) nixd nil alejandra;
          }
          // nodejs pkgs.nodejs-slim_22
        );
      };
    });
  };
}
