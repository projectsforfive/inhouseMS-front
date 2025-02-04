import type { InterviewType } from '@/types/apps/interviewTypes';

export const db: InterviewType = {
  cardlists: [
    {
      id: 1,
      board: 1,
      title: 'Introduction',
      cardIds: [1, 2]
    },
    {
      id: 2,
      board: 1,
      title: 'Technical Call',
      cardIds: [3, 4]
    },
    {
      id: 3,
      board: 1,
      title: 'Declined',
      cardIds: [5, 6]
    },
    {
      id: 4,
      board: 1,
      title: 'Hired',
      cardIds: [7, 8]
    },
  ],
  cards: [
    {
      id: 1,
      board: 1,
      title: 'Research FAQ page UX',
      badgeText: ['UX'],
      attachments: 4,
      comments: 12,
      assigned: [
        { src: '/images/avatars/1.png', name: 'John Doe' },
        { src: '/images/avatars/5.png', name: 'Tom Smith' },
        { src: '/images/avatars/4.png', name: 'Emily Davis' }
      ],
      dueDate: new Date(new Date().getFullYear(), 11, 30)
    },
    {
      id: 2,
      board: 1,
      title: 'Review Javascript code',
      badgeText: ['Code Review'],
      attachments: 2,
      comments: 8,
      assigned: [
        { src: '/images/avatars/3.png', name: 'Tom Smith' },
        { src: '/images/avatars/2.png', name: 'Emily Davis' }
      ],
      dueDate: new Date(new Date().getFullYear(), 5, 30)
    },
    {
      id: 3,
      board: 1,
      title: 'Review completed Apps',
      badgeText: ['Dashboard'],
      attachments: 8,
      comments: 17,
      assigned: [
        { src: '/images/avatars/8.png', name: 'Jane Smith' },
        { src: '/images/avatars/7.png', name: 'David Smith' }
      ],
      dueDate: new Date(new Date().getFullYear(), 8, 15)
    },
    {
      id: 4,
      board: 1,
      title: 'Find new images for pages',
      badgeText: ['Images'],
      attachments: 10,
      comments: 18,
      assigned: [
        { src: '/images/avatars/1.png', name: 'John Doe' },
        { src: '/images/avatars/2.png', name: 'Emily Davis' },
        { src: '/images/avatars/3.png', name: 'Tom Smith' },
        { src: '/images/avatars/6.png', name: 'David Smith' }
      ],
      image: '/images/apps/kanban/plant.png',
      dueDate: new Date(new Date().getFullYear(), 9, 20)
    },
    {
      id: 5,
      board: 1,
      title: 'Forms & tables section',
      badgeText: ['App'],
      attachments: 5,
      comments: 14,
      assigned: [
        { src: '/images/avatars/8.png', name: 'Jane Smith' },
        { src: '/images/avatars/3.png', name: 'Tom Smith' },
        { src: '/images/avatars/2.png', name: 'Emily Davis' }
      ],
      dueDate: new Date(new Date().getFullYear(), 10, 10)
    },
    {
      id: 6,
      board: 1,
      title: 'Complete charts & maps',
      badgeText: ['Charts & Map'],
      attachments: 6,
      comments: 21,
      assigned: [{ src: '/images/avatars/4.png', name: 'Emily Davis' }],
      dueDate: new Date(new Date().getFullYear(), 11, 5)
    }
  ],
  boards: [
    {
      id: 1,
      title: 'January',
      cardlist: [],
      color: "red",
      stared: false,
      number: 5,
    },
    {
      id: 2,
      title: 'Febrary',
      cardlist: [],
      color: "red",
      stared: false,
      number: 5,
    },
    {
      id: 3,
      title: 'March',
      cardlist: [],
      color: "red",
      stared: false,
      number: 5,
    },
  ],
};
