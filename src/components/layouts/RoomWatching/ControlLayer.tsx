import React, { LegacyRef, useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompress, faExpand, faVolumeMute, faVolumeUp, faVolumeDown, faPlay, faPause, faForward, faBackward, faClosedCaptioning } from '@fortawesome/free-solid-svg-icons'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Slider from '@mui/material/Slider'

import VotingBanner from './VotingBanner';
import VotingButton from './VotingButton';

import { RootState, useAllDispatch } from '../../../store';
import { WatchEnableSubtitle, WatchRequireSeek, WatchSetLastSlideAt, WatchSetPlaybackRate, WatchSetPlayerBuffering, WatchSetPlayerMuted, WatchSetPlayerPlaying, WatchSetPlayerProgress, WatchSetPlayerVolume, WatchSetSubtitleIndex } from '../../../Watch.slice';

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

    const subtitleCount = useSelector((state: RootState) => state.watch.show.subtitles.length);
    const subtitleEnable = useSelector((state: RootState) => state.watch.subtitle.on);

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

        CheckSelfSubtitle(newProgress);
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

        CheckSelfSubtitle(targetProgress);
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

    const onClickSubtitle = () => {
        dispatch(WatchEnableSubtitle(!subtitleEnable));
    }

    const CheckSelfSubtitle = (to: number) => {
        dispatch(WatchSetLastSlideAt(new Date().getTime()));
        
        // This is a moving backward? if yes, reset the subtitle index (Only self)
        if(videoProgress > to)
            dispatch(WatchSetSubtitleIndex(-1));
    }

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
                else if(diffTime >= -1500) { if(playbackRate != 1.25) dispatch(WatchSetPlaybackRate(1.25)); }
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
        <div className='absolute left-0 top-0 w-full h-full bg-control-layer'  style={props.hide ? { position: 'fixed', left: '99999px', opacity: 0 } : { }}>
            <ThemeProvider theme={theme}>
            <div className='flex flex-col justify-between h-screen p-3 md:p-10 text-shiro'>
                <div>
                    <div className='flex flex-col md:flex-row md:justify-between md:items-start items-center'>
                        <div className=''>
                            <h1 className="text-3xl mt-10 md:mt-0 text-center uppercase">{ showTitle }</h1>
                        </div>
                        <div className='w-500 max-w-full'>
                            <VotingBanner/>
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
                                <VotingButton/>
                                { showSmartSync && <p className='text-green-400'>{ t('Watch:SmartSync.Syncing') } ({ t('Watch:SmartSync.Delay')}: { delayTime.toFixed(2) }) ({ t('Watch:SmartSync.Rate')}: { playbackRate })</p> }
                            </div>
                        </div>
                        <div className='center-controls col-span-2 flex justify-center'>
                            <div ref={props.refBackward} onClick={onFastMove.bind(null, false)}><FontAwesomeIcon className='fast-button text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500' icon={faBackward}/></div>
                            <div ref={props.refPlayPause} onClick={onClickPlayPause}><FontAwesomeIcon className='playpause-button text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500' icon={isPlaying === true ? faPause : faPlay}/></div>
                            <div ref={props.refForward} onClick={onFastMove.bind(null, true)}><FontAwesomeIcon className='fast-button text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500' icon={faForward}/></div>
                        </div>
                        <div className='col-span-5 flex justify-end'>
                            { subtitleCount > 0 && <span onClick={onClickSubtitle} className={`${subtitleEnable ? 'text-white hover:text-gray-300 active:text-gray-500' : 'text-gray-600 hover:text-gray-400 active:text-gray-500'} hover:cursor-pointer leading-none text-xl mt-1.5 mr-4`}><FontAwesomeIcon icon={faClosedCaptioning}/></span> }
                            <div className="flex justify-center align-middle">
                                <span onClick={onClickMute} className={`text-white hover:cursor-pointer hover:text-gray-300 active:text-gray-500 leading-none text-xl mt-1.5 mr-4`}><FontAwesomeIcon icon={(muted || volume <= 0) ? faVolumeMute : (volume >= 0.35 ? faVolumeUp : faVolumeDown) }/></span>
                                <div className='w-150 mt-0.5'><Slider value={volume} onChange={onVolumeChange} max={1} step={0.1} min={0} color='primary'/></div>
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