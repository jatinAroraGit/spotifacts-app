import { useEffect, useState } from "react";
import { getTopTracks, shuffleDemoData } from '../spotify';
import { catchErrors } from '../utils';
import { SectionWrapper, TrackList, TimeRangeButtons, Loader } from '../components'
import { demoTopTracks } from '../demo'

const TopTracks = (props) => {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      if (!(props.demoMode)) {
        const userTopTracks = await getTopTracks(activeRange + '_term');
        setTopTracks(userTopTracks.data);
      }
      else {
        const shuffledData = await shuffleDemoData(demoTopTracks);
        setTopTracks({ ...shuffledData });
      }

    };

    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      {topTracks ? (
        <SectionWrapper title="Top Tracks" breadcrumb="true">
          <TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange} />
          <TrackList tracks={topTracks.items} />
        </SectionWrapper>
      ) : (
          <Loader />
        )}
    </main>
  )
}

export default TopTracks;