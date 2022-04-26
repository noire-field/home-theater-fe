import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { DurationSecondToText } from '../utils/show';

function CountdownTimer() {
    const realStartTime = useSelector((state: RootState) => state.watch.show.realStartTime);
    const [text, setText] = useState('00:00');
    
    const startTime = new Date(realStartTime);

    useLayoutEffect(() => { UpdateTime() })
    useEffect(() => {
        const timer = setInterval(UpdateTime, 1000);
        return () => { clearInterval(timer); }
    }, [realStartTime]);

    const UpdateTime = () => {
        const currentTime = new Date();
        if(currentTime.getTime() >= startTime.getTime()) {
            setText('00:00');
            return;
        }

        const timeleft = (startTime.getTime() - currentTime.getTime()) / 1000;
        setText(DurationSecondToText(timeleft));
    }

    return <span>{ text }</span>
}

export default React.memo(CountdownTimer);