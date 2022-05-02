import React, { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import debounce from 'lodash.debounce';

import BufferingLayer from '../components/layouts/RoomWatching/BufferingLayer';
import ControlLayer from '../components/layouts/RoomWatching/ControlLayer';
import VideoPlayer from '../components/layouts/RoomWatching/VideoPlayer';
import SubtitleViewer from '../components/layouts/RoomWatching/SubtitleViewer';

import { RootState, useAllDispatch } from '../store';
import { WatchSetPlayerAllowControl, WatchSetPlayerFullScreen, WatchSetShowControl, WatchStatus } from '../Watch.slice';

function RoomWatching() {
    const dispatch = useAllDispatch();
    
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

    const watchStatus = useSelector((state: RootState) => state.watch.status);
    const allowControl = useSelector((state: RootState) => state.watch.player.allowControl);
    const showControl = useSelector((state: RootState) => state.watch.player.showControl);

    const refPlayer = React.createRef();

    // A little hack :)
    const refPlayPause = useRef<HTMLDivElement>(null);
    const refBackward = useRef<HTMLDivElement>(null);
    const refForward = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onMouseAction = () => {
            if(!showControl) dispatch(WatchSetShowControl(true));
            hideControls();
        }

        // @ts-ignore
        document.addEventListener('keydown', onKeyboardPress);
        document.addEventListener('fullscreenchange', onFullScreenChange);
        document.addEventListener('mousemove', onMouseAction);
        document.addEventListener('click', onMouseAction);

        return () => {
            hideControls.cancel();

            // @ts-ignore
            document.removeEventListener('keydown', onKeyboardPress);
            document.removeEventListener('fullscreenchange', onFullScreenChange);
            document.removeEventListener('mousemove', onMouseAction);
            document.removeEventListener('click', onMouseAction);
        }
    }, [showControl, allowControl]);

    const hideControls = useCallback(debounce(() => { 
        dispatch(WatchSetShowControl(false));
    }, 3000), [])

    const onKeyboardPress = (e: KeyboardEvent) => {
        if(!allowControl) return;

        switch(e.code) {
            case 'Enter':
            case 'Space':
                if(!showControl) dispatch(WatchSetShowControl(true));
                if(refPlayPause.current) refPlayPause.current.click();
                break;
            case 'ArrowLeft':
                if(!showControl) dispatch(WatchSetShowControl(true));
                if(refBackward.current) refBackward.current.click();
                break;
            case 'ArrowRight':
                if(!showControl) dispatch(WatchSetShowControl(true));
                if(refForward.current) refForward.current.click();
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

    useEffect(() => {
        if(watchStatus == WatchStatus.WATCH_ONLINE) {
            dispatch(WatchSetShowControl(true));
            setTimeout(hideControls, 500);
        }
    }, [watchStatus]);

    return (
        <div className='watching-room simple-fade-in' style={watchStatus == WatchStatus.WATCH_INIT ? { position: 'fixed', left: '99999px', opacity: 0 } : { }}>
            <div className="wrapper">
                <VideoPlayer ref={refPlayer}/>
                <SubtitleViewer/>
                <BufferingLayer/>
                <CSSTransition in={showControl} timeout={250} classNames="fade-in">
                    <ControlLayer hide={!showControl} refPlayer={refPlayer} refPlayPause={refPlayPause} refBackward={refBackward} refForward={refForward}/>
                </CSSTransition>
            </div>
        </div>
    )
}

export default React.memo(RoomWatching);