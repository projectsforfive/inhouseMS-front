'use client'

// React Imports
import type { RefObject } from 'react'
import { useEffect, useState } from 'react'

// Third-party imports
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { animations } from '@formkit/drag-and-drop'
import { useDispatch, useSelector } from 'react-redux'

// Type Imports
import type { RootState } from '@/redux'

// Slice Imports
import { addCardlist, updateCardlists } from '@/redux/slices/card.slice'

// Component Imports
import InterviewList from './InterviewList'
import Newcardlist from './NewCardlist'
import InterviewDrawer from './InterviewDrawer'

const Cardlist = () => {
  // State
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Hooks
  const cardStore = useSelector((state: RootState) => state.cardReducer)
  const dispatch = useDispatch()

  const [boardRef, cardlists, setCardlists] = useDragAndDrop(cardStore.cardlists, {
    plugins: [animations()],
    dragHandle: '.list-handle'
  })

  // Add New cardlist
  const addNewcardlist = (title: string) => {
    const maxId = Math.max(...cardStore.cardlists.map(cardlist => cardlist.id))

    dispatch(addCardlist(title))
    setCardlists([...cardlists, { id: maxId + 1, board: 1, title, cardIds: [] }])
  }

  // To get the current card for the drawer
  const currentCard = cardStore.cards.find(card => card.id === cardStore.currentCardId)

  // Update cardlists on Drag and Drop
  useEffect(() => {
    if (cardlists !== cardStore.cardlists) dispatch(updateCardlists(cardlists))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardlists])

  return (
    <div className='flex items-start gap-6'>
      <div ref={boardRef as RefObject<HTMLDivElement>} className='flex gap-6'>
        {cardlists.map(cardlist => (
          <InterviewList
            key={cardlist.id}
            dispatch={dispatch}
            cardlist={cardlist}
            store={cardStore}
            setDrawerOpen={setDrawerOpen}
            cardlists={cardlists}
            setCardlists={setCardlists}
            currentCard={currentCard}
            cards={cardlist.cardIds.map(cardId => cardStore.cards.find(card => card.id === cardId))}
          />
        ))}
      </div>
      <Newcardlist addNewCardlist={addNewcardlist} />
      {currentCard && (
        <InterviewDrawer
          card={currentCard}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          dispatch={dispatch}
          cardlists={cardlists}
          setCardlists={setCardlists}
        />
      )}
    </div>
  )
}

export default Cardlist
