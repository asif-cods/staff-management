import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard  from './pages/Dashboard'
import EmpMang from './pages/EmpMang'
import Login from './pages/Login'
import Header from './components/Header'
import ProtectedRoute from './routes/ProtectedRoute'
import Alert from './components/Alert'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsers } from "./redux/slices/usersSlice";
import { mockUsers } from './mockdata'
import { Box } from '@mui/material'

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setUsers(mockUsers));
  }, [dispatch]);



  return (
    <>
      <BrowserRouter basename="/staff-management">
        <Header />
        <Box sx={{ pt: { xs: '56px', md: '64px' }, px: 2 }}>
                    <Alert />
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route element={<ProtectedRoute />}> { /* // Route inside this are protected, only after login we can access this page */ }
            <Route path={'/dashboard'} element={<Dashboard />} />
            <Route path={'/emp-mang'} element={<EmpMang />} />
          </Route>
       
        </Routes>

      </Box>

      </BrowserRouter>
     
    </>
  )
}

export default App
