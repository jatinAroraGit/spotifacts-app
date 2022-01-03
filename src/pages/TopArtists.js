import { useEffect, useState } from "react";
import { getTopArtists, shuffleDemoData } from '../spotify';
import { catchErrors } from '../utils';
import { SectionWrapper, ArtistsGrid, TimeRangeButtons, Loader } from '../components'
import { demoTopArtists } from '../demo'

const TopArtists = (props) => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      if (!(props.demoMode)) {
        const userTopArtists = await getTopArtists(activeRange + '_term');
        setTopArtists(userTopArtists.data);
      }
      else {
        let shuffledData = await shuffleDemoData(demoTopArtists);
        setTopArtists({ ...shuffledData });
      }
    };

    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      {topArtists ? (
        <SectionWrapper title="Top Artists" breadcrumb="true">
          <TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange} />
          <ArtistsGrid artists={topArtists.items} />
        </SectionWrapper>
      ) : (
          <Loader />
        )}
    </main>
  );
}

export default TopArtists;