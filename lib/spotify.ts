interface SpotifyImage {
  url: string;
}

export interface SpotifyResponse {
  name: string;
  artists: string[];
  album: string;
  album_images: SpotifyImage[];
  is_playing: boolean;
  progress?: number;
  song_duration: number;
}

export const getSpotify = async (): Promise<SpotifyResponse | null> => {
  return fetch("https://api.bbutner.com:8000/spotify")
    .then(data => data.json())
    .then(json => {
      return json;
    })
    .catch(err => null);
}
