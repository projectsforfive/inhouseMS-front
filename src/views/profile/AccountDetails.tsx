'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { ChangeEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import type { SelectChangeEvent } from '@mui/material/Select'
import Image from 'next/image'

import { fetchProfile, updateProfile } from '@/redux/slices/profile.slice'
import type { RootState } from '@/redux/index'


type Data = {
  userName: string,
  email: string,
  gender: 'Male' | 'Female',
  team: string,
  birthday: string,
  language: string,
}


const userId = 1;
const languageData = ['English', 'Spanish', 'Chinese', 'French', 'German', 'Portuguese', 'Russian']

const AccountDetails: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { profile } = useSelector((state: RootState) => state.profile);
  const [signal, setSignal] = useState(true)

  useEffect(() => {
    fetchProfile(userId)
  }, [signal])

  // States
  const [formData, setFormData] = useState(profile)
  const [fileInput, setFileInput] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [language, setLanguage] = useState<string[]>(['English'])
  const [edit, setEdit] = useState(true)
  const handleDelete = (value: string) => {
    setLanguage(current => current.filter(item => item !== value))
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  const handleFormChange = (field: keyof Data, value: Data[keyof Data]) => {
    console.log(field, value)
    setFormData({ ...formData, [field]: value })
  }

  const handleFileInputChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result as string)
      }
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    setEdit(!edit)
    const data: any = [formData, fileInput];
    dispatch(updateProfile(data))
    setSignal(false)
  }
  return (
    <Card>
      <CardContent className='mbe-5'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <Image height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' size='small' variant='contained' htmlFor='account-settings-upload-image'>
                Upload New Photo
                <input
                  hidden
                  type='file'
                  value={fileInput}
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              {/* <Button size='small' variant='outlined' color='error' onClick={handleFileInputReset}>
                Reset
              </Button> */}
            </div>
            <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='User Name'
                value={formData.userName}
                placeholder='John'
                onChange={e => handleFormChange('userName', e.target.value)}
                disabled={edit}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Email'
                value={formData.email}
                placeholder='john.doe@gmail.com'
                onChange={e => handleFormChange('email', e.target.value)}
                disabled={edit}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  label='Gender'
                  value={formData.gender}
                  disabled={edit}
                  onChange={e => handleFormChange('gender', e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Team</InputLabel>
                <Select
                  label='Team'
                  value={formData.team[0]}
                  disabled={edit}
                  onChange={e => handleFormChange('team', e.target.value)}
                >
                  {formData.team.map(team => (
                    <MenuItem key={team} value={team}>
                      {team}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Birthday'
                value={formData.birthday}
                placeholder='Birthday : 1990-01-01'
                onChange={e => handleFormChange('birthday', e.target.value)}
                disabled={edit}

              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  multiple
                  label='Language'
                  value={language}
                  onChange={handleChange}
                  disabled={edit}
                  renderValue={selected => (
                    <div className='flex flex-wrap gap-2'>
                      {(selected as string[]).map(value => (
                        <Chip
                          key={value}
                          clickable
                          deleteIcon={
                            <i className='ri-close-circle-fill' onMouseDown={event => event.stopPropagation()} />
                          }
                          size='small'
                          label={value}
                          onDelete={() => handleDelete(value)}
                        />
                      ))}
                    </div>
                  )}
                >
                  {languageData.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} >
              <Button variant='contained' className='mr-2' type='submit'>
                {!edit ? 'Save Changes' : 'Update Profile'}
              </Button>
              <Button variant='outlined' type='reset' color='secondary' onClick={() => {setFormData(profile);handleFileInputReset;}}>
                Reset
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <textarea id="message"  className="block resize-y  p-2.5 w-full text-sm
            text-gray-900 bg-gray-50 rounded-lg border border-gray-300
            focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write about yourself ..."
            />
            </Grid>


          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}


export default AccountDetails
