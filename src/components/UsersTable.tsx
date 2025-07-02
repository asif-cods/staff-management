import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Avatar, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type {IUser} from "../redux/slices/usersSlice";
import { Pagination } from '@mui/material';
import { useState } from 'react';


interface EmployeeDirectoryProps {
   users: IUser[];
  onEdit: (user: IUser) => void;
  onDelete: (user: number) => void;   //accept only id
  onPreview: (user: IUser) => void;
}


const EmployeeDirectory = ({ users, onEdit, onDelete, onPreview }: EmployeeDirectoryProps) => {

  // const users = useSelector((state: RootState) => state.users.users);  // Because you're already passing users as a prop from EmpMang.

  // pagination logic 

const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 6;

const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

const totalPages = Math.ceil(users.length / usersPerPage);

const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
  setCurrentPage(value);
};


  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>Employee Directory</Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
            <TableCell>Employee</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
<TableBody>
  {currentUsers.length === 0 ? (
    <TableRow>
      <TableCell colSpan={6} align="center">
        No employees found
      </TableCell>
    </TableRow>
  ) : (
    currentUsers.map((user) => (
      <TableRow key={user.id}>
        <TableCell>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={user.image} alt={user.firstName} />
            <Typography>{user.firstName} {user.lastName}</Typography>
          </Stack>
        </TableCell>
        <TableCell>{user.company.department}</TableCell>
        <TableCell>{user.company.title}</TableCell>
        <TableCell>{`${user.address.city}, ${user.address.state}`}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell align="center">
          <IconButton color="primary" onClick={() => onEdit(user)}>
            <EditIcon />
          </IconButton>
          <IconButton color="info" onClick={() => onPreview(user)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(user.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>
</Table>

{totalPages > 1 && (
  <Stack alignItems="center" sx={{ my: 2 }}>
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
    />
  </Stack>
)}
    </TableContainer>
  );
};

export default EmployeeDirectory;
