import React from 'react';
import { useParams } from 'react-router-dom';

function WatchingRoom() {
    let { passCode } = useParams();
    
    if(process.env.NODE_ENV === 'development')
        console.log(`App >> WatchingRoom: Render (PassCode: ${passCode})`);

    return (
        <div>
            <p>Test</p>
        </div>
    )
}

export default React.memo(WatchingRoom);