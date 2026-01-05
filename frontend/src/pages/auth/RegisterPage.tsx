import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack, Paper, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../services/auth.service";

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createUser({ firstName, lastName, email, password, dob });
      navigate("/auth/login"); 
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Paper elevation={6} sx={{ p: 4, maxWidth: 450, width: "100%", borderRadius: 2 }}>
        <Typography variant="h4" mb={3} textAlign="center">
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Date of Birth"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            {error && <Typography color="error" textAlign="center">{error}</Typography>}

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
              {loading ? <CircularProgress size={20} /> : "Register"}
            </Button>
          </Stack>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" mb={1}>
            Already have an account?
          </Typography>
          <Button variant="outlined" onClick={() => navigate("/auth/login")}>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;