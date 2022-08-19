import React, { StrictMode } from 'react'
import './App.css'
import { Provider } from 'react-redux'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from './redux/store'
import Login from './pages/Login/Login'
import Schedule from './pages/Schedule/Schedule'
import MainPage from './pages/MainPage/MainPage'
import Ambulance from './pages/Ambulance/Ambulance'
import ScheduleDetails from './pages/Schedule/ScheduleDetails/ScheduleDetails'
import ScheduleOverall from './pages/Schedule/ScheduleOverall/ScheduleOverall'

const AppWrapper = () => {
    return (
        <StrictMode>
            <Provider store={ store }>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </StrictMode>
    )
}

const App = () => {
    return (
        <Routes>
            <Route path={ '/login' } element={ <Login/> }/>
            <Route path={ '/views' } element={ <MainPage/> }>
                <Route path={ '/views/schedule' } element={ <Schedule/> }>
                    <Route index element={ <ScheduleOverall/> }/>
                    <Route path={ '/views/schedule/details' } element={ <ScheduleDetails/> }/>
                </Route>
                <Route path={ '/views/ambulance' } element={ <Ambulance/> }/>
            </Route>
            <Route path={ '*' } element={ <span>404</span> }/>
        </Routes>
    )
}

export default AppWrapper
