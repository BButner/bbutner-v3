import { BarButton } from "../BarButton"
import {useEffect, useState} from "react";
import {getSpotify, SpotifyResponse} from "../../../lib/spotify";
import Image from "next/image";
import {setIn} from "immutable";

export const CurrentlyPlaying: React.FC = () => {
  const [current, setCurrent] = useState<SpotifyResponse | null>(null);
  const [currentCompletion, setCurrentCompletion] = useState<number>(0);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (!initialized) {
      initPlayback();
      setInitialized(true);
    }
  }, [current]);

  const initPlayback = () => {
    refreshSpotify();

    setInterval(() => {
      refreshSpotify();
    }, 10000);
  }

  const refreshSpotify = () => {
    getSpotify()
      .then(data => {
        console.log(data);
        setCurrent(data);
        if (data && data.progress) {
          setCurrentCompletion((data.progress / data.song_duration) * 100);
        }
      });
  }

  return (
    <BarButton>
      <BarButton.Button>
        <p>X</p>
      </BarButton.Button>
      <BarButton.Panel position="right" className="w-72 p-4">
        <>
          {current && <div className="space-y-4">
            <div
              className="flex items-center max-w-full">
              <img
                className="w-12 h-12 rounded-sm mr-2"
                src={current.album_images[0].url}/>
              <div className="overflow-hidden">
                <p className="font-semibold">{current.name}</p>
                <p className="opacity-75 text-ellipsis max-w-full">{current.artists.join(" ")} - {current.album}</p>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl w-full h-1 bg-zinc-500/40">
                <div
                  className="h-1 bg-zinc-800 rounded-xl transition-all duration-200"
                  style={{
                    width: `${currentCompletion}%`
                  }}
                />
              </div>
            </div>
          </div>}
        </>
      </BarButton.Panel>
    </BarButton>
  )
}
