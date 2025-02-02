// Type Imports
// import type { ThemeColor } from '@core/types'

export type PaymentType = {
  id?: number;
  io: 'In' | 'Out';
  method: 'Paypal' | 'Payoneer' | 'Wise' | 'Crypto';
  client: string;
  date: string;
  address: string;
  amount: number;
  country: string;
  status: 'Pending' | 'Success' | 'Failed';
  action: boolean;
  description: string;
};
