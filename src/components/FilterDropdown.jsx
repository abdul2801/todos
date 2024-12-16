import { Select, MenuItem } from "@mui/material";

const FilterDropdown = ({ filter, handleFilterChange }) => {
  return (
    <Select
      value={filter}
      onChange={handleFilterChange}
      style={{ width: "30%", marginBottom: 30 }}
    >
      <MenuItem value="all">All</MenuItem>
      <MenuItem value="completed">Completed</MenuItem>
      <MenuItem value="pending">Pending</MenuItem>
    </Select>
  );
};

export default FilterDropdown;
