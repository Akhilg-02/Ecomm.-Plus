import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Link,
} from "@mui/material";
import { useFormik } from "formik";
import { loginValidation } from "./Validation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      const loginUrl = `${process.env.REACT_APP_API_BASE_URL}/login`;
      try {
        const response = await axios.post(loginUrl, values);
       
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);

        formik.resetForm();
        login();
        navigate("/products");

       
        alert("Login Susseful");
      } catch (error) {
        console.log(error.message);
        alert("Invalid credentials!");
      }
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={6}
            sx={{
              marginTop: 8,
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Log in
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type="submit"
                fullWidth
                onClick={formik.handleSubmit}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Box sx={{ textAlign: "center" }}>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Box>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
