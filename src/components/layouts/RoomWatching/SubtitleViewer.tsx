import React, { LegacyRef, useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';

import { RootState, useAllDispatch } from '../../../store';
import { WatchSetSubtitleIndex } from '../../../Watch.slice';


interface ISubtitleViewerProps {
    refPlayer: any;
}
  

function SubtitleViewer(props: ISubtitleViewerProps) {
    const dispatch = useAllDispatch();

    const showControl = useSelector((state: RootState) => state.watch.player.showControl);
    const isPlaying = useSelector((state: RootState) => state.watch.player.isPlaying);
    const subtitles = useSelector((state: RootState) => state.watch.show.subtitles);
    const subIndex = useSelector((state: RootState) => state.watch.subtitle.index);
    const lastSlideAt = useSelector((state: RootState) => state.watch.subtitle.lastSlideAt);

    const [text, setText] = useState('');

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> WatchingRoom > RoomWatching > (4)SubtitleViewer: Render`);

    useEffect(() => {
        var player = props.refPlayer.current;
        if(!player || !subtitles || subtitles.length <= 0) return;
        
        const timer = setInterval(() => {
            if(subIndex >= subtitles.length || !isPlaying) return; // No more sub
            if((new Date().getTime() - lastSlideAt) < 1 * 1000) {
                return; // Don't render subtitle too early to fix currentTime bug late
            }

            var currentTime = player.getCurrentTime() * 1000; // Convert to milisec
            
            if(subIndex == -1) { // Not started
                if(text.length > 0)
                    setText('');

                FindAndShowNextLine();
            } else {
                var currentLine = subtitles[subIndex];

                // Hide current line if timeout
                if(text.length > 0 && currentTime >= currentLine.endTime)
                    setText('');
                
                // Show next line
                FindAndShowNextLine(); 
            }
        }, 250);

        return () => {
            clearInterval(timer);
        }
    });

    const FindAndShowNextLine = () => {
        let player = props.refPlayer.current;
        if(subIndex + 1 >= subtitles.length)
            return;

        let currentTime = player.getCurrentTime() * 1000; // Convert to milisec

        var nextLineIndex: number = -1;
        for(let i = subIndex; i < subtitles.length; i++) {
            if(i === -1) continue;
            if(currentTime >= subtitles[i].startTime)
                nextLineIndex = i;
        }

        if(nextLineIndex !== -1) {
            dispatch(WatchSetSubtitleIndex(nextLineIndex));
            setText(subtitles[nextLineIndex].text);
        }
    }

    if(!subtitles || subtitles.length <= 0) 
        return null;

    return (
        <div className={`transition-all absolute left-1/2 -translate-x-1/2 ${showControl ? 'bottom-32' : 'bottom-10'}`}>
            { text.length > 0 && <p className='text-3xl text-center px-2 py-1 rounded text-white' style={{ background: 'rgba(0,0,0,0.5)' }} dangerouslySetInnerHTML={{ __html: text }}></p> }
        </div>
    )
}

export default React.memo(SubtitleViewer);