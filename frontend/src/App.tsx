import viteLogo from '/vite.svg'
import reactLogo from './assets/react.svg'
import { TransactionList } from './components/transaction-list'

export function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-between p-2">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="h-8" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="h-8" alt="React logo" />
          </a>
        </div>
        <div className="max-w-4xl mx-auto py-8">
          <TransactionList
            balance={Math.random() * 3000}
            limit={1500}
            transactions={[]}
          />
        </div>
      </div>
    </>
  )
}
