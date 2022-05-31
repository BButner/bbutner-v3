export interface DesktopIcon {
  title: string;
  iconUrl: string;
  href: string;
}

const DESKOP_IMAGE_URL = '/images/desktop';

export const desktopIcons: DesktopIcon[] = [
  {
    title: 'Visual Studio Code',
    iconUrl: `${DESKOP_IMAGE_URL}/vscode.png`,
    href: 'https://code.visualstudio.com',
  },
  {
    title: 'WebStorm',
    iconUrl: `${DESKOP_IMAGE_URL}/webstorm.png`,
    href: 'https://www.jetbrains.com/webstorm/'
  },
  {
    title: 'Iterm2',
    iconUrl: `${DESKOP_IMAGE_URL}/Iterm.png`,
    href: 'https://iterm2.com'
  },
  {
    title: 'Rider',
    iconUrl: `${DESKOP_IMAGE_URL}/Rider.png`,
    href: 'https://www.jetbrains.com/rider/'
  },
  {
    title: 'Neovim',
    iconUrl: `${DESKOP_IMAGE_URL}/neovim.png`,
    href: 'https://neovim.io'
  }
]
