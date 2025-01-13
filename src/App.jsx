import NavBar from './components/NavBar'
import AddBlog from './components/AddBlog'
import Container from '@mui/material/Container'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import FullScreenDialog from './components/Editbox'
import { Alert } from '@mui/material'
import { useState } from 'react'
import Alertmsg from './components/Alertmsg'

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (type,msg)=>{
    setAlert({
      msg:msg,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  
  return (
    <>
    <BrowserRouter>
    <NavBar />
      
      <Container maxWidth="lg">
      <Alertmsg alert={alert}/>
        <Routes>
          <Route exaxt path = '/' element={<FullScreenDialog showAlert={showAlert}/>}/>
          <Route exaxt path='/add_blog' element={<AddBlog showAlert={showAlert}/>}/>
        </Routes>
         
      </Container>

    </BrowserRouter>
      
      
    </>
  )
}

export default App
