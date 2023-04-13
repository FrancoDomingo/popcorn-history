import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchHistory = createAsyncThunk(
    'history/fetch',
    async () => {
        const response = await fetch('http://localhost:4000/history');
        if (!response.ok) {
            throw new Error('Failed to fetch history');
        }
        const history = await response.json();
        return history;
    }
);

const initialState = {
    history: [],
    searchResult: null,
    status: 'idle',
    error: null
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addHistory(state, action){
            state.history.push(action.payload)
        },
        updateHistory(state, action){
            const {id, titulo_original, titulo_secundario, history_type, img, fecha, descripcion, url} = action.payload
            const existingHistory = state.history.find(history => history.id === id)

            if(existingHistory){
                existingHistory.titulo_original = titulo_original
                existingHistory.titulo_secundario = titulo_secundario
                existingHistory.history_type = history_type
                existingHistory.img = img
                existingHistory.fecha = fecha
                existingHistory.descripcion = descripcion
                existingHistory.url = url
            }
        },
        deleteHistory(state, action){
            const {id} = action.payload
            const existingHistory = state.history.findIndex(history => history.id === id)

            if(existingHistory){
                state.history.splice(existingHistory)
            }
        },
        searchInHistory(state, action){                 
            if(action.payload === null){  
                state.searchResult = null   
            }else{
                const {id} = action.payload              
                const historySearch = state.history.find(history => history.id === id)
                state.searchResult = historySearch  
            }          
        }
    },
    extraReducers: {
        [fetchHistory.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchHistory.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.history = action.payload;
        },
        [fetchHistory.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    },
})

export const { addHistory, updateHistory, deleteHistory, searchInHistory} = historySlice.actions

export const selectAllHistory = state => state.history.history

export const selectFilteredHistory = state => state.history.searchResult

export default historySlice.reducer