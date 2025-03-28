import { generateMock } from '@anatine/zod-mock'
import { faker } from '@faker-js/faker'
import { z } from 'zod'

export type Transaction = z.infer<typeof transactionSchema>

const transactionSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().optional(),
  amount: z.number().min(5).max(200),
  type: z.enum(['payment', 'credit']),
  description: z.string().optional(),
  status: z.enum(['pending', 'approved']),
  authorizedUser: z.string().optional(),
  date: z.date().min(new Date('2025-02-15')).max(new Date('2025-03-28')),
})

export const transactionsMock = generateMock(
  transactionSchema.array().min(1).max(15),
  {
    stringMap: {
      name: () => faker.company.name(),
      authorizedUser: () => faker.person.firstName(),
    },
  },
)
