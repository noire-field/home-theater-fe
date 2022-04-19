import React, { useState } from 'react';
//import { withStyles } from '@mui/styles';
import { red } from '@mui/material/colors';
import Slider from '@mui/material/Slider'
import { useNavigate } from 'react-router-dom';

/*
const VideoSlider = withStyles({
    root: {
        color: 'red',
        paddingTop: '0.75em',
        paddingBottom: '0.75em'
    },
    thumb: {
        transform: 'scale(1.5)'
    },
    rail: {
        transform: 'scaleY(2)'
    }
})(Slider);*/

function RoomWatching() {
    const navigate = useNavigate();

    const [progress, setProgress] = useState(0);
    const [sliding, setSliding] = useState(false);
    const muted = false;
    const [volume, setVolume] = useState(0.75);
    const video = {
        progress: 75,
        duration: 100
    }
    const isFullScreen = false;

    return (
        <div className='watching-room simple-fade-in'>
            <div className="wrapper">

                <div className="loading text-white">
                    <div className="loading-icon-wrapper">
                        <i className="fas fa-heart icon-front icon-bigger"></i>
                        <i className="fas fa-heart icon-back icon-bigger"></i>   
                    </div>
                </div>
                <div className='absolute left-0 top-0 w-full h-full'>
                    <div className='flex flex-col justify-between h-screen p-3 md:p-10 text-shiro'>
                        <div>
                            <div className='md:flex md:justify-between'>
                                <div className=''>
                                    <h1 onClick={() => navigate('/', { replace: true} )} className="text-3xl mt-10 md:mt-0 text-center uppercase">DOCTOR STRANGE (2013)</h1>
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
                                { /* 
                                <div className='bg-kuro-8 text-center md:text-left'>
                                    <button data-dropdown-toggle="dropdown-language" className="transition text-white bg-kuro-7 hover:bg-kuro-6 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" type="button"><img src='https://www.worldometers.info/img/flags/small/tn_us-flag.gif' className='w-5 inline mr-2'/>English <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                                    <div id='dropdown-language' className={`hidden z-10 text-base text-left list-none bg-kuro-7 rounded divide-y divide-gray-100 shadow`}>
                                        <ul className="py-1 mt-1">
                                            <li><a href="#" className="block py-2 px-4 text-sm hover:bg-kuro-6"><img src='https://www.worldometers.info/img/flags/small/tn_us-flag.gif' className='w-5 inline mr-2'/>English</a></li>
                                            <li><a href="#" className="block py-2 px-4 text-sm hover:bg-kuro-6"><img src='https://www.worldometers.info/img/flags/small/tn_lh-flag.gif' className='w-5 inline mr-2'/>Lietuvių</a></li>
                                            <li><a href="#" className="block py-2 px-4 text-sm hover:bg-kuro-6"><img src='https://www.worldometers.info/img/flags/small/tn_vm-flag.gif' className='w-5 inline mr-2'/>Tiếng Việt</a></li>
                                        </ul>
                                    </div>
                                </div> */ }
                            </div>
                        </div>
                        <div>
                        
                        </div>
                        <div>
                            <Slider value={progress} onChange={(event, value) => { setProgress(value) }} max={100} step={1} color='error'/>
                            <div className='grid grid-cols-12 mt-3'>
                                <div className='col-span-5'>
                                    <button className='btn btn-sm btn-blue'>Vote for pausing</button>
                                </div>
                                <div className='center-controls col-span-2 flex justify-center'>
                                    <div className='fast-button text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500 fas fa-backward'></div>
                                    <div className={`playpause-button text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500 ${false ? 'fas fa-pause' : 'fas fa-play'}`}></div>
                                    <div className='fast-button text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500 fas fa-forward'></div>
                                </div>
                                <div className='col-span-5 flex justify-end'>
                                    <div className="flex justify-center align-middle">
                                        <i className={`text-white text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500  leading-none text-xl mt-1.5 mr-4 fas ${ muted || volume <= 0 ? 'fa-volume-mute' : volume >= 0.35 ? 'fa-volume-up' : 'fa-volume-down' }`}></i>
                                        <div className='w-200 mt-0.5'><Slider value={volume} onChange={(event, value) => { setVolume(value) }} max={1} step={0.1} min={0} color='error'/></div>
                                    </div>
                                    <p className='ml-4 mt-1'>{ DurationSecondToText(sliding ? progress : video.progress) } <span className="text-muted">/</span> { DurationSecondToText(video.duration) }</p>
                                    <i onClick={() => {}} className={`transition-all text-3xl ml-3 text-gray-100 hover:cursor-pointer hover:text-gray-300 active:text-gray-500  ${isFullScreen ? `fas fa-compress` : `fas fa-expand`}`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function PadTimeText(num, size = 2) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

export function DurationSecondToText(duration) {
    var text;
    if(duration >= 3600) {
        var hour = PadTimeText(Math.floor(duration / 3600));
        var remainSecond = Math.floor(duration % 3600);
        var minute = PadTimeText(Math.floor(remainSecond / 60));
        remainSecond = PadTimeText(remainSecond % 60);

        text = `${hour}:${minute}:${remainSecond}`;
    } else {
        text = `${PadTimeText(Math.floor(duration / 60))}:${PadTimeText(Math.floor(duration % 60))}`;
    }

    return text;
}

export default RoomWatching;