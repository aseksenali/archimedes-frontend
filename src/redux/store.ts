import { UserStoreState } from '../interfaces/state/UserStoreState'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { scheduleApi } from './reducers/scheduleApi'
import userReducers, { userApi } from './reducers/userSlice'
import { medicApi } from './reducers/medicApi'
import { specialtyApi } from './reducers/specialtyApi'
import { branchApi } from './reducers/branchApi'
import { appointmentApi } from './reducers/appointmentApi'

const saveToLocalStorage = (name: string, state: UserStoreState) => {
    try {
        localStorage.setItem(name, JSON.stringify(state))
    } catch (e) {
        console.error(e)
    }
}

const loadFromLocalStorage = () => {
    try {
        const stateStr = [ { name: 'user', item: localStorage.getItem('user') } ]
        const objects = stateStr.map(str => ({ name: str.name, item: str.item ? JSON.parse(str.item) : undefined }))
        return objects
            .reduce((previousValue, currentValue) => ({
                ...previousValue,
                [currentValue.name]: currentValue.item,
            }), {})
    } catch (e) {
        console.error(e)
        return undefined
    }
}

const persistedStore = loadFromLocalStorage()

const store = configureStore({
    reducer: {
        user: userReducers,
        [scheduleApi.reducerPath]: scheduleApi.reducer,
        [medicApi.reducerPath]: medicApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [specialtyApi.reducerPath]: specialtyApi.reducer,
        [branchApi.reducerPath]: branchApi.reducer,
        [appointmentApi.reducerPath]: appointmentApi.reducer,
    },
    preloadedState: persistedStore,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(scheduleApi.middleware)
        .concat(medicApi.middleware)
        .concat(userApi.middleware)
        .concat(specialtyApi.middleware)
        .concat(branchApi.middleware)
        .concat(appointmentApi.middleware),
})

setupListeners(store.dispatch)

store.subscribe(() => {
    saveToLocalStorage('user', store.getState().user)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store