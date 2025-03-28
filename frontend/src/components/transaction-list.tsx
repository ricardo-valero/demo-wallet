export interface Transaction {
  id: string
  type: 'payment' | 'credit'
  amount: number
  name?: string
  description?: string
  date: string | Date
  status?: 'pending' | 'approved'
  authorizedUser?: string
}

export const TransactionList = ({
  balance,
  limit,
  transactions,
}: {
  balance: number
  limit: number
  transactions: Transaction[]
}) => {
  const dailyPoints = (Math.random() * 200).toFixed(0)
  const availableBalance = limit - balance
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const getRandomGradient = () => {
    const hue = Math.floor(Math.random() * 360)
    return `linear-gradient(135deg, hsl(${hue}, 70%, 20%) 0%, hsl(${hue}, 70%, 30%) 100%)`
  }

  const formatDate = (dateStr: string | Date) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays <= 7) {
      return date.toLocaleDateString('en-US', { weekday: 'long' })
    }
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
    })
  }

  return (
    <div className="transaction-list p-4 space-y-6">
      <div className="flex gap-4">
        <div className="flex-auto flex flex-col gap-4">
          {/* Card Balance Block */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold">Card Balance</h2>
            <div className="mt-2 text-right">
              <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
              <div className="text-gray-400">
                ${availableBalance.toFixed(2)} Available
              </div>
            </div>
          </div>
          {/* Daily Points Block */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold">Daily Points</h2>
            <div className="mt-2 text-right">
              <div className="text-gray-400 text-lg">{dailyPoints}K</div>
            </div>
          </div>
        </div>
        {/* No Payment Due Block */}
        <div className="flex-auto flex flex-col  bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold">No Payment Due</h2>
          <div className="mt-2 flex-auto flex flex-col justify-between">
            <div className="text-green-600">
              You've paid your {currentMonth} balance.
            </div>
            <div className="ml-auto">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="check"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Transactions Block */}
      <h1 className="text-2xl font-semibold mb-4">Latest Transactions</h1>
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="space-y-4">
          {transactions.slice(0, 10).map((transaction) => {
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                    style={{ background: getRandomGradient() }}
                  >
                    <span className="text-xl font-semibold">
                      {transaction.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {transaction.name ??
                        capitalizeFirstLetter(transaction.type)}
                    </div>
                    <div className="flex">
                      {transaction.status === 'pending' && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          {capitalizeFirstLetter(transaction.status)}
                        </span>
                      )}
                      {transaction.description && (
                        <div className="text-sm text-gray-500">
                          {transaction.description}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      {transaction.authorizedUser && (
                        <>
                          <span>{transaction.authorizedUser}</span>
                          <span>—</span>
                        </>
                      )}
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-medium ${transaction.type === 'payment' ? 'text-green-600' : ''}`}
                  >
                    {transaction.type === 'payment' ? '+' : ''}$
                    {transaction.amount.toFixed(2)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
