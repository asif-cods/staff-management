import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, MenuItem} from "@mui/material";
import { useState } from "react";
import type { ChangeEvent } from "react";
import  { useEffect } from "react";
import { useSelector } from "react-redux";
// import { addUser } from "../redux/slices/usersSlice";
import  type { RootState } from "../redux/app/store";

interface IUserFormData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  eyeColor: string;
  bloodGroup: string;
  university: string;
  company: {
    department: string;
    title: string;
  };
  address: {
    city: string;
    state: string;
  };
  image: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: IUserFormData) => void;
  initialData?: IUserFormData; // optional for editing
  mode?: "add" | "edit" | "preview";

}


const UserFormDialog = ({ open, onClose, onSubmit, initialData, mode = "add", }: Props) => {

  // const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const getNextId = () => {
    if (users.length === 0) return 1;
    return Math.max(...users.map((u) => u.id)) + 1;
  };

  const [formData, setFormData] = useState<IUserFormData>(
    {
    id: getNextId(),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: 0 ,
    gender: "",
    eyeColor: "",
    bloodGroup: "",
    university: "",
    company: { department: "", title: "" },
    address: { city: "", state: "" },
    image: "",
  }


);

  const isViewMode = mode === "preview";
  const isEditMode = mode === "edit";


  const genderOptions = ["Male", "Female", "Other"];
  const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const departmentOptions = ["Support", "Engineer", "HR", "Research and Develop", "Sales", "Marketing"];

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
       // Fully reset form on add mode
    setFormData({
      id: getNextId(),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: 0,
      gender: "",
      eyeColor: "",
      bloodGroup: "",
      university: "",
      company: { department: "", title: "" },
      address: { city: "", state: "" },
      image: "",
    });
    }
  }, [initialData, open]);

  const handleNestedChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    parentKey: "company" | "address"
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [parentKey]: { ...prev[parentKey], [name]: value },
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "age") {
      setFormData((prev) => ({
        ...prev,
        age: Number(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.company.department.trim() ||
      !formData.company.title.trim() ||
      !formData.address.city.trim() ||
      !formData.address.state.trim() ||
      !formData.phone.trim() ||
      !formData.bloodGroup.trim() ||
      !formData.university.trim() ||
      !formData.eyeColor.trim() ||
      !(formData.age > 0)

    ) {
      alert("Please fill in all required fields: First Name, Last Name, Email");
      return;
    }
    const finalUser = {
            ...formData,
            id: isEditMode ? formData.id : getNextId(),
            image: `https://dummyjson.com/icon/${formData.firstName.toLowerCase()}/128`,
          };
    // email validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email address");
        return;
      }

    onSubmit(finalUser);
    onClose();

  };

  const disabled = isViewMode;
  // disabled={disabled}

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{
        mode === "add"
        ? "Add New Employee"
        : mode === "edit"
        ? "Edit Employee"
        : "Employee Preview" }
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={disabled}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={disabled}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={disabled}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={disabled}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              // value={formData.age}
              value={formData.age === 0 ? "" : formData.age}
              onChange={handleChange}
              disabled={disabled}
            //   inputProps={{ min: 0 }}
            />
          </Grid>

        <Grid size={6}>
        <TextField
            select
            fullWidth
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={disabled}
        >
            {genderOptions.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
            ))}
        </TextField>
        </Grid>

        <Grid size={6}>
        <TextField
            select
            fullWidth
            label="Blood Group"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            disabled={disabled}
        >
            {bloodGroupOptions.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
            ))}
        </TextField>
        </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Eye Color"
              name="eyeColor"
              value={formData.eyeColor}
              onChange={handleChange}
              disabled={disabled}
            />
          </Grid>
            <Grid size={12}>
            <TextField
              fullWidth
              label="University"
              name="university"
              value={formData.university}
              onChange={handleChange}
              disabled={disabled}
            />
          </Grid>
        <Grid size={6}>
        <TextField
            select
            fullWidth
            label="Company Department"
            name="department"
            value={formData.company.department}
            onChange={(e) => handleNestedChange(e, "company")}
            disabled={disabled}
        >
            {departmentOptions.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
            ))}
        </TextField>
        </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Company Title"
              name="title"
              value={formData.company.title}
              onChange={(e) => handleNestedChange(e, "company")}
              disabled={disabled}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.address.city}
              onChange={(e) => handleNestedChange(e, "address")}
              disabled={disabled}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.address.state}
              onChange={(e) => handleNestedChange(e, "address")}
              disabled={disabled}
            />
          </Grid>          
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {!isViewMode && (
              <Button type='submit' variant="contained" onClick={handleSubmit}>
                {isEditMode ? "Update" : "Add"}
              </Button>
        )}

      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;
