import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

function BufferingLayer() {
    const isBuffering = useSelector((state: RootState) => state.watch.player.isBuffering);

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> WatchingRoom > RoomWatching > (2)BufferingLayer: Render (Buffering: ${isBuffering})`);

    if(!isBuffering) return null;
    
    return (
        <div className="loading text-white">
            <div className="loading-icon-wrapper">
                <div className="lds-roller icon-front icon-bigger"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}

export default React.memo(BufferingLayer);