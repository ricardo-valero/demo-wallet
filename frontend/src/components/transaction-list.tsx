import { useDialog } from '@ark-ui/react'
import { Icon } from '@iconify-icon/react'
import { useState } from 'react'
import type { Transaction } from '../data'
import { TransactionDetail } from './transaction-detail'

const capitalizeFirstLetter = (str: string) => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function randomNum(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const randomOklch = () => {
  const lightness = randomNum(0.7, 0.9)
  const chroma = randomNum(0.1, 0.2)
  const hue = randomNum(0, 360)
  return `${lightness.toFixed(2)} ${chroma.toFixed(2)} ${hue.toFixed(0)}`
}

const randomRadial = () => {
  const color = randomOklch()
  const first = 20 + Math.random() * 55
  const second = 35 + Math.random() * 55
  const third = 35 + Math.random() * 55
  const fourth = 20 + Math.random() * 55
  return `${first}% ${second}% at ${third}% ${fourth}%, oklch(${color}) 0%, oklch(${color} / 0) 100%`
}

const randomLinear = () => {
  const color1 = randomOklch()
  const color2 = randomOklch()
  const angle = 115 + Math.random() * 20
  return `${angle}deg, oklch(${color1}) 0%, oklch(${color2}) 100%`
}

const randomGradient = () => {
  const radial1 = randomRadial()
  const radial2 = randomRadial()
  const radial3 = randomRadial()
  const radial4 = randomRadial()
  const linear = randomLinear()
  return `
    radial-gradient(${radial1}),
    radial-gradient(${radial2}),
    radial-gradient(${radial3}),
    radial-gradient(${radial4}),
    linear-gradient(${linear})
    `
}

const NumberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
})

const formatDate = (dateStr: string | Date) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  if (Math.abs(diffDays) <= 7) {
    return date.toLocaleString('en-US', { weekday: 'long' })
  }
  return date.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
  })
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
  const cardClass = 'bg-white rounded-lg shadow'
  const dailyPoints = NumberFormatter.format(Math.random() * 200_000)
  const available = limit - balance
  const now = new Date()
  const currentMonth = now.toLocaleString('default', { month: 'long' })

  const [selected, setSelected] = useState<Transaction | null>(null)
  const dialog = useDialog({
    closeOnEscape: true,
    closeOnInteractOutside: true,
    onOpenChange: ({ open }) => {
      if (!open) {
        handleClose()
      }
    },
  })
  const handleOpen = (transaction: Transaction) => {
    dialog.setOpen(true)
    setSelected(transaction)
  }

  const handleClose = () => {
    setSelected(null)
  }

  return (
    <div className="transaction-list p-4 space-y-6">
      <div className="flex gap-4">
        <div className="flex-auto flex flex-col gap-4">
          {/* Card Balance Block */}
          <div
            className={`flex-auto flex flex-wrap justify-between gap-2 p-4 ${cardClass}`}
          >
            <h2 className="text-lg font-semibold">Card Balance</h2>
            <div className="flex-auto flex flex-col items-end text-right">
              <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
              <div className="text-gray-400">
                ${available.toFixed(2)} Available
              </div>
            </div>
          </div>
          {/* Daily Points Block */}
          <div
            className={`flex-auto flex flex-wrap justify-between gap-2 p-4 ${cardClass}`}
          >
            <h2 className="text-lg font-semibold">Daily Points</h2>
            <div className="flex-auto flex flex-col items-end text-right">
              <div className="text-gray-400 text-lg">{dailyPoints}</div>
            </div>
          </div>
        </div>
        {/* No Payment Due Block */}
        <div
          className={`flex-auto flex flex-wrap justify-between gap-2 p-4 ${cardClass}`}
        >
          <div>
            <h2 className="text-lg font-semibold">No Payment Due</h2>
            <div className="text-green-600">
              You've paid your {currentMonth} balance.
            </div>
          </div>
          <div className="flex-auto flex flex-col justify-end items-end text-right">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              {/* <svg
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
              </svg> */}
              <Icon
                icon="fa6-solid:check"
                height="100%"
                width="100%"
                className="p-4 text-green-600"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Latest Transactions Block */}
      <h1 className="text-2xl font-semibold mb-4">Latest Transactions</h1>
      <div className={`${cardClass} overflow-hidden`}>
        {transactions.slice(0, 10).map((transaction) => {
          return (
            <div
              key={transaction.id}
              className="px-4 py-2 flex items-center justify-between border-b border-b-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-100"
              onClick={() => handleOpen(transaction)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleOpen(transaction)
              }}
              role="button"
              tabIndex={0}
              aria-label={`Transaction ${transaction.id}`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 aspect-square rounded-lg flex items-center justify-center text-white"
                  style={{ background: randomGradient(), filter: '8px' }}
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
                  {transaction.description && (
                    <div className="text-sm text-gray-500">
                      <span className="px-0.5">
                        {transaction.status === 'pending' && (
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                            {capitalizeFirstLetter(transaction.status)}
                          </span>
                        )}
                      </span>
                      {transaction.description}
                    </div>
                  )}
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
      <TransactionDetail transaction={selected} dialog={dialog} />
    </div>
  )
}
