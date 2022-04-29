import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import RoomWaiting from './RoomWaiting';
import RoomWatching from './RoomWatching';

import { RootState, useAllDispatch } from '../store';
import { AppSetLoading } from '../App.slice';
import { WatchSetJoined, WatchSetSubtitle, WatchStatus } from '../Watch.slice';

import { AppAPI, AxiosError, AxiosResponse } from '../utils/api';
import AppSocket from '../utils/socket';

function WatchingRoom() {
    const dispatch = useAllDispatch();
    let { passCode } = useParams();
    const joinedRoom = useSelector((state: RootState) => state.watch.joinedRoom);
    const socketConnected = useSelector((state: RootState) => state.watch.socketConnected);
    const status = useSelector((state: RootState) => state.watch.status)
    
    if(process.env.NODE_ENV === 'development')
        console.log(`App >> WatchingRoom: Render (PassCode: ${passCode})`);

    useEffect(() => {
        if(!passCode) return;
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
        if(!passCode) return;
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
                // @ts-ignore
                AppSocket.OnRoomJoined(passCode);
                dispatch(WatchSetJoined({ passCode: passCode || '', showTitle: res.data.showTitle, realStartTime: res.data.realStartTime }));
                if(res.data.subtitles) dispatch(WatchSetSubtitle(res.data.subtitles));
            }
        }).catch((res: AxiosError) => {

        }).finally(() => {
            dispatch(AppSetLoading(false));
        });
    }, [passCode, socketConnected]);

    if(!joinedRoom) return null;

    var renderContent = null;

    switch(status) {
        case WatchStatus.WATCH_WAITING: renderContent = <RoomWaiting/>; break;
        case WatchStatus.WATCH_INIT: renderContent = <React.Fragment><RoomWatching/><RoomWaiting/></React.Fragment>; break;
        case WatchStatus.WATCH_ONLINE: renderContent = <RoomWatching/>; break;
        //case WatchStatus.WATCH_FINISHED: renderContent = <div>Finished</div>; break;
    }

    return renderContent;
}

export default React.memo(WatchingRoom);