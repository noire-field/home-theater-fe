import React, { LegacyRef, useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';

import { RootState, useAllDispatch } from '../../../store';

function SubtitleViewer() {
    const showControl = useSelector((state: RootState) => state.watch.player.showControl);
    const subtitles = useSelector((state: RootState) => state.watch.show.subtitles);
    
    console.log(subtitles);

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> WatchingRoom > RoomWatching > (4)SubtitleViewer: Render`);

    return (
        <div className={`transition-all absolute left-1/2 -translate-x-1/2 ${showControl ? 'bottom-32' : 'bottom-10'}`}>
            <p className='text-3xl text-center px-2 py-1 rounded text-white' style={{ background: 'rgba(0,0,0,0.5)' }}>Hello, I see what you did there<br/>But what's wrong, John?</p>
        </div>
    )
}

export default React.memo(SubtitleViewer);