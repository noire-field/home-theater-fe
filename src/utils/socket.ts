import io, { Socket } from "socket.io-client";

import { store } from './../store';
import { IViewer, WatchSetSocketConnected, WatchSetViewers, WatchSetStartTime, WatchStatus, WatchPrepareToWatch, IPrepareToWatch } from "../Watch.slice";

class AppSocket {
    private established: boolean;
    private client: Socket;

    constructor() {
        this.established = false;
        
        // @ts-ignore
        this.client = io(process.env.REACT_APP_SOCKET_URL, { autoConnect: false });

        // Handlers
        this.client.on('connect_error', this.OnConnectError);
        this.client.on('connect', this.OnConnect);
        this.client.on('disconnect', this.OnDisconnect);
        
        // Custom Handlers
        this.client.on('UpdateViewers', this.OnUpdateViewers);
        this.client.on('UpdateStartTime', this.OnUpdateStartTime);
        this.client.on('PrepareToWatch', this.OnPrepareToWatch);
    }

    GetClient(): Socket {
        return this.client;
    }

    Connect(): boolean {
        if(this.established) return false;

        this.client.connect();
        this.established = true;

        return true;
    }

    OnConnect() {
        store.dispatch(WatchSetSocketConnected(true));
    }

    OnDisconnect(reason: string) {
        console.log('Disconnected');
    }

    OnConnectError(error: Error) {
        console.log(error.message);
    }

    OnUpdateViewers(viewers: IViewer[]) {
        store.dispatch(WatchSetViewers(viewers));
    }

    OnUpdateStartTime(newStartTime: number) {
        store.dispatch(WatchSetStartTime(newStartTime));
    }

    OnPrepareToWatch(res: IPrepareToWatch) {
        store.dispatch(WatchPrepareToWatch(res));
    }
}

export default new AppSocket();