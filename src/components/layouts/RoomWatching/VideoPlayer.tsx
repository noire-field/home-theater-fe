import React, { LegacyRef, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { RootState, useAllDispatch } from '../../../store';
import { WatchSetPlayerBuffering, WatchSetPlayerPlaying, WatchSetPlayerProgress } from '../../../Watch.slice';

interface IVideoPlayerProps {
    
}

function VideoPlayer(props: IVideoPlayerProps, ref: any) {
    const dispatch = useAllDispatch();
    
    const volume = useSelector((state: RootState) => state.watch.player.volume)
    const muted = useSelector((state: RootState) => state.watch.player.muted)
    const isPlaying = useSelector((state: RootState) => state.watch.player.isPlaying);
    const videoUrl = useSelector((state: RootState) => state.watch.player.videoUrl);

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> WatchingRoom > RoomWatching > (1)VideoPlayer: Render`);

    /*
    const onStart = () => {
        console.log("Start");
    }
    const onPlay = () => {
        console.log("Play");
    }
    const onPause = () => {
        console.log("Pause");
    }*/

    const onProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number; }) => {
        dispatch(WatchSetPlayerProgress(state.playedSeconds));
    }

    const onBuffer = () => { 
        dispatch(WatchSetPlayerBuffering(true));
    }
    const onBufferEnd = () => { 
        dispatch(WatchSetPlayerBuffering(false));
    }
    const onEnded = () => { 
        dispatch(WatchSetPlayerPlaying(false));
    }

    return (
        <div className='h-full'>
            <ReactPlayer 
                ref={ref}
                style={{ margin: 0, padding: 0, position: 'relative' }} height='100%' width='100%' 
                /*onPlay={onPlay} onStart={onStart} onPause={onPause} */onProgress={onProgress}  onBuffer={onBuffer} onBufferEnd={onBufferEnd} onEnded={onEnded}
                playing={isPlaying} volume={muted ? 0.0 : volume}
                url={videoUrl}
            />
        </div>
    )
}

export default React.memo(React.forwardRef(VideoPlayer));