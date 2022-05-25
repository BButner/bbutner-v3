import {BarButton} from "../BarButton"
import {useEffect, useState} from "react";
import {getSpotify, SpotifyResponse} from "../../../lib/spotify";
import {ThemeTitle} from "../../../lib/theme";
import {useStore} from "../../../lib/state/state";
import clsx from "clsx";
import Image from "next/image";

export const CurrentlyPlaying: React.FC = () => {
  const [current, setCurrent] = useState<SpotifyResponse | null>(null);
  const [currentCompletion, setCurrentCompletion] = useState<number>(0);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const store = useStore();
  const IMAGE_LENGTH = 48;

  useEffect(() => {
    if (!initialized) {
      initPlayback();
      setInitialized(true);
    }
  }, []);

  const initPlayback = () => {
    refreshSpotify();

    setInterval(() => {
      refreshSpotify();
    }, 2000);
  }

  const refreshSpotify = () => {
    getSpotify()
      .then(data => {
        setCurrent(data);
        if (data && data.progress) {
          setCurrentCompletion((data.progress / data.song_duration) * 100);
          setCurrentTime(data.progress);
        } else {
          setCurrentCompletion(0);
          setCurrentTime(0);
        }
      });
  }

  const getDurationString = (): string => {
    if (current) {
      const minutes = Math.floor(current.song_duration / 60);
      const secs = current.song_duration - (minutes * 60);

      const minutesStr = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString();
      const secsStr = secs.toString().length === 1 ? '0' + secs.toString() : secs.toString();

      return `${minutesStr}:${secsStr}`;
    } else {
      return '00:00'
    }
  }

  const getCurrentString = (): string => {
    if (current && current.progress) {
      const minutes = Math.floor(currentTime / 60);
      const secs = currentTime - (minutes * 60);

      const minutesStr = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString();
      const secsStr = secs.toString().length === 1 ? '0' + secs.toString() : secs.toString();

      return `${minutesStr}:${secsStr}`;
    } else {
      return '00:00'
    }
  }

  const getAlbumImageSrc = (): string => {
    if (current && current.album_images.length > 0) {
      for (let i = current.album_images.length - 1; i >= 0; i--) {
        if (current.album_images[i].width) {
          if (current.album_images[i].width! > IMAGE_LENGTH && current.album_images[i].url) {
            // @ts-ignore
            return current.album_images[i].url;
          }
        }
      }
    }

    return '/images/spotify.png';
  }

  return (
    <BarButton>
      <BarButton.Button>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width={14} height={14}
          fill={store.currentThemeMode === ThemeTitle.Dark ? 'white' : 'black'}>
          <circle
            cx="256"
            cy="260"
            r="216"
            fill="none"
            stroke={store.currentThemeMode === ThemeTitle.Dark ? 'white' : 'black'}
            strokeWidth="40"/>
          <g>
            <polygon
              points="189.776,141.328 189.776,370.992 388.672,256.16"/>
          </g>
        </svg>
      </BarButton.Button>
      <BarButton.Panel position="right" className="w-72 p-4">
        <>
          <div>
            <div
              className="flex items-center max-w-full">
              <div className="w-12 mr-2">
                <Image
                  alt={`Album image for ${current?.album ?? 'NOT PLAYING'}`}
                  width={IMAGE_LENGTH}
                  height={IMAGE_LENGTH}
                  layout="fixed"
                  quality={100}
                  className="rounded-sm"
                  src={getAlbumImageSrc()}/>
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold">{current?.name ?? 'Not Currently Listening'}</p>
                {current && <p className="opacity-75 text-ellipsis max-w-full">{current.artists.join(" ")} - {current.album}</p>}
              </div>
            </div>

            <div className="relative mt-4">
              <div className="rounded-xl w-full h-1 bg-zinc-500/40">
                <div
                  className="h-1 bg-zinc-800 dark:bg-white rounded-xl transition-all duration-200"
                  style={{
                    width: `${currentCompletion}%`
                  }}
                />
              </div>
              <div
                className="absolute bg-zinc-800 transition-all duration-200 rounded-xl border border-zinc-100 dark:border-zinc-800 dark:bg-zinc-100"
                style={{
                  height: '12px',
                  width: '4px',
                  left: `calc(${currentCompletion}% - 2px)`,
                  transform: 'translateY(-8px)'
                }}>
              </div>
            </div>

            <div className="flex items-start justify-between pt-1">
              <p className="text-[10px]">{getCurrentString()}</p>
              <p className="text-[10px]">{getDurationString()}</p>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width={20}
                height={20}
                className={clsx(
                  store.currentThemeMode === ThemeTitle.Dark ? 'fill-white' : 'fill-zinc-500'
                )}>
                <path d="M29,5v22c0,1.1-0.698,1.432-1.552,0.739L18,20.062V27c0,1.1-0.698,1.432-1.552,0.739L3.552,17.261
	                     c-0.854-0.694-0.854-1.829,0-2.522L16.448,4.261C17.302,3.568,18,3.9,18,5v6.937l9.448-7.676C28.302,3.568,29,3.9,29,5z"/>
              </svg>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width={24}
                height={24}
                className={store.currentThemeMode === ThemeTitle.Dark ? 'fill-white' : 'fill-zinc-500'}>
                <path
                  d="M14,6v20c0,1.1-0.9,2-2,2H8c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h4C13.1,4,14,4.9,14,6z M24,4h-4
	                 c-1.1,0-2,0.9-2,2v20c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2V6C26,4.9,25.1,4,24,4z"/>
              </svg>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width={20}
                height={20}
                className={store.currentThemeMode === ThemeTitle.Dark ? 'fill-white' : 'fill-zinc-500'}>
                <path d="M28.448,17.261L15.552,27.739C14.698,28.432,14,28.1,14,27v-6.938l-9.448,7.676
                	     C3.698,28.432,3,28.1,3,27V5c0-1.1,0.698-1.432,1.552-0.739L14,11.937V5c0-1.1,0.698-1.432,1.552-0.739l12.896,10.478
                	     C29.302,15.432,29.302,16.568,28.448,17.261z"/>
              </svg>
            </div>
          </div>
        </>
      </BarButton.Panel>
    </BarButton>
  )
}
