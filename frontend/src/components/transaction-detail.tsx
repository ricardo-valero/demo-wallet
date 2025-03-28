import { Dialog, type UseDialogReturn } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { Icon } from '@iconify-icon/react'
import type { Transaction } from '../data'

const formatDateTime = (dateStr: string | Date) => {
  const date = new Date(dateStr)
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const TransactionDetail = ({
  transaction,
  dialog,
}: {
  transaction: Transaction | null
  dialog: UseDialogReturn
}) => {
  if (!transaction) return null
  return (
    <Dialog.RootProvider value={dialog} lazyMount unmountOnExit>
      <Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        <Dialog.Positioner className="fixed right-0 top-0 h-full w-full max-w-md">
          <Dialog.Content className="h-full w-full transform bg-white shadow-xl">
            {/* Header with back button */}
            <div className="flex items-center border-b border-gray-200 p-4">
              <Dialog.CloseTrigger className="text-gray-500 hover:text-gray-700 cursor-pointer">
                {/* <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="chevron-left"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg> */}
                <Icon
                  icon="fa6-solid:chevron-left"
                  height="100%"
                  width="100%"
                  // className="p-4 text-green-600"
                  className="w-6 h-6"
                />
              </Dialog.CloseTrigger>
            </div>

            {/* Transaction amount */}
            <div className="p-6 text-center">
              <div className="text-4xl font-bold">
                {transaction.type === 'payment' ? '+' : ''}$
                {transaction.amount.toFixed(2)}
              </div>
              <div className="mt-2 text-gray-500">{transaction.name}</div>
              <div className="mt-1 text-sm text-gray-400">
                {formatDateTime(transaction.date)}
              </div>
            </div>

            {/* Transaction details */}
            <div className="px-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 flex items-center">
                      {transaction.status === 'pending' ? (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800">
                          Pending
                        </span>
                      ) : transaction.status === 'approved' ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
                          Unknown
                        </span>
                      )}
                    </dd>
                  </div>

                  {transaction.authorizedUser && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Authorized User
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {transaction.authorizedUser}
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Type</dt>
                    <dd className="mt-1 text-sm text-gray-900 capitalize">
                      {transaction.type}
                    </dd>
                  </div>

                  {transaction.description && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Description
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {transaction.description}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  )
}
