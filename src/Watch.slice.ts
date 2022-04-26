import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IViewer {
    friendlyName: string;
    level: number;
}

export interface ISubtitleLine {
    id: string;
    startTime: string;
    endTime: string;
    text: string;
}

export interface ISetJoinedState {
    passCode: string;
    showTitle: string;
    realStartTime: string;
}

export interface WatchState {
    joinedRoom: boolean;
    passCode: string;
    socketConnected: boolean;

    show: {
        title: string;
        realStartTime: string;
        subtitles: ISubtitleLine[];
    };
    viewers: IViewer[];
}

const initialState: WatchState = {
    joinedRoom: false,
    passCode: '',
    socketConnected: false,
    show: {
        title: '',
        realStartTime: '0',
        subtitles: []
    },
    viewers: []
}

export const WatchSlice = createSlice({
    name: 'watch',
    initialState,
    reducers: {
        WatchSetSocketConnected(state, action: PayloadAction<boolean>) {
            state.socketConnected = action.payload;
        },
        WatchSetJoined(state, action: PayloadAction<ISetJoinedState>) {
            state.joinedRoom = true;
            state.passCode = action.payload.passCode;
            state.show.title = action.payload.showTitle;
            state.show.realStartTime = action.payload.realStartTime;
        },
        WatchSetSubtitle(state, action: PayloadAction<ISubtitleLine[]>) {
            state.show.subtitles = action.payload;
        },
        WatchSetViewers(state, action: PayloadAction<IViewer[]>) {
            state.viewers = action.payload;
        },
        WatchSetStartTime(state, action: PayloadAction<number>) {
            state.show.realStartTime = new Date(action.payload).toString();
        }
    }
});

export const { WatchSetSocketConnected, WatchSetJoined, WatchSetSubtitle, WatchSetViewers, WatchSetStartTime } = WatchSlice.actions;

// Export
export default WatchSlice.reducer;