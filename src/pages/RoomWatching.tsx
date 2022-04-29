import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import BufferingLayer from '../components/layouts/RoomWatching/BufferingLayer';
import ControlLayer from '../components/layouts/RoomWatching/ControlLayer';
import VideoPlayer from '../components/layouts/RoomWatching/VideoPlayer';

import { RootState, useAllDispatch } from '../store';
import { WatchSetPlayerAllowControl, WatchSetPlayerFullScreen, WatchStatus } from '../Watch.slice';

function RoomWatching() {
    const dispatch = useAllDispatch();
    
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

    const watchStatus = useSelector((state: RootState) => state.watch.status);
    const allowControl = useSelector((state: RootState) => state.watch.player.allowControl);
    const [showControls, setShowControls] = useState(true);

    const refPlayer = React.createRef();

    // A little hack :)
    const refPlayPause = useRef<HTMLDivElement>(null);
    const refBackward = useRef<HTMLDivElement>(null);
    const refForward = useRef<HTMLDivElement>(null);

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
        // @ts-ignore
        document.addEventListener('keydown', onKeyboardPress);
        document.addEventListener('fullscreenchange', onFullScreenChange);

        return () => {
            // @ts-ignore
            document.removeEventListener('keydown', onKeyboardPress);
            document.removeEventListener('fullscreenchange', onFullScreenChange);
        }
    }, [showControls, allowControl]);

    const onKeyboardPress = (e: KeyboardEvent) => {
        if(!allowControl) return;

        switch(e.code) {
            case 'Enter':
            case 'Space':
                if(!showControls) setShowControls(true);
                else if(refPlayPause.current) refPlayPause.current.click();
                break;
            case 'ArrowLeft':
                if(!showControls) setShowControls(true);
                else if(refBackward.current) refBackward.current.click();
                break;
            case 'ArrowRight':
                if(!showControls) setShowControls(true);
                else if(refForward.current) refForward.current.click();
                break;
            default:
                break;
        }
    }

    const onFullScreenChange = () => {
        if (document.fullscreenElement) {
            dispatch(WatchSetPlayerFullScreen(true));
        } else {
            dispatch(WatchSetPlayerFullScreen(false));
        }
    }

    useEffect(() => {
        if(!loggedIn || !isAdmin)
            return;

        dispatch(WatchSetPlayerAllowControl(true));
    }, [loggedIn, isAdmin]);

    return (
        <div className='watching-room simple-fade-in' style={watchStatus == WatchStatus.WATCH_INIT ? { position: 'fixed', left: '99999px', opacity: 0 } : { }}>
            <div className="wrapper">
                <VideoPlayer ref={refPlayer}/>
                <BufferingLayer/>
                <ControlLayer refPlayer={refPlayer} refPlayPause={refPlayPause} refBackward={refBackward} refForward={refForward}/>
            </div>
        </div>
    )
}

export default React.memo(RoomWatching);