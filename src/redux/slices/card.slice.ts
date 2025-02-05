// Third-party Imports
import { createSlice } from '@reduxjs/toolkit'

// Type Imports
import type { CardlistType, CardType } from '@/types/apps/interviewTypes'

// Data Imports
import { db } from '@/fake-db/apps/interview'

export const cardSlice = createSlice({
  name: 'interview',
  initialState: db,
  reducers: {
    addCardlist: (state, action) => {
      const maxId = Math.max(...state.cardlists.map(cardlist => cardlist.id))

      const newcardlist: CardlistType = {
        id: maxId + 1,
        board: 1,
        title: action.payload,
        cardIds: []
      }

      state.cardlists.push(newcardlist)
    },

    editCardlist: (state, action) => {
      const { id, title } = action.payload

      const cardlist = state.cardlists.find(cardlist => cardlist.id === id)

      if (cardlist) {
        cardlist.title = title
      }
    },

    deleteCardlist: (state, action) => {
      const { cardlistId } = action.payload
      const cardlist = state.cardlists.find(cardlist => cardlist.id === cardlistId)

      state.cardlists = state.cardlists.filter(cardlist => cardlist.id !== cardlistId)

      if (cardlist) {
        state.cards = state.cards.filter(card => !cardlist.cardIds.includes(card.id))
      }
    },

    updateCardlists: (state, action) => {
      state.cardlists = action.payload
    },

    updateCardlistCardIds: (state, action) => {
      const { id, cardsList } = action.payload

      state.cardlists = state.cardlists.map(cardlist => {
        if (cardlist.id === id) {
          return { ...cardlist, cardIds: cardsList.map((card: CardType) => card.id) }
        }

        return cardlist
      })
    },

    addCard: (state, action) => {
      const { cardlistId, title } = action.payload

      const newcard: CardType = {
        id: state.cards[state.cards.length - 1].id + 1,
        board: 1,
        title,
      }

      const cardlist = state.cardlists.find(cardlist => cardlist.id === cardlistId)

      if (cardlist) {
        cardlist.cardIds.push(newcard.id)
      }

      state.cards.push(newcard)

      return state
    },

    editCard: (state, action) => {
      const { id, title, badgeText, dueDate } = action.payload

      const card = state.cards.find(card => card.id === id)

      if (card) {
        card.title = title
        card.badgeText = badgeText
        card.dueDate = dueDate
      }
    },

    deleteCard: (state, action) => {
      const cardId = action.payload

      state.cards = state.cards.filter(card => card.id !== cardId)
      state.cardlists = state.cardlists.map(cardlist => {
        return {
          ...cardlist,
          cardIds: cardlist.cardIds.filter(id => id !== cardId)
        }
      })
    },

    getCurrentCard: (state, action) => {
      state.currentCardId = action.payload
    }
  }
})

export const {
  addCardlist,
  editCardlist,
  deleteCardlist,
  updateCardlists,
  updateCardlistCardIds,
  addCard,
  editCard,
  deleteCard,
  getCurrentCard
} = cardSlice.actions

export default cardSlice.reducer
