// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'


// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import type { PaymentType } from '@/types/paymentTypes'


type Props = {
  open: boolean
  handleClose: () => void
  paymentData?: PaymentType[]
  setData: (data: PaymentType[]) => void
}

type FormValidateType = {
  io: 'In' | 'Out'
  method: 'Paypal' | 'Payoneer' | 'Wise' | 'Crypto'
}

type FormNonValidateType = {
  country: string
  client: string
  address: string
  amount: number
  description: string
}

// Vars
const initialData = {
  country: '',
  client: '',
  address: '',
  amount: 0,
  description: ''
}

const AddUserDrawer = (props: Props) => {
  // Props
  const { open, handleClose, paymentData, setData } = props

  // States
  const [formData, setFormData] = useState<FormNonValidateType>(initialData)

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      io: 'In',
      method: 'Paypal',
    }
  })

  const onSubmit = (data: FormValidateType) => {
    const newPayment: PaymentType = {
      id: (paymentData?.length && paymentData?.length + 1) || 1,
      io: data.io,
      method: data.method,
      client: formData.client,
      date: new Date().toLocaleDateString(),
      address: formData.address,
      amount: formData.amount,
      country: formData.country,
      status: 'Pending',
      action: true,
      description: formData.description,
    }
    
    console.log(newPayment)
    // setData([...(paymentData ?? []), newPayment])
    handleClose()
    setFormData(initialData)
    resetForm({ io: 'In', method: 'Paypal'})
  }

  const handleReset = () => {
    handleClose()
    setFormData(initialData)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between pli-5 plb-4'>
        <Typography variant='h5'>REQUEST</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='ri-close-line text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-5'>
          <FormControl fullWidth>
            <InputLabel id='io' error={Boolean(errors.io)}>I/O</InputLabel>
            <Controller
              name='io'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select label='Select I/O'  {...field} error={Boolean(errors.io)}>
                  <MenuItem value='In'>IN</MenuItem>
                  <MenuItem value='Out'>OUT</MenuItem>
                </Select>
              )}
            />
            {errors.io && <FormHelperText error>This field is required.</FormHelperText>}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='method' error={Boolean(errors.method)}>
              Select Method
            </InputLabel>
            <Controller
              name='method'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select label='Select Method' {...field} error={Boolean(errors.method)}>
                  <MenuItem value='Paypal'>Paypal</MenuItem>
                  <MenuItem value='Payoneer'>Payoneer</MenuItem>
                  <MenuItem value='Wise'>Wise</MenuItem>
                  <MenuItem value='Crypto'>Crypto</MenuItem>
                </Select>
              )}
              {...(errors.method && { error: true, helperText: 'This field is required.' })}
            />
            {errors.method && <FormHelperText error>This field is required.</FormHelperText>}
          </FormControl>

          <TextField
            fullWidth
            label='Client'
            type='text'
            placeholder='client name'
            value={formData.client}
            onChange={e => setFormData({ ...formData, client: e.target.value })}
          />

          <TextField
            fullWidth
            label='Address'
            placeholder=' '
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
          />

          <TextField
            fullWidth
            label='Amount'
            type='number'
            placeholder='$100'
            value={formData.amount}
            onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
          />

          <FormControl fullWidth>
            <InputLabel id='country'>Select Country</InputLabel>
            <Select
              fullWidth
              id='country'
              value={formData.country}
              onChange={e => setFormData({ ...formData, country: e.target.value })}
              label='Select Country'
              labelId='country'
            >
              <MenuItem value='India'>India</MenuItem>
              <MenuItem value='USA'>USA</MenuItem>
              <MenuItem value='Australia'>Australia</MenuItem>
              <MenuItem value='Germany'>Germany</MenuItem>
            </Select>
          </FormControl>
          <TextareaAutosize
            maxRows={10}
            className='min-h-[100px] p-2'
            placeholder='Description'
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='outlined' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddUserDrawer
