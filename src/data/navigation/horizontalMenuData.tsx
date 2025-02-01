// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes';

const horizontalMenuData = (): HorizontalMenuDataType[] => [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'ri-home-smile-line'
  },
  {
    label: 'About',
    href: '/about',
    icon: 'ri-information-line'
  }
];

export default horizontalMenuData;
