import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MovieShow {
    id: number;
    passCode: string;
    title: string;
    movieUrl: string;
    subtitleUrl: string;
    startTime: Date;
    duration: number;
    smartSync: number;
    votingControl: number;
    status: number;
    finishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface MovieShowState {
    fetched: boolean;
    list: MovieShow[];
}

export interface IShowUpdatePayload {
    id: number;
    show: MovieShow;
}

const initialState: MovieShowState = {
    fetched: false,
    list: []
}

export const ShowSlice = createSlice({
    name: 'show',
    initialState,
    reducers: {
        ShowSetFetched(state, action: PayloadAction<boolean>) {
            state.fetched = action.payload;
        },
        ShowSetList(state, action: PayloadAction<MovieShow[]>) {
            state.list = action.payload;
        },
        ShowUnshift(state, action: PayloadAction<MovieShow>) {
            state.list.unshift(action.payload);
        },
        ShowUpdate(state, action: PayloadAction<IShowUpdatePayload>) {
            var showIndex = state.list.findIndex((m: MovieShow) => m.id === action.payload.id);
            if(showIndex != -1) state.list[showIndex] = action.payload.show;
        },
        ShowDelete(state, action: PayloadAction<number>) {
            state.list = state.list.filter((show: MovieShow) => show.id !== action.payload);
        }
    }
});

export const { ShowSetFetched, ShowSetList, ShowUnshift, ShowUpdate, ShowDelete } = ShowSlice.actions;

// Export
export default ShowSlice.reducer;