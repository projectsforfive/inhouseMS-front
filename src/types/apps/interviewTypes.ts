export type CardType = {
  id: number
  board: number
  title: string
  badgeText?: string[]
  attachments?: number
  comments?: number
  assigned?: { src: string; name: string }[]
  image?: string
  dueDate?: Date
}

export type CardlistType = {
  id: number
  board: number
  title: string
  cardIds: number[]
}

export type InterviewType = {
  cardlists: CardlistType[]
  cards: CardType[]
  currentCardId?: number
  boards: BoardType[]
}

export type BoardType = {
    id: number,
    title: string,
    cardlist: [],
    color: string,
    stared: boolean,
    number: number,
  }
