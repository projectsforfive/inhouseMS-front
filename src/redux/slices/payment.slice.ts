import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PaymentType } from '@/types/paymentTypes'; // Ensure PaymentType is correctly defined

// Define a type for total amount
interface TotalAmount {
  income: number;
  expense: number;
}

// Define a type for the initial state
interface PaymentState {
  tableData: PaymentType[]; // Assuming tableData will store PaymentType objects
  totalAmount: TotalAmount; // Use the defined TotalAmount type
  loading: boolean; // To manage loading state
  error: string | null; // To manage error state
}

// Set the initial state
const initialState: PaymentState = {
  totalAmount: {
    income: 0,
    expense: 0
  },
  tableData: [
    {
      id: 2,
      date: '2023-01-01',
      method: 'Paypal',
      address: 'example@gmail.com',
      amount: 100,
      country: 'India',
      client: 'Client',
      status: 'Pending',
      action: true,
      description: 'Description',
      io: 'In'
    },
    {
      id: 3,
      date: '2023-01-01',
      method: 'Paypal',
      address: 'example@gmail.com',
      amount: 1000,
      country: 'India',
      client: 'Client',
      status: 'Pending',
      action: true,
      description: 'Description',
      io: 'Out'
    }
  ],
  loading: true, // Initial loading state
  error: null // Initial error state
};

// API URL
const API_URL = 'https://api.example.com/payments';

// Create an async thunk for fetching payments from the API
export const fetchPayments = createAsyncThunk<PaymentType[], void>('payment/fetchPayments', async () => {
  const response = await axios.get(API_URL);
  return response.data as PaymentType[]; // Directly return the data
});

// Create an async thunk for adding a payment
export const addPaymentToAPI = createAsyncThunk('payment/addPayment', async (newPayment: PaymentType) => {
  const response = await axios.post(API_URL, newPayment);
  return response.data as PaymentType; // Return the added payment
});

// Create an async thunk for updating a payment
export const updatePaymentInAPI = createAsyncThunk(
  'payment/updatePayment',
  async ({ id, updatedPayment }: { id: number; updatedPayment: PaymentType }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedPayment);
    return response.data as PaymentType; // Return the updated payment
  }
);

// Create an async thunk for deleting a payment
export const deletePaymentFromAPI = createAsyncThunk('payment/deletePayment', async (id: number) => {
  await axios.delete(`${API_URL}/${id}`); // Delete the payment by ID
  return id; // Return the deleted ID
});

// Create the payment slice
export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updateTotalAmount: (state, action: PayloadAction<TotalAmount>) => {
      state.totalAmount = action.payload; // Update the totalAmount object
    },
    calculateTotals: state => {
      state.totalAmount.income = state.tableData.reduce(
        (acc, payment) => (payment.io === 'In' ? acc + payment.amount : acc),
        0 // Sum income
      );
      state.totalAmount.expense = state.tableData.reduce(
        (acc, payment) => (payment.io === 'Out' ? acc + payment.amount : acc),
        0 // Sum expenses
      );
    }
  },
  extraReducers: builder => {
    // Fetch Payments
    builder
      .addCase(fetchPayments.pending, state => {
        state.loading = true; // Set loading state to true
        state.error = null; // Reset error state
      })
      .addCase(fetchPayments.fulfilled, (state, action: PayloadAction<PaymentType[]>) => {
        state.loading = false; // Set loading state to false
        state.tableData = action.payload; // Store fetched payments in state
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false; // Set loading state to false
        state.error = action.error.message || 'Failed to fetch payments'; // Set error message
      })
      // Add Payment
      .addCase(addPaymentToAPI.pending, state => {
        state.loading = true; // Set loading state to true during the request
        state.error = null; // Reset error state
      })
      .addCase(addPaymentToAPI.fulfilled, (state, action: PayloadAction<PaymentType>) => {
        state.loading = false; // Set loading to false
        state.tableData.push(action.payload); // Add the new payment to the state
      })
      .addCase(addPaymentToAPI.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.error = action.error.message || 'Failed to add payment'; // Set error message
      })
      // Update Payment
      .addCase(updatePaymentInAPI.pending, state => {
        state.loading = true; // Set loading state to true during the request
        state.error = null; // Reset error state
      })
      .addCase(updatePaymentInAPI.fulfilled, (state, action: PayloadAction<PaymentType>) => {
        state.loading = false; // Set loading to false
        const index = state.tableData.findIndex(payment => payment.id === action.payload.id);
        if (index !== -1) {
          state.tableData[index] = action.payload; // Update the payment in the state
        }
      })
      .addCase(updatePaymentInAPI.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.error = action.error.message || 'Failed to update payment'; // Set error message
      })
      // Delete Payment
      .addCase(deletePaymentFromAPI.pending, state => {
        state.loading = true; // Set loading state to true during the request
        state.error = null; // Reset error state
      })
      .addCase(deletePaymentFromAPI.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false; // Set loading to false
        state.tableData = state.tableData.filter(payment => payment.id !== action.payload); // Filter out the deleted payment
      })
      .addCase(deletePaymentFromAPI.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.error = action.error.message || 'Failed to delete payment'; // Set error message
      });
  }
});

// Export actions
export const { updateTotalAmount, calculateTotals } = paymentSlice.actions;

// Export the reducer
export default paymentSlice.reducer;
