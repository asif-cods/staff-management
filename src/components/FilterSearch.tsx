import { useState} from "react";
import type { ChangeEvent } from "react";
import { TextField, Grid, MenuItem, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface FilterSearchProps {
  searchText : string;
  filterDept: string;
  onSearchChange: (searchText: string) => void;
  onFilterChange: (filter: string) => void;
  onReset: () => void;
}

const departments = [
  "All",
  "Support",
  "Engineer",
  "HR",
  "Research and Develop",
  "Sales",
  "Marketing",
];

const  FilterSearch  =({
  onSearchChange,
  onFilterChange,
  onReset,
}: FilterSearchProps) => {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("All");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchText(val);
    onSearchChange(val);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFilter(val);
    onFilterChange(val);
  };

  const handleReset = () => {
    setSearchText("");
    setFilter("All");
    onReset();
  };

  return (
<Grid
  container
  spacing={2}
  alignItems="center"
  sx={{
    mb: 3,
    p: 2,
    borderRadius: 2,
    boxShadow: 1,
    bgcolor: "#f9fafb",
  }}
>
  {/* Search Field */}
  <Grid size={{ xs: 12, sm: 6, md:  6}}>
    <TextField
      label="Search by name or email"
      variant="outlined"
      value={searchText}
      onChange={handleSearchChange}
      fullWidth
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  </Grid>

  {/* Filter Dropdown */}
  <Grid size={{ xs: 12, sm: 4, md:  4}}>
    <TextField
      select
      label="Filter by Department"
      variant="outlined"
      value={filter}
      onChange={handleFilterChange}
      fullWidth
      size="small"
    >
      {departments.map((dept) => (
        <MenuItem key={dept} value={dept}>
          {dept}
        </MenuItem>
      ))}
    </TextField>
  </Grid>

  {/* Reset Button */}
  <Grid size={{ xs: 12, sm: 2, md:  2}}>
    <Button
      variant="contained"
      fullWidth
      onClick={handleReset}
      sx={{
        height: "100%",
        bgcolor: "#1976d2",
        '&:hover': { bgcolor: "#115293" },
        textTransform: 'none',
      }}
    >
      Reset
    </Button>
  </Grid>
</Grid>

  );
}
export default FilterSearch;