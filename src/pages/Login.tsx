import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect  } from 'react';
import { showAlert } from '../redux/slices/alertSlice';
import { useNavigate  } from "react-router-dom";
import { login } from '../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/app/store';


const Login = () => {
    interface IformData {
        userName: string,
        password: string
    }
    const [formData, setFormData] = useState<IformData>({
        userName:'',
        password: ''
    });

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    // useeffect for navigate and alert
useEffect(() => {
  if (isLoggedIn) {
    dispatch(showAlert({
      message: 'Successfully logged in',
      type: 'success'
    }));
    navigate('/dashboard');
  }
}, [isLoggedIn]);

    const handleLogin = (e: React.FormEvent)=> {
        e.preventDefault();
        // console.log("Username:", formData.userName);
        // console.log("Password:", formData.password);

       if (formData.userName.trim() === "" || formData.password.trim() === ""){
            // alert("Please enter both username and password");
            dispatch(showAlert({
                message: 'Please enter both username and password',
                type: 'error'
            }));

            return; // stops to countinue this func
        }

        dispatch(login({ userName: formData.userName, password: formData.password }));

        setFormData({
                    userName:'',
                    password: ''
                });
        if (!isLoggedIn) {

            return(
                dispatch(showAlert({
                message: 'Wrong username or password',
                type: 'warning'
            }))
        )
            }

            
        }
            

  return (
    <>
 <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        width: 300,
        mx: 'auto',
        mt: 10,
        p: 4,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
    <div className='.show-alert'></div>   {/* to show alert in UI */}
      <Typography variant="h5" mb={2} align="center">
        Admin
      </Typography>
      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        margin="normal"
        value={formData.userName}
        onChange={(e) => setFormData({...formData, userName: e.target.value  })}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value  })}
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>

    </>
  )
}

export default Login

