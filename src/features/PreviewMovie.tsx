import React, { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Slider from '@mui/material/Slider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompress, faExpand, faVolumeMute, faVolumeUp, faVolumeDown, faPlay, faPause, faForward, faBackward, faClosedCaptioning } from '@fortawesome/free-solid-svg-icons'

import { RootState, useAllDispatch } from '../store';
import { ISubtitleParsed } from '../Watch.slice';
import { AppSetLoading } from '../App.slice';

import { AppAPI, AxiosError, AxiosResponse } from '../utils/api';
import { DurationSecondToText, ParseSubtitle } from '../utils/show';

const theme = createTheme({
    palette: {
        primary: red,
    },
});

function PreviewMovie() {
    let { passCode } = useParams();
    const dispatch = useAllDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> PreviewMovie: Render`);

    // SubtitleViewer
    const [subtitles, setSubtitles] = useState<ISubtitleParsed[]>([]);

    const refPlayer = useRef();
 
    // A little hack :)
    const refPlayPause = useRef<HTMLDivElement>(null);
    const refBackward = useRef<HTMLDivElement>(null);
    const refForward = useRef<HTMLDivElement>(null);
    
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
    const [fetched, setFetched] = useState(false);

    const watchStatus = useSelector((state: RootState) => state.watch.status);
    const [showControl, setShowControl] = useState(true);

    const [title, setTitle] = useState('');

    const [movieUrl, setMovieUrl] = useState('');
    const [duration, setDuration] = useState(0.00);
    const [progress, setProgress] = useState(0.00);
    const [buffering, setBuffering] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(1.0);
    const [sliderProgress, setSliderProgress] = useState(0);
    const [sliding, setSliding] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [subtitleOn, setSubtitleOn] = useState(true);
    const [subIndex, setSubIndex] = useState(-1);
    const [lastSlideAt, setLastSlideAt] = useState(0);
    const [subText, setSubText] = useState('');

    const onProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number; }) => {
        setProgress(state.playedSeconds);
    }

    const onBuffer = () => {  setBuffering(true); }
    const onBufferEnd = () => { setBuffering(false); }
    const onEnded = () => { setPlaying(false); }

    const onProgressSliderChange = (event: Event, value: number | number[], activeThumb: number) => { 
        const newProgress = Number(value);
        if(sliderProgress === newProgress) return;

        if(!sliding) setSliding(true);

        CheckSelfSubtitle(newProgress);
        setSliderProgress(newProgress)
        onVideoSeek(newProgress);
    }

    const onClickPlayPause = () => {
        if(playing) { // Stop
            setPlaying(false);
            setBuffering(false);
        } else {
            setPlaying(true);
        }
    }

    const onFastMove = (forward: boolean) => {
        var targetProgress = (sliding ? sliderProgress : progress) + (forward ? 10 : -10);
        targetProgress = Math.max(0, Math.min(targetProgress, duration));

        if(!sliding) setSliding(true);

        CheckSelfSubtitle(targetProgress);
        setSliderProgress(targetProgress);
        onVideoSeek(targetProgress);
    }

    const onClickMute = () => {
        setMuted(!muted);
    }

    const onVolumeChange = (event: Event, value: number | number[], activeThumb: number) => { 
        const newVol = Number(value);
        if(volume === newVol) return;

        setVolume(newVol)
    }

    const onToggleFullScreen = () => {
        const element = document.querySelector("#root");
        if(!element) return;

        if(!fullScreen)
            element.requestFullscreen().then(() => {}).catch((e) => {
                alert(t('Error:Watch.UnableToEnterFullScreen'));
            })
        else document.exitFullscreen();
    }

    const onVideoSeek = useCallback(debounce((to) => {
        setSliding(false);

        setProgress(to);
        // @ts-ignore
        refPlayer.current.seekTo(to, 'seconds');
    }, 500), [refPlayer]);

    const onClickSubtitle = () => {
        setSubtitleOn(!subtitleOn);
    }

    const CheckSelfSubtitle = (to: number) => {
        setLastSlideAt(new Date().getTime())
        if(progress > to)
            setSubIndex(-1);
    }

    useEffect(() => {
        if(!subtitleOn || !refPlayer.current || !subtitles || subtitles.length <= 0) return;
        
        const timer = setInterval(() => {
            if(subIndex >= subtitles.length || !playing) return; // No more sub
            if((new Date().getTime() - lastSlideAt) < 1 * 1000) {
                return; // Don't render subtitle too early to fix currentTime bug late
            }

            // @ts-ignore
            var currentTime = refPlayer.current.getCurrentTime() * 1000; // Convert to milisec
            
            if(subIndex == -1) { // Not started
                if(subText.length > 0)
                    setSubText('');

                FindAndShowNextLine();
            } else {
                var currentLine = subtitles[subIndex];

                // Hide current line if timeout
                if(subText.length > 0 && currentTime >= currentLine.endTime)
                    setSubText('');
                
                // Show next line
                FindAndShowNextLine(); 
            }
        }, 250);

        return () => {
            clearInterval(timer);
        }
    });

    const FindAndShowNextLine = () => {
        let player = refPlayer.current;
        if(subIndex + 1 >= subtitles.length)
            return;

        // @ts-ignore
        let currentTime = player.getCurrentTime() * 1000; // Convert to milisec

        var nextLineIndex: number = -1;
        for(let i = subIndex; i < subtitles.length; i++) {
            if(i === -1) continue;
            if(currentTime >= subtitles[i].startTime) {
                nextLineIndex = i;
            } else {
                break;
            }
        }

        if(nextLineIndex !== -1 && currentTime < subtitles[nextLineIndex].endTime) {
            setSubIndex(nextLineIndex);
            setSubText(subtitles[nextLineIndex].text);
        }
    }


    // Functions
    useEffect(() => {
        if(fetched) return;

        dispatch(AppSetLoading(true));
        AppAPI.get(`/watch/get-preview/${passCode}`).then((res: AxiosResponse) => {
            if(res.status === 200) {
                setTitle(res.data.showTitle);
                setMovieUrl(res.data.movieUrl);
                setDuration(res.data.duration);
                if(res.data.subtitles) setSubtitles(ParseSubtitle(res.data.subtitles));
                setFetched(true);
            }
        }).catch((err: AxiosError) => {
            if(err.response) {
                alert(t(err.response.data.langCode || err.response.data.message));
            } else alert(t('Error:SomethingWentWrong'));

            navigate('/', { replace: true });
        }).finally(() => {
            dispatch(AppSetLoading(false));
        });
    }, [fetched]);

    useEffect(() => {
        const onMouseAction = () => {
            if(!showControl) setShowControl(true);
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
    }, [showControl]);

    const hideControls = useCallback(debounce(() => { 
        setShowControl(false);
    }, 3000), [])

    const onKeyboardPress = (e: KeyboardEvent) => {
        switch(e.code) {
            case 'Enter':
            case 'Space':
                if(!showControl) setShowControl(true);
                if(refPlayPause.current) refPlayPause.current.click();
                break;
            case 'ArrowLeft':
                if(!showControl) setShowControl(true);
                if(refBackward.current) refBackward.current.click();
                break;
            case 'ArrowRight':
                if(!showControl) setShowControl(true);
                if(refForward.current) refForward.current.click();
                break;
            default:
                break;
        }
    }

    const onFullScreenChange = () => {
        if (document.fullscreenElement) { setFullScreen(true); } else { setFullScreen(false); }
    }

    useEffect(() => {
        setShowControl(true);
        setTimeout(hideControls, 500);
    }, []);

    if(!fetched) return null;

    return (
        <div className='watching-room simple-fade-in'>
            <div className="wrapper">
                <div className='h-full'>
                    <ReactPlayer 
                        /* @ts-ignore */
                        ref={refPlayer}
                        style={{ margin: 0, padding: 0, position: 'relative' }} height='100%' width='100%' 
                        onProgress={onProgress}  onBuffer={onBuffer} onBufferEnd={onBufferEnd} onEnded={onEnded}
                        playing={playing} volume={muted ? 0.0 : volume}
                        url={movieUrl}
                    />
                </div>

                { (subtitleOn && subtitles && subtitles.length > 0) && <div className={`transition-all absolute left-1/2 -translate-x-1/2 ${showControl ? 'bottom-32' : 'bottom-10'}`}>
                    { subText.length > 0 && <p className='text-3xl text-center px-2 py-1 rounded text-white' style={{ background: 'rgba(0,0,0,0.5)' }} dangerouslySetInnerHTML={{ __html: subText }}></p> }
                </div> }
                
                { buffering && <div className="loading text-white">
                    <div className="loading-icon-wrapper">
                        <div className="lds-roller icon-front icon-bigger"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                </div> }
                <CSSTransition in={showControl} timeout={250} classNames="fade-in">
                    <div className='absolute left-0 top-0 w-full h-full'  style={!showControl ? { position: 'fixed', left: '99999px', opacity: 0 } : { }}>
                        <ThemeProvider theme={theme}>
                        <div className='flex flex-col justify-between h-screen p-3 md:p-10 text-shiro'>
                            <div>
                                <div className='md:flex md:justify-between'>
                                    <div className=''>
                                        <h1 className="text-3xl mt-10 md:mt-0 text-center uppercase">{ title }</h1>
                                    </div>
                                    <div className='w-500 max-w-full'>
                                        {/* Voting is not necessary in Preview Mode */ }
                                    </div>
                                </div>
                            </div>
                            <div>
                            
                            </div>
                            <div>
                                <Slider value={sliding ? sliderProgress : progress} onChange={onProgressSliderChange} max={duration} step={1} color={'primary'}/>
                                <div className='grid grid-cols-12 mt-3'>
                                    <div className='col-span-5'>
                                        <div className='flex flex-row items-center'>
                                            
                                        </div>
                                    </div>
                                    <div className='center-controls col-span-2 flex justify-center'>
                                        <div ref={refBackward} onClick={onFastMove.bind(null, false)}><FontAwesomeIcon className='fast-button text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500' icon={faBackward}/></div>
                                        <div ref={refPlayPause} onClick={onClickPlayPause}><FontAwesomeIcon className='playpause-button text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500' icon={playing === true ? faPause : faPlay}/></div>
                                        <div ref={refForward} onClick={onFastMove.bind(null, true)}><FontAwesomeIcon className='fast-button text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500' icon={faForward}/></div>
                                    </div>
                                    <div className='col-span-5 flex justify-end'>
                                        { subtitles.length > 0 && <span onClick={onClickSubtitle} className={`${subtitleOn ? 'text-white hover:text-gray-300 active:text-gray-500' : 'text-gray-600 hover:text-gray-400 active:text-gray-500'} hover:cursor-pointer leading-none text-xl mt-1.5 mr-4`}><FontAwesomeIcon icon={faClosedCaptioning}/></span> }
                                        <div className="flex justify-center align-middle">
                                            <span onClick={onClickMute} className={`text-white hover:cursor-pointer hover:text-gray-300 active:text-gray-500 leading-none text-xl mt-1.5 mr-4`}><FontAwesomeIcon icon={(muted || volume <= 0) ? faVolumeMute : (volume >= 0.35 ? faVolumeUp : faVolumeDown) }/></span>
                                            <div className='w-150 mt-0.5'><Slider value={volume} onChange={onVolumeChange} max={1} step={0.1} min={0} color='primary'/></div>
                                        </div>
                                        <p className='ml-4 mt-1'>{ DurationSecondToText(sliding ? sliderProgress : progress) } <span className="text-muted">/</span> { DurationSecondToText(duration) }</p>
                                        <span onClick={onToggleFullScreen} className={`transition-all text-3xl ml-3 text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500`}><FontAwesomeIcon icon={fullScreen === true ? faCompress : faExpand}/></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </ThemeProvider>
                    </div>
                </CSSTransition>
            </div>
        </div>
    )
}

export default React.memo(PreviewMovie);