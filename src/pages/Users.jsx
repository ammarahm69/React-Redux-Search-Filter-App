import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setSearchQuery } from "../store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, searchQuery } = useSelector((state) => state.usersState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setUsers(data));
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [dispatch]);

  const handleSearch = (e) => dispatch(setSearchQuery(e.target.value));

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>

      <TextField
        label="Search users"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "600" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>Website</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>Address</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>Company</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.website}</TableCell>
                  <TableCell>
                    {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                  </TableCell>
                  <TableCell>{user.company.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UsersPage;
