import { Composition } from 'remotion';
import { RCAutoSpot } from './compositions/RCAuto';
import { ChiSiamo } from './compositions/ChiSiamo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Spot RC Auto — 30s, 1:1 feed social */}
      <Composition
        id="RCAutoSpot"
        component={RCAutoSpot}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1080}
      />

      {/* Presentazione aziendale — 30s, 1:1 feed social */}
      <Composition
        id="ChiSiamo"
        component={ChiSiamo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
