// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes';

const verticalMenuData = (): VerticalMenuDataType[] => [
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

export default verticalMenuData;
