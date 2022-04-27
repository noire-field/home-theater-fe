import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { RootState, useAllDispatch } from '../../../store';
import { WatchSetPlayerBuffering, WatchSetPlayerPlaying, WatchSetPlayerProgress } from '../../../Watch.slice';

function VideoPlayer() {
    const dispatch = useAllDispatch();

    const refPlayer = useRef<ReactPlayer>(null);
    const volume = useSelector((state: RootState) => state.watch.player.volume)
    const muted = useSelector((state: RootState) => state.watch.player.muted)
    const isPlaying = useSelector((state: RootState) => state.watch.player.isPlaying);
    const videoUrl = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4';

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> WatchingRoom > RoomWatching > (1)VideoPlayer: Render`);

    const onToggleFullScreen = () => {
        alert('Go Full')
    }

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
        console.log('OnEnded')
    }

    useEffect(() => {
       //dispatch(WatchSetPlayerPlaying(true));
    }, [])

    useEffect(() => {
        /*
        const timer = setTimeout(() => {
            dispatch(WatchSetPlayerPlaying(!isPlaying));
        }, 3000);
        return () => {
            clearTimeout(timer);
        }*/
    });

    return (
        <div onDoubleClick={onToggleFullScreen} className='h-full'>
            <ReactPlayer 
                ref={refPlayer}
                style={{ margin: 0, padding: 0, position: 'relative' }} height='100%' width='100%' 
                /*onPlay={onPlay} onStart={onStart} onPause={onPause} */onProgress={onProgress}  onBuffer={onBuffer} onBufferEnd={onBufferEnd} onEnded={onEnded}
                playing={isPlaying} volume={muted ? 0.0 : volume}
                url={videoUrl}
            />
        </div>
    )
}

export default React.memo(VideoPlayer);