import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from './Layout';
import HomePage from '@/pages/HomePage';
import EventsPage from './pages/EventsPage';
import RegisterPage from './auth/RegisterPage';
import LoginPage from './auth/LoginPage';
import ProtectedRoute from "./auth/ProtectedRoute"
import EventRoom from './components/EventRoom';
import CreateEvent from './components/events/CreateEvent';

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage/>} />
          <Route path='/events' element={<EventsPage/>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/event/:eventId" element={<EventRoom />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Route>
        </Route>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App