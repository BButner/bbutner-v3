enum WallpaperEnum {
  MONTEREY,
}

export interface IWallpaper {
  fileName: string;
  fileNameDark: string;
  wallpaper: WallpaperEnum;
  title: string;
}

export const wallpapers: IWallpaper[] = [
  {
    fileName: 'monterey.jpg',
    fileNameDark: 'monterey-dark.jpg',
    wallpaper: WallpaperEnum.MONTEREY,
    title: 'Monterey',
  },
]
