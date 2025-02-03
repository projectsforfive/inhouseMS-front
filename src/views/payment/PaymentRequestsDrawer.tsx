import { useState, useEffect } from 'react';

// MUI Imports
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';
import { addPaymentToAPI, updatePaymentInAPI } from '@/redux/slices/payment.slice';
import type { PaymentType } from '@/types/paymentTypes';


type Props = {
  open: boolean;
  handleClose: () => void;
  paymentData?: any;
};

const defaultFormData: PaymentType = {
  io: 'In',
  method: 'Paypal',
  country: '',
  client: '',
  address: '',
  amount: 0,
  description: '',
  date: new Date().toLocaleDateString(),
  status: 'Pending',
  action: true,
};

const PaymentRequestsDrawer = (props: Props) => {
  const { open, handleClose, paymentData } = props;
  const dispatch = useDispatch<any>();

  const [formData, setFormData] = useState<PaymentType>(defaultFormData);

  // Effect to populate formData if paymentData is provided
  useEffect(() => {
    if (paymentData && Object.keys(paymentData).length > 0) {
      setFormData({ ...paymentData });
    } else {
      setFormData(defaultFormData);
    }
  }, [paymentData]);

  const [errors, setErrors] = useState<{ io: boolean; method: boolean }>({
    io: false,
    method: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic validation
    const newErrors = {
      io: !formData.io,
      method: !formData.method,
    };

    setErrors(newErrors);

    if (newErrors.io || newErrors.method) {
      return; // Prevent submission if there are errors
    }

    const newPayment: PaymentType = {
      ...formData,

      date: new Date().toLocaleDateString(),
      status: 'Pending',
      action: true,
    };

   paymentData && Object.keys(paymentData).length > 0 ? dispatch(updatePaymentInAPI({ id: paymentData.id, updatedPayment: newPayment })) : dispatch(addPaymentToAPI(newPayment));
    handleClose();
    setFormData(defaultFormData);
  };

  const handleReset = () => {
    handleClose();
    setFormData(defaultFormData);
  };

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

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <FormControl fullWidth error={errors.io}>
            <InputLabel id='io'>I/O</InputLabel>
            <Select
              label='Select I/O'
              value={formData.io}
              onChange={e => setFormData({ ...formData, io: e.target.value as 'In' | 'Out' })}
            >
              <MenuItem value='In'>IN</MenuItem>
              <MenuItem value='Out'>OUT</MenuItem>
            </Select>

            {errors.io && <FormHelperText error>This field is required.</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={errors.method}>
            <InputLabel id='method'>Select Method</InputLabel>
            <Select
              label='Select Method'
              value={formData.method}
              onChange={e => setFormData({ ...formData, method: e.target.value as 'Paypal' | 'Payoneer' | 'Wise' | 'Crypto' })}
            >
              <MenuItem value='Paypal'>Paypal</MenuItem>
              <MenuItem value='Payoneer'>Payoneer</MenuItem>
              <MenuItem value='Wise'>Wise</MenuItem>
              <MenuItem value='Crypto'>Crypto</MenuItem>
            </Select>
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
              {paymentData && Object.keys(paymentData).length > 0 ? 'Update' : 'Submit'}
            </Button>
            <Button variant='outlined' color='error' type='reset' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
};

export default PaymentRequestsDrawer;
