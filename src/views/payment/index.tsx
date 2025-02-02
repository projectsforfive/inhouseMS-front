'use client'
// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { PaymentType } from '@/types/paymentTypes'

// Component Imports
import HistoryTable from './HistoryTable'
// import UserListCards from './UserListCards'



const UserList = ({ userData }: { userData?: PaymentType[] }) => {

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <UserListCards />
      </Grid> */}
      <Grid item xs={12}>
        <HistoryTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default UserList
