import { useEffect, useState } from "react";
import { catchErrors } from '../utils';
import axios from 'axios';
import { getCurrentUserPlaylists, shuffleDemoData } from "../spotify";
import { SectionWrapper, PlaylistsGrid, Loader } from '../components'
import { demoPlaylists } from '../demo'

const Playlists = (props) => {
  const [playlistsData, setPlaylistsData] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!props.demoMode) {
        const userPlaylists = await getCurrentUserPlaylists();
        setPlaylistsData(userPlaylists.data);
      }
      else {
        let shuffledData = await shuffleDemoData(demoPlaylists);
        setPlaylistsData({ ...shuffledData });
      }
    };

    catchErrors(fetchData());
  }, []);

  // When playlistsData updates, check if there are more playlists to fetch
  // then update the state variable
  useEffect(() => {
    if (!playlistsData) {
      return;
    }

    // Playlist endpoint only returns 20 playlists at a time, so we need to
    // make sure we get ALL playlists by fetching the next set of playlists
    const fetchMoreData = async () => {
      if (!props.demoMode) {
        if (playlistsData.next) {
          const { data } = await axios.get(playlistsData.next);
          setPlaylistsData(data);
        }
      }
    };

    // Use functional update to update playlists state variable
    // to avoid including playlists as a dependency for this hook
    // and creating an infinite loop
    setPlaylists(playlists => ([
      ...playlists ? playlists : [],
      ...playlistsData.items
    ]));

    // Fetch next set of playlists as needed
    catchErrors(fetchMoreData());

  }, [playlistsData]);


  return (
    <main>
      <SectionWrapper title="Playlists" breadcrumb="true">
        {playlists ? (

          <PlaylistsGrid playlists={playlists} demoMode={props.demoMode} />

        ) : (
            <Loader />
          )}
      </SectionWrapper>
    </main>
  )
}

export default Playlists;