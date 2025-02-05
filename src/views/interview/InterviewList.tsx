// React Imports
import { useEffect, useState } from 'react'
import type { FormEvent, RefObject } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'

// Third-party imports
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { animations } from '@formkit/drag-and-drop'
import classnames from 'classnames'

// Type Imports
import type { CardType, CardlistType, InterviewType } from '@/types/apps/interviewTypes'
import type { AppDispatch } from '@/redux'

// Slice Imports
import { addCard, editCardlist, deleteCardlist, updateCardlistCardIds } from '@/redux/slices/card.slice'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import Cards from './Cards'
import NewCard from './NewCard'

// Styles Imports
import styles from './styles.module.css'

type InterviewListProps = {
  cardlist: CardlistType
  cards: (CardType | undefined)[]
  dispatch: AppDispatch
  store: InterviewType
  setDrawerOpen: (value: boolean) => void
  cardlists: CardlistType[]
  setCardlists: (value: CardlistType[]) => void
  currentCard: CardType | undefined
}

const InterviewList = (props: InterviewListProps) => {
  // Props
  const { cardlist, cards, dispatch, store, setDrawerOpen, cardlists, setCardlists, currentCard } = props

  // States
  const [editDisplay, setEditDisplay] = useState(false)
  const [title, setTitle] = useState(cardlist.title)

  // Hooks
  const [cardsListRef, cardsList, setCardsList] = useDragAndDrop(cards, {
    group: 'cardsList',
    plugins: [animations()],
    draggable: el => el.classList.contains('item-draggable')
  })

  // Add New card
  const addNewCard = (title: string) => {
    dispatch(addCard({ cardlistId: cardlist.id, title: title }))

    setCardsList([...cardsList, {
      id: store.cards[store.cards.length - 1].id + 1, title,
      board: 1
    }])

    const newCardlists = cardlists.map(col => {
      if (col.id === cardlist.id) {
        return { ...col, cardIds: [...col.cardIds, store.cards[store.cards.length - 1].id + 1] }
      }

      return col
    })

    setCardlists(newCardlists)
  }

  // Handle Submit Edit
  const handleSubmitEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEditDisplay(!editDisplay)
    dispatch(editCardlist({ id: cardlist.id, title }))

    const newCardlist = cardlists.map(col => {
      if (col.id === cardlist.id) {
        return { ...col, title }
      }

      return col
    })

    setCardlists(newCardlist)
  }

  // Cancel Edit
  const cancelEdit = () => {
    setEditDisplay(!editDisplay)
    setTitle(cardlist.title)
  }

  // Delete cardlist
  const handleDeleteCardlist = () => {
    dispatch(deleteCardlist({ cardlistId: cardlist.id }))
    setCardlists(cardlists.filter(col => col.id !== cardlist.id))
  }

  // Update cardlist cardIds on drag and drop
  useEffect(() => {
    if (cardsList !== cards) {
      dispatch(updateCardlistCardIds({ id: cardlist.id, cardsList }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsList])

  // To update the cardsList when a card is edited
  useEffect(() => {
    const newCards = cardsList.map(card => {
      if (card?.id === currentCard?.id) {
        return currentCard
      }

      return card
    })

    if (currentCard !== cardsList.find(card => card?.id === currentCard?.id)) {
      setCardsList(newCards)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard])

  // To update the cardsList when cardlists are updated
  useEffect(() => {
    let cardIds: CardlistType['cardIds'] = []

    cardlists.map(col => {
      cardIds = [...cardIds, ...col.cardIds]
    })

    const newCardsList = cardsList.filter(card => card && cardIds.includes(card.id))

    setCardsList(newCardsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardlists])

  return (
    <div ref={cardsListRef as RefObject<HTMLDivElement>} className='flex flex-col is-[16.5rem]'>
      {editDisplay ? (
        <form
          className='flex items-center mbe-4'
          onSubmit={handleSubmitEdit}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              cancelEdit()
            }
          }}
        >
          <InputBase value={title} autoFocus onChange={e => setTitle(e.target.value)} required />
          <IconButton color='success' size='small' type='submit'>
            <i className='ri-check-line' />
          </IconButton>
          <IconButton color='error' size='small' type='reset' onClick={cancelEdit}>
            <i className='ri-close-line' />
          </IconButton>
        </form>
      ) : (
        <div
          id='no-drag'
          className={classnames(
            'flex items-center justify-between is-[16.5rem] bs-[2.125rem] mbe-4',
            styles.interviewCardlist
          )}
        >
          <Typography variant='h5' noWrap className='max-is-[80%]'>
            {cardlist.title}
          </Typography>
          <div className='flex items-center'>
            <i className={classnames('ri-drag-move-fill text-textSecondary list-handle', styles.drag)} />
            <OptionMenu
              iconClassName='text-xl text-actionActive'
              options={[
                {
                  text: 'Edit',
                  icon: 'ri-pencil-line',
                  menuItemProps: {
                    className: 'flex items-center gap-2',
                    onClick: () => setEditDisplay(!editDisplay)
                  }
                },
                {
                  text: 'Delete',
                  icon: 'ri-delete-bin-line',
                  menuItemProps: { className: 'flex items-center gap-2', onClick: handleDeleteCardlist }
                }
              ]}
            />
          </div>
        </div>
      )}
      {cardsList.map(
        card =>
          card && (
            <Cards
              key={card.id}
              card={card}
              dispatch={dispatch}
              cardlist={cardlist}
              setCardlists={setCardlists}
              cardlists={cardlists}
              setDrawerOpen={setDrawerOpen}
              cardsList={cardsList}
              setCardsList={setCardsList}
            />
          )
      )}
      <NewCard addCard={addNewCard} />
    </div>
  )
}

export default InterviewList
