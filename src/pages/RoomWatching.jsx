import React, { useEffect, useRef, useState } from 'react';

import BufferingLayer from '../components/layouts/RoomWatching/BufferingLayer';
import ControlLayer from '../components/layouts/RoomWatching/ControlLayer';
import VideoPlayer from '../components/layouts/RoomWatching/VideoPlayer';

import { useAllDispatch } from '../store';
import { WatchSetPlayerFullScreen } from '../Watch.slice';

function RoomWatching() {
    const dispatch = useAllDispatch();

    
    
    const [showControls, setShowControls] = useState(true);

    // A little hack :)
    const refPlayPause = useRef();
    const refBackward = useRef();
    const refForward = useRef();

    /*useEffect(() => {
        const onMouseAction = () => {
            //if(!showControls) setShowControls(true);
            //hideControls();
        }

        document.addEventListener('mousemove', onMouseAction);
        document.addEventListener('click', onMouseAction);
        

        return () => {
            hideControls.cancel();

            document.removeEventListener('mousemove', onMouseAction);
            document.removeEventListener('click', onMouseAction);
        }
    // eslint-disable-next-line
    }, [showControls])*/

    useEffect(() => {
        document.addEventListener('keydown', onKeyboardPress);
        document.addEventListener('fullscreenchange', onFullScreenChange);

        return () => {
            document.removeEventListener('keydown', onKeyboardPress);
            document.removeEventListener('fullscreenchange', onFullScreenChange);
        }
    }, [showControls]);

    const onKeyboardPress = (e) => {
        switch(e.code) {
            case 'Enter':
            case 'Space':
                if(!showControls) setShowControls(true);
                else refPlayPause.current.click();
                break;
            case 'ArrowLeft':
                if(!showControls) setShowControls(true);
                else refBackward.current.click();
                break;
            case 'ArrowRight':
                if(!showControls) setShowControls(true);
                else refForward.current.click();
                break;
            default:
                break;
        }
    }

    const onFullScreenChange = (e) => {
        if (document.fullscreenElement) {
            dispatch(WatchSetPlayerFullScreen(true));
        } else {
            dispatch(WatchSetPlayerFullScreen(false));
        }
    }


    return (
        <div className='watching-room simple-fade-in'>
            <div className="wrapper">
                <VideoPlayer/>
                <BufferingLayer/>
                <ControlLayer refPlayPause={refPlayPause} refBackward={refBackward} refForward={refForward}/>
            </div>
        </div>
    )
}

export default React.memo(RoomWatching);