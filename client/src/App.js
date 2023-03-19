import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HistoryList from './components/HistoryList'
import HistoryForm from './components/HistoryForm'
import {Container} from '@mui/material'
import Navbar from './components/Navbar'

export default function App(){
  return(
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<HistoryList/>} />
          <Route path="/history/new" element={<HistoryForm/>} />
          <Route path="/history/:id/edit" element={<HistoryForm/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}