'use client';

// Third-party Imports
import classnames from 'classnames';

// Component Imports
import NavToggle from './NavToggle';
import ModeDropdown from '@components/layout/shared/ModeDropdown';
import UserDropdown from '@components/layout/shared/UserDropdown';
import NotificationsDropdown from '@components/layout/shared/NotificationsDropdown';

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses';

import type { NotificationsType } from '@components/layout/shared/NotificationsDropdown';

const notifications: NotificationsType[] = [
  {
    avatarImage: '/images/avatars/2.png',
    title: 'Congratulations Flora 🎉',
    subtitle: 'Won the monthly bestseller gold badge',
    time: '1h ago',
    read: false
  },
  {
    title: 'Cecilia Becker',
    subtitle: 'Accepted your connection',
    time: '12h ago',
    read: false
  },
  {
    avatarImage: '/images/avatars/3.png',
    title: 'Bernard Woods',
    subtitle: 'You have new message from Bernard Woods',
    time: 'May 18, 8:26 AM',
    read: true
  },
  {
    avatarIcon: 'ri-bar-chart-line',
    avatarColor: 'info',
    title: 'Monthly report generated',
    subtitle: 'July month financial report is generated',
    time: 'Apr 24, 10:30 AM',
    read: true
  },
  {
    avatarText: 'MG',
    avatarColor: 'success',
    title: 'Application has been approved 🚀',
    subtitle: 'Your Meta Gadgets project application has been approved.',
    time: 'Feb 17, 12:17 PM',
    read: true
  },
  {
    avatarIcon: 'ri-mail-line',
    avatarColor: 'error',
    title: 'New message from Harry',
    subtitle: 'You have new message from Harry',
    time: 'Jan 6, 1:48 PM',
    read: true
  }
];

const NavbarContent = () => {
  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-4'>
        <NavToggle />
        <ModeDropdown />
      </div>
      <div className='flex items-center'>
        <NotificationsDropdown notifications={notifications} />
        <UserDropdown />
      </div>
    </div>
  );
};

export default NavbarContent;
