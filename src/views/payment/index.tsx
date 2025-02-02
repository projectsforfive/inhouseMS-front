'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPayments } from '@/redux/slices/payment.slice'
import { RootState } from '@/redux/index'

// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { PaymentType } from '@/types/paymentTypes'

// Component Imports
import HistoryTable from './HistoryTable'
// import UserListCards from './UserListCards'

const UserList = () => {
  const dispatch = useDispatch<any>()
  const { tableData, loading, error } = useSelector((state: RootState) => state.payment)
  useEffect(() => {
    dispatch(fetchPayments())
  }, [dispatch])

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <UserListCards />
      </Grid> */}
      <Grid item xs={12}>
        <HistoryTable tableData={tableData} />
      </Grid>
    </Grid>
  )
}

export default UserList
