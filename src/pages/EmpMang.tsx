import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserFormDialog from "../components/UserFormDialog";
import EmployeeDirectory from "../components/UsersTable";
import type { RootState } from "../redux/app/store";
import { addUser, updateUser, deleteUser } from "../redux/slices/usersSlice";
import type {IUser} from "../redux/slices/usersSlice";
import FilterSearch from "../components/FilterSearch";
import { Typography } from "@mui/material";
import { Box, Button, Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const EmpMang = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [previewUser, setPreviewUser] = useState<IUser | null>(null);
const [dialogMode, setDialogMode] = useState<"add" | "edit" | "preview">("add");
const [searchText, setSearchText] = useState("");
const [filterDept, setFilterDept] = useState("All");

// Filtered user list
const filteredUsers = users.filter((user) => {
  const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
  const altFullName = `${user.firstName}${user.lastName}`.toLowerCase();

  const matchesSearch =
    fullName.includes(searchText.toLowerCase().trim()) ||
    altFullName.includes(searchText.toLowerCase().trim()) ||
    user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase());

  const matchesFilter =
    filterDept === "All" || user.company.department === filterDept;

  return matchesSearch && matchesFilter;
});

const handleReset = () => {
  setSearchText(""); // clears input field
  setFilterDept("All");
  // setFilteredUsers(users); // reset filtered data
};

// console.log(dialogMode);

const handleClose = () => {
  setOpen(false);
  setEditingUser(null);
  setDialogMode("add"); // Reset to default
};

  // Open form for adding new user
  const handleAdd = () => {
    setEditingUser(null);
    setDialogMode("add");
    setOpen(true);
  };

  // Open form for editing existing user
  const handleEdit = (user: IUser) => {
    setEditingUser(user);
    setDialogMode("edit");
    setOpen(true);
  };

  // Handle delete user
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  // You can add preview handler if needed, for now just alert
  const handlePreview = (user: IUser) => {
    // alert(`Previewing user: ${user.firstName} ${user.lastName}`);
    setPreviewUser(user);
    setDialogMode("preview");
    setOpen(true);
  };

  // Handle form submission for add or update
  const handleSubmit = (user: IUser) => {
    if (dialogMode === "edit") {
      // Update user
      dispatch(updateUser(user));
    } else {
      // Add new user
      dispatch(addUser(user));
    }
    handleClose();
  };

  return (
<Container maxWidth="xl" sx={{ mt:5, mb:5, width: "95%", padding: "1px 20px" }}>
<Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "flex-start", sm: "center" },
    justifyContent: "space-between",
    gap: 2,
    mb: 3,
  }}
>
  <Box>
    <Typography variant="h4" sx={{ fontWeight: 600 }}>
      Employee Management
    </Typography>
    <Typography variant="body1" sx={{ color: "text.secondary" }}>
      Manage your workforce efficiently
    </Typography>
  </Box>

  <Button
    variant="contained"
    onClick={handleAdd}
    startIcon={<AddIcon />}
    sx={{
      bgcolor: "#1976d2",
      textTransform: "none",
      px: 3,
      '&:hover': { bgcolor: "#115293" },
    }}
  >
    Add User
  </Button>
</Box>

      <FilterSearch 
      searchText={searchText}
      filterDept={filterDept}
      onSearchChange={setSearchText}
      onFilterChange={setFilterDept}
      onReset={handleReset}
/>


      <UserFormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        // initialData={editingUser ?? undefined}
        initialData={dialogMode === "preview" ? previewUser ?? undefined : editingUser ?? undefined}
        mode={dialogMode}
      />

      <EmployeeDirectory
        // users={searchText || filterDept !== "All" ? filteredUsers : users}
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPreview={handlePreview}
      />
</Container>
  );
};

export default EmpMang;