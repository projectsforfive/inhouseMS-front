// Type Imports
// import type { ThemeColor } from '@core/types'

export type PaymentType = {
  id: number
  date: string
  method:'Paypal'|'Payoneer'|'Wise'|'Crypto'
  address: string
  amount: number
  country: string
  client: string
  status: 'Pending'|'Success'|'Failed'
  action: boolean
  description: string
  IO:'In'|'Out'
}
