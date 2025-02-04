/* eslint-disable @next/next/no-img-element */
// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// Third-Party Imports
import classnames from 'classnames'

// Type Imports
import type { CardlistType, CardType } from '@/types/apps/interviewTypes'
import type { AppDispatch } from '@/redux'
import type { ThemeColor } from '@core/types'

// Slice Imports
import { getCurrentCard, deleteCard } from '@/redux/slices/card.slice'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import styles from './styles.module.css'

type chipColorType = {
  color: ThemeColor
}

type cardCardProps = {
  card: CardType
  dispatch: AppDispatch
  cardlist: CardlistType
  setCardlists: (value: CardlistType[]) => void
  cardlists: CardlistType[]
  setDrawerOpen: (value: boolean) => void
  cardsList: (CardType | undefined)[]
  setCardsList: (value: (CardType | undefined)[]) => void
}

export const chipColor: { [key: string]: chipColorType } = {
  UX: { color: 'success' },
  'Code Review': { color: 'error' },
  Dashboard: { color: 'info' },
  Images: { color: 'warning' },
  App: { color: 'secondary' },
  'Charts & Map': { color: 'primary' }
}

const Cards = (props: cardCardProps) => {
  // Props
  const { card, dispatch, cardlist, setCardlists, cardlists, setDrawerOpen, cardsList, setCardsList } = props

  // States
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // Handle menu click
  const handleClick = (e: any) => {
    setMenuOpen(true)
    setAnchorEl(e.currentTarget)
  }

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null)
    setMenuOpen(false)
  }

  // Handle Card Click
  const handleCardClick = () => {
    setDrawerOpen(true)
    dispatch(getCurrentCard(card.id))
  }

  // Delete Card
  const handleDeleteCard = () => {
    dispatch(deleteCard(card.id))
    setCardsList(cardsList.filter(cardItem => cardItem?.id !== card.id))

    const newCardIds = cardlist.cardIds.filter(cardId => cardId !== card.id)
    const newCardlist = { ...cardlist, cardIds: newCardIds }
    const newCardlists = cardlists.map(col => (col.id === cardlist.id ? newCardlist : col))

    setCardlists(newCardlists)
  }

  // Handle Delete
  const handleDelete = () => {
    handleClose()
    handleDeleteCard()
  }

  return (
    <>
      <Card
        className={classnames(
          'item-draggable is-[16.5rem] cursor-grab active:cursor-grabbing overflow-visible mbe-4',
          styles.card
        )}
        onClick={() => handleCardClick()}
      >
        <CardContent className='flex flex-col gap-y-2 items-start relative overflow-hidden'>
          {card.badgeText && card.badgeText.length > 0 && (
            <div className='flex flex-wrap items-center justify-start gap-2 is-full max-is-[85%]'>
              {card.badgeText.map(
                (badge, index) =>
                  chipColor[badge]?.color && (
                    <Chip variant='tonal' key={index} label={badge} size='small' color={chipColor[badge].color} />
                  )
              )}
            </div>
          )}
          <div className='absolute block-start-4 inline-end-3' onClick={e => e.stopPropagation()}>
            <IconButton
              aria-label='more'
              size='small'
              className={classnames(styles.menu, {
                [styles.menuOpen]: menuOpen
              })}
              aria-controls='long-menu'
              aria-haspopup='true'
              onClick={handleClick}
            >
              <i className='ri-more-2-line text-xl' />
            </IconButton>
            <Menu
              id='long-menu'
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Duplicate card</MenuItem>
              <MenuItem onClick={handleClose}>Copy card Link</MenuItem>
              <MenuItem
                onClick={() => {
                  handleDelete()
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </div>

          {card.image && <img src={card.image} alt='card Image' className='is-full rounded' />}
          <Typography color='text.primary' className='max-is-[85%] break-words'>
            {card.title}
          </Typography>
          {(card.attachments !== undefined && card.attachments > 0) ||
            (card.comments !== undefined && card.comments > 0) ||
            (card.assigned !== undefined && card.assigned.length > 0) ? (
            <div className='flex justify-between items-center gap-4 is-full'>
              {(card.attachments !== undefined && card.attachments > 0) ||
                (card.comments !== undefined && card.comments > 0) ? (
                <div className='flex gap-4'>
                  {card.attachments !== undefined && card.attachments > 0 && (
                    <div className='flex items-center gap-1'>
                      <i className='ri-attachment-2 text-xl text-textSecondary' />
                      <Typography color='text.secondary'>{card.attachments}</Typography>
                    </div>
                  )}
                  {card.comments !== undefined && card.comments > 0 && (
                    <div className='flex items-center gap-1'>
                      <i className='ri-wechat-line text-xl text-textSecondary' />
                      <Typography color='text.secondary'>{card.comments}</Typography>
                    </div>
                  )}
                </div>
              ) : null}
              {card.assigned !== undefined && card.assigned.length > 0 && (
                <AvatarGroup max={4} className='pull-up'>
                  {card.assigned?.map((avatar, index) => (
                    <Tooltip title={avatar.name} key={index}>
                      <CustomAvatar
                        key={index}
                        src={avatar.src}
                        alt={avatar.name}
                        size={26}
                        className='cursor-pointer'
                      />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              )}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </>
  )
}

export default Cards
