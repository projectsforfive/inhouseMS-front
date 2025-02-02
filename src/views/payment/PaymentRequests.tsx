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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'


// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import type { UsersType } from '@/types/apps/userTypes'

type Props = {
  open: boolean
  handleClose: () => void
  userData?: UsersType[]
  setData: (data: UsersType[]) => void
}

type FormValidateType = {
  method: 'Paypal' | 'Payoneer' | 'Wise' | 'Crypto'
  username: string
  email: string
  role: string
  plan: string
  status: string
}

type FormNonValidateType = {
  company: string
  country: string
  contact: string
}

// Vars
const initialData = {
  company: '',
  country: '',
  contact: ''
}

const AddUserDrawer = (props: Props) => {
  // Props
  const { open, handleClose, userData, setData } = props

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
      method: '',
      username: '',
      email: '',
      role: '',
      plan: '',
      status: ''
    }
  })

  const onSubmit = (data: FormValidateType) => {
    const newUser: UsersType = {
      id: (userData?.length && userData?.length + 1) || 1,
      avatar: `/images/avatars/${Math.floor(Math.random() * 8) + 1}.png`,
      method: data.method,
      username: data.username,
      email: data.email,
      role: data.role,
      currentPlan: data.plan,
      status: data.status,
      company: formData.company,
      country: formData.country,
      contact: formData.contact
    }

    setData([...(userData ?? []), newUser])
    handleClose()
    setFormData(initialData)
    resetForm({ method: '', username: '', email: '', role: '', plan: '', status: '' })
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
            <InputLabel id='io'>I/O</InputLabel>
            <Select
              fullWidth
              id='io'
              value={formData.io}
              onChange={e => setFormData({ ...formData, io: e.target.value })}
              label='I/O'
              labelId='io'
            >
              <MenuItem value='IN'>IN</MenuItem>
              <MenuItem value='OUT'>OUT</MenuItem>
             
            </Select>
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
            {errors.role && <FormHelperText error>This field is required.</FormHelperText>}
          </FormControl>

          <Controller
            name='client'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Client'
                placeholder=' '
                {...(errors.client && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='address'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Address'
                placeholder=' '
                {...(errors.address && { error: true, helperText: 'This field is required.' })}
              />
            )}
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
