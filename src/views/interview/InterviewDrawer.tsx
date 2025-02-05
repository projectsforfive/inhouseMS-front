// React Imports
import { useEffect, useState, useRef } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import InputAdornment from '@mui/material/InputAdornment'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { minLength, nonEmpty, object, pipe, string } from 'valibot'
import type { InferInput } from 'valibot'

// Type Imports
import type { CardlistType, CardType } from '@/types/apps/interviewTypes'
import type { AppDispatch } from '@/redux'

// Slice Imports
import { editCard, deleteCard } from '@/redux/slices/card.slice'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Data Imports
import { chipColor } from './Cards'

type InterviewDrawerProps = {
  drawerOpen: boolean
  dispatch: AppDispatch
  setDrawerOpen: (value: boolean) => void
  card: CardType
  cardlists: CardlistType[]
  setCardlists: (value: CardlistType[]) => void
}

type FormData = InferInput<typeof schema>

const schema = object({
  title: pipe(string(), nonEmpty('Title is required'), minLength(1))
})

const InterviewDrawer = (props: InterviewDrawerProps) => {
  // Props
  const { drawerOpen, dispatch, setDrawerOpen, card, cardlists, setCardlists } = props

  // States
  const [date, setDate] = useState<Date | undefined>(card.dueDate)
  const [badgeText, setBadgeText] = useState(card.badgeText || [])
  const [fileName, setFileName] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      title: card.title
    },
    resolver: valibotResolver(schema)
  })

  // Handle File Upload
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (files && files.length !== 0) {
      setFileName(files[0].name)
    }
  }

  // Close Drawer
  const handleClose = () => {
    setDrawerOpen(false)
    reset({ title: card.title })
    setBadgeText(card.badgeText || [])
    setDate(card.dueDate)
    setFileName('')
    setComment('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Update card
  const updatecard = (data: FormData) => {
    dispatch(editCard({ id: card.id, title: data.title, badgeText, dueDate: date }))
    handleClose()
  }

  // Handle Reset
  const handleReset = () => {
    setDrawerOpen(false)
    dispatch(deleteCard(card.id))

    const updatedcardlists = cardlists.map(column => {
      return {
        ...column,
        cardIds: column.cardIds.filter(cardId => cardId !== card.id)
      }
    })

    setCardlists(updatedcardlists)
  }

  // To set the initial values according to the card
  useEffect(() => {
    reset({ title: card.title })
    setBadgeText(card.badgeText || [])
    setDate(card.dueDate)
  }, [card, reset])

  return (
    <div>
      <Drawer
        open={drawerOpen}
        anchor='right'
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
        onClose={handleClose}
      >
        <div className='flex justify-between items-center pli-5 plb-4 border-be'>
          <Typography variant='h5'>Edit card</Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='ri-close-line text-2xl' />
          </IconButton>
        </div>
        <div className='p-6'>
          <form className='flex flex-col gap-y-5' onSubmit={handleSubmit(updatecard)}>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label='Title'
                  {...field}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              )}
            />

            <AppReactDatepicker
              selected={date ? new Date(date) : new Date()}
              id='basic-input'
              onChange={(date: Date | null) => {
                date !== null && setDate(date)
              }}
              placeholderText='Click to select a date'
              customInput={<TextField label='Due Date' fullWidth />}
            />
            <FormControl fullWidth>
              <InputLabel id='demo-multiple-chip-label'>Label</InputLabel>
              <Select
                multiple
                label='Label'
                value={badgeText || []}
                onChange={e => setBadgeText(e.target.value as string[])}
                renderValue={selected => (
                  <div className='flex flex-wrap gap-1'>
                    {selected.map(value => (
                      <Chip
                        variant='tonal'
                        label={value}
                        key={value}
                        onMouseDown={e => e.stopPropagation()}
                        size='small'
                        onDelete={() => setBadgeText(current => current.filter(item => item !== value))}
                        color={chipColor[value]?.color}
                      />
                    ))}
                  </div>
                )}
              >
                {Object.keys(chipColor).map(chip => (
                  <MenuItem key={chip} value={chip}>
                    <Checkbox checked={badgeText && badgeText.indexOf(chip) > -1} />
                    <ListItemText primary={chip} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className='flex flex-col gap-y-1'>
              <Typography variant='body2'>Assigned</Typography>
              <div className='flex gap-1'>
                {card.assigned?.map((avatar, index) => (
                  <Tooltip title={avatar.name} key={index}>
                    <CustomAvatar key={index} src={avatar.src} size={26} className='cursor-pointer' />
                  </Tooltip>
                ))}
                <CustomAvatar size={26} className='cursor-pointer'>
                  <i className='ri-add-line text-base text-textSecondary' />
                </CustomAvatar>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <TextField
                fullWidth
                size='small'
                label='Choose File'
                variant='outlined'
                value={fileName}
                InputProps={{
                  readOnly: true,
                  endAdornment: fileName ? (
                    <InputAdornment position='end'>
                      <IconButton size='small' edge='end' onClick={() => setFileName('')}>
                        <i className='ri-close-line' />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }}
              />
              <Button component='label' variant='outlined' htmlFor='contained-button-file'>
                Choose
                <input hidden id='contained-button-file' type='file' onChange={handleFileUpload} ref={fileInputRef} />
              </Button>
            </div>
            <TextField
              fullWidth
              label='Comment'
              value={comment}
              onChange={e => setComment(e.target.value)}
              multiline
              rows={4}
              placeholder='Write a Comment....'
            />
            <div className='flex gap-4'>
              <Button variant='contained' color='primary' type='submit'>
                Update
              </Button>
              <Button variant='outlined' color='error' type='reset' onClick={handleReset}>
                Delete
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  )
}

export default InterviewDrawer
