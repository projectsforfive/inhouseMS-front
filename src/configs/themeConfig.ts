// Type Imports
import type { Mode, Skin, Layout, LayoutComponentPosition, LayoutComponentWidth } from '@core/types';

type Navbar = {
  type: LayoutComponentPosition;
  contentWidth: LayoutComponentWidth;
  floating: boolean;
  detached: boolean;
  blur: boolean;
};

type Footer = {
  type: LayoutComponentPosition;
  contentWidth: LayoutComponentWidth;
  detached: boolean;
};

export type Config = {
  templateName: string;
  homePageUrl: string;
  settingsCookieName: string;
  mode: Mode;
  skin: Skin;
  semiDark: boolean;
  layout: Layout;
  layoutPadding: number;
  navbar: Navbar;
  contentWidth: LayoutComponentWidth;
  compactContentWidth: number;
  footer: Footer;
  disableRipple: boolean;
};

const themeConfig: Config = {
  templateName: 'Materio',
  homePageUrl: '/dashboard',
  settingsCookieName: 'materio-mui-next-demo',
  mode: 'system', // 'system', 'light', 'dark'
  skin: 'default', // 'default', 'bordered'
  semiDark: false, // true, false
  layout: 'vertical', // 'vertical', 'collapsed', 'horizontal'
  layoutPadding: 24, // Common padding for header, content, footer layout components (in px)
  compactContentWidth: 1440, // in px
  navbar: {
    type: 'fixed', // 'fixed', 'static'
    contentWidth: 'compact', // 'compact', 'wide'
    floating: false, //! true, false (This will not work in the Horizontal Layout)
    detached: true, //! true, false (This will not work in the Horizontal Layout or floating navbar is enabled)
    blur: true // true, false
  },
  contentWidth: 'compact', // 'compact', 'wide'
  footer: {
    type: 'static', // 'fixed', 'static'
    contentWidth: 'compact', // 'compact', 'wide'
    detached: true //! true, false (This will not work in the Horizontal Layout)
  },
  disableRipple: false // true, false
};

export default themeConfig;
