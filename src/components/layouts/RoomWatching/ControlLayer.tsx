import React, { LegacyRef, useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompress, faExpand, faVolumeMute, faVolumeUp, faVolumeDown, faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Slider from '@mui/material/Slider'

import { RootState, useAllDispatch } from '../../../store';
import { WatchRequireSeek, WatchSetPlaybackRate, WatchSetPlayerBuffering, WatchSetPlayerMuted, WatchSetPlayerPlaying, WatchSetPlayerProgress, WatchSetPlayerVolume } from '../../../Watch.slice';

import { DurationSecondToText } from '../../../utils/show';
import AppSocket from '../../../utils/socket';

const theme = createTheme({
    palette: {
        primary: red,
    },
});

interface IControlLayerProps {
    hide: boolean;
    refPlayer: any;
    refBackward: LegacyRef<HTMLDivElement> | undefined;
    refForward: LegacyRef<HTMLDivElement> | undefined;
    refPlayPause: LegacyRef<HTMLDivElement> | undefined;
}
  
function ControlLayer(props: IControlLayerProps) {
    const { t } = useTranslation();
    const dispatch = useAllDispatch();

    const showTitle = useSelector((state: RootState) => state.watch.show.title);
    const videoProgress = useSelector((state: RootState) => state.watch.player.progress);
    const videoDuration = useSelector((state: RootState) => state.watch.player.duration);
    const realStartTime = useSelector((state: RootState) => state.watch.show.realStartTime);
    const allowControl = useSelector((state: RootState) => state.watch.player.allowControl);
    const requireSeek = useSelector((state: RootState) => state.watch.requireSeek);

    const isPlaying = useSelector((state: RootState) => state.watch.player.isPlaying);
    const isBuffering = useSelector((state: RootState) => state.watch.player.isBuffering);
    const isFullScreen = useSelector((state: RootState) => state.watch.player.isFullScreen);
    const muted = useSelector((state: RootState) => state.watch.player.muted);
    const playbackRate = useSelector((state: RootState) => state.watch.player.playbackRate);
    const smartSync = useSelector((state: RootState) => state.watch.show.smartSync) > 0 ? true : false;

    const [sliderProgress, setSliderProgress] = useState(0);
    const [sliding, setSliding] = useState(false);
    const [volume, setVolume] = useState(0.0);
    const [delayTime, setDelayTime] = useState(0.00);
    const [showSmartSync, setShowSmartSync] = useState(false);

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> WatchingRoom > RoomWatching > (3)ControlLayer: Render`);

    const onProgressSliderChange = (event: Event, value: number | number[], activeThumb: number) => { 
        if(!allowControl) return;

        const newProgress = Number(value);
        if(sliderProgress === newProgress) return;

        if(!sliding) setSliding(true);

        setSliderProgress(newProgress)
        onVideoSeek(newProgress);
    }

    const onClickPlayPause = () => {
        if(!allowControl) return;

        if(isPlaying) { // Stop
            dispatch(WatchSetPlayerPlaying(false));
            dispatch(WatchSetPlayerBuffering(false));
            AppSocket.PauseShow();
        } else {
            //dispatch(WatchSetPlayerPlaying(true));
            AppSocket.ResumeShow();
        }
    }

    const onFastMove = (forward: boolean) => {
        if(!allowControl) return;

        var targetProgress = (sliding ? sliderProgress : videoProgress) + (forward ? 10 : -10);
        targetProgress = Math.max(0, Math.min(targetProgress,videoDuration));

        if(!sliding) setSliding(true);

        setSliderProgress(targetProgress);
        onVideoSeek(targetProgress);
    }

    const onClickMute = () => {
        dispatch(WatchSetPlayerMuted(!muted));
    }

    const onVolumeChange = (event: Event, value: number | number[], activeThumb: number) => { 
        const newVol = Number(value);
        if(volume === newVol) return;

        setVolume(newVol)
        dispatch(WatchSetPlayerVolume(newVol));
    }

    const onToggleFullScreen = () => {
        const element = document.querySelector("#root");
        if(!element) return;

        if(!isFullScreen)
            element.requestFullscreen().then(() => {}).catch((e) => {
                alert(t('Error:Watch.UnableToEnterFullScreen'));
            })
        else document.exitFullscreen();
    }

    const onVideoSeek = useCallback(debounce((to) => {
        setSliding(false);

        if(!allowControl) return;

        dispatch(WatchSetPlayerProgress(to));
        props.refPlayer.current.seekTo(to, 'seconds');

        AppSocket.SlideShow(to);
    }, 500), [allowControl, props.refPlayer]);

    useEffect(() => {
        if(!requireSeek.on) return;

        dispatch(WatchSetPlayerProgress(requireSeek.to));
        props.refPlayer.current.seekTo(requireSeek.to, 'seconds');

        dispatch(WatchRequireSeek({ on: false, to: 0.0 }));
    }, [requireSeek.on, requireSeek.to])

    useEffect(() => {
        if(!smartSync) return; // SmartSync is OFF
        if(!isPlaying || requireSeek.on || isBuffering) return; 
        const player = props.refPlayer.current;

        if(!player) return;
        
        const timer = setInterval(() => {
            const startTime = new Date(realStartTime);
            const supposedTime = new Date().getTime() - startTime.getTime();

            const diffTime = (player.getCurrentTime() * 1000) - supposedTime
            
            if(diffTime < 0) { // Late!
                if(diffTime >= - 100 && showSmartSync) setShowSmartSync(false);
                else if(diffTime < -100 && !showSmartSync) setShowSmartSync(true);

                if(diffTime >= -100) { if(playbackRate != 1.00) dispatch(WatchSetPlaybackRate(1.00)); }
                else if(diffTime >= -500) { if(playbackRate != 1.125) dispatch(WatchSetPlaybackRate(1.125)); }
                else if(diffTime >= -1000) { if(playbackRate != 1.25) dispatch(WatchSetPlaybackRate(1.25)); }
                else if(diffTime >= -3000) { if(playbackRate != 1.5) dispatch(WatchSetPlaybackRate(1.5)); }
                else { // Late more than 3 seconds
                    // Seek!
                    dispatch(WatchRequireSeek({ on: true, to: supposedTime / 1000 }));
                }
            }

            setDelayTime(diffTime);
        }, 250);

        return () => {
            clearInterval(timer);
        }
    });

    return (
        <div className='absolute left-0 top-0 w-full h-full'  style={props.hide ? { position: 'fixed', left: '99999px', opacity: 0 } : { }}>
            <ThemeProvider theme={theme}>
            <div className='flex flex-col justify-between h-screen p-3 md:p-10 text-shiro'>
                <div>
                    <div className='md:flex md:justify-between'>
                        <div className=''>
                            <h1 className="text-3xl mt-10 md:mt-0 text-center uppercase">{ showTitle }</h1>
                        </div>
                        <div className='w-500 max-w-full'>
                            <div className="px-4 py-2 bg-blue-100 rounded-lg dark:bg-blue-200" role="alert">
                                <div className="flex items-center">
                                    <svg className="mr-1 w-5 h-5 text-blue-700 dark:text-blue-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                    <p className="text-lg font-medium text-blue-700 dark:text-blue-800">Justas wants to pause the movie for a while, do you agree?</p>
                                </div>
                                <div className='flex justify-end'>
                                    <button className='btn btn-sm btn-blue mr-1'>Agree (10)</button>
                                    <button className='btn btn-sm btn-blue'>No (10)</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                
                </div>
                <div>
                    <Slider value={sliding ? sliderProgress : videoProgress} onChange={onProgressSliderChange} max={videoDuration} step={1} color={'primary'}/>
                    <div className='grid grid-cols-12 mt-3'>
                        <div className='col-span-5'>
                            <div className='flex flex-row items-center'>
                                <button className='btn btn-sm btn-blue mr-3'>Vote for pausing</button>
                                { showSmartSync && <p className='text-green-400'>{ t('Watch:SmartSync.Syncing') } ({ t('Watch:SmartSync.Delay')}: { delayTime.toFixed(2) }) ({ t('Watch:SmartSync.Rate')}: { playbackRate })</p> }
                            </div>
                        </div>
                        <div className='center-controls col-span-2 flex justify-center'>
                            <div ref={props.refBackward} onClick={onFastMove.bind(null, false)}><FontAwesomeIcon className='fast-button text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500' icon={faBackward}/></div>
                            <div ref={props.refPlayPause} onClick={onClickPlayPause}><FontAwesomeIcon className='playpause-button text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500' icon={isPlaying === true ? faPause : faPlay}/></div>
                            <div ref={props.refForward} onClick={onFastMove.bind(null, true)}><FontAwesomeIcon className='fast-button text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500' icon={faForward}/></div>
                        </div>
                        <div className='col-span-5 flex justify-end'>
                            <div className="flex justify-center align-middle">
                                <span onClick={onClickMute} className={`text-white hover:cursor-pointer hover:text-gray-300 active:text-gray-500 leading-none text-xl mt-1.5 mr-4`}><FontAwesomeIcon icon={(muted || volume <= 0) ? faVolumeMute : (volume >= 0.35 ? faVolumeUp : faVolumeDown) }/></span>
                                <div className='w-200 mt-0.5'><Slider value={volume} onChange={onVolumeChange} max={1} step={0.1} min={0} color='primary'/></div>
                            </div>
                            <p className='ml-4 mt-1'>{ DurationSecondToText(sliding ? sliderProgress : videoProgress) } <span className="text-muted">/</span> { DurationSecondToText(videoDuration) }</p>
                            <span onClick={onToggleFullScreen} className={`transition-all text-3xl ml-3 text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500`}><FontAwesomeIcon icon={isFullScreen === true ? faCompress : faExpand}/></span>
                        </div>
                    </div>
                </div>
            </div>
            </ThemeProvider>
        </div>
    )
}

export default React.memo(ControlLayer);