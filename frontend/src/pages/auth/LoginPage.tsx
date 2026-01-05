import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack, Paper, CircularProgress } from "@mui/material";
import { useNavigate} from "react-router-dom";

import { useAuthContext } from "../../context/auth.context";

const LoginPage: React.FC = () => {
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/calendar"); 
    } catch (err: any) {
      setError(err.message || "Login failed");
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
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
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

            {error && <Typography color="error" textAlign="center">{error}</Typography>}

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
              {loading ? <CircularProgress size={20} /> : "Login"}
            </Button>
          </Stack>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" mb={1}>
            Don't have an account?
          </Typography>
          <Button variant="outlined" onClick={() => navigate("/auth/register")}>
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;