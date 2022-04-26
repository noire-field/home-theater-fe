import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import RoomWaiting from './RoomWaiting';

import { RootState, useAllDispatch } from '../store';
import { AppSetLoading } from '../App.slice';
import { WatchSetJoined, WatchSetSubtitle } from '../Watch.slice';

import { AppAPI, AxiosError, AxiosResponse } from '../utils/api';
import AppSocket from '../utils/socket';

function WatchingRoom() {
    const dispatch = useAllDispatch();
    let { passCode } = useParams();
    const joinedRoom = useSelector((state: RootState) => state.watch.joinedRoom);
    const socketConnected = useSelector((state: RootState) => state.watch.socketConnected);
    
    if(process.env.NODE_ENV === 'development')
        console.log(`App >> WatchingRoom: Render (PassCode: ${passCode})`);

    useEffect(() => {
        if(joinedRoom) {
            if(process.env.NODE_ENV === 'development')
                console.log(`App >> WatchingRoom: Room Joined`);

            return;
        }

        if(process.env.NODE_ENV === 'development')
            console.log(`App >> WatchingRoom: Socket Connecting...`);

        dispatch(AppSetLoading(true));
        AppSocket.Connect(); 
    }, [passCode, joinedRoom]);

    useEffect(() => {
        if(!socketConnected) return;

        const socketId = AppSocket.GetClient().id;
        const friendlyName = localStorage.getItem('friendlyName') || 'Viewer-009';

        if(process.env.NODE_ENV === 'development')
            console.log(`App >> WatchingRoom: Socket Connected (${socketId}), Joining Room...`);

        AppAPI.post(`/watch/room/${passCode}/join`, { 
            clientId: socketId,
            friendlyName,
            withSubtitle: true
        }).then((res: AxiosResponse) => {
            if(res.status === 200) {
                dispatch(WatchSetJoined({ passCode: passCode || '', showTitle: res.data.showTitle, realStartTime: res.data.realStartTime }));
                if(res.data.subtitles) dispatch(WatchSetSubtitle(res.data.subtitles));
            }
        }).catch((res: AxiosError) => {

        }).finally(() => {
            dispatch(AppSetLoading(false));
        });
    }, [socketConnected]);

    if(!joinedRoom) return null;

    return (
        <React.Fragment>
            <RoomWaiting/>
        </React.Fragment>
    )
}

export default React.memo(WatchingRoom);