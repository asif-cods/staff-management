import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/app/store';
import { hideAlert } from '../redux/slices/alertSlice';

const AlertSnackbar = () => {
  const dispatch = useDispatch();
  const { message, type, isVisible } = useSelector((state: RootState) => state.alert); //when change the state and makes isVisible true, which your useSelector will reflect.

  const handleClose = () => {
    console.log("alert--");
    dispatch(hideAlert());
  };

  return (
    <Snackbar
      open={isVisible}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
