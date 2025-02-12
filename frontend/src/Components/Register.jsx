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
import { registerValidation } from "./Validation";
import { useNavigate } from "react-router-dom";
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

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: registerValidation,

    onSubmit: async (values) => {
      try {
        const registerUrl = `${process.env.REACT_APP_API_BASE_URL}/register`;
        const response = await axios.post(registerUrl, values);

        formik.resetForm();

        navigate("/login");
        alert("Registration Susseful");
      } catch (error) {
        console.log(error.message);
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
              Sign up
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                autoComplete="new-password"
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
                Sign Up
              </Button>
              <Box sx={{ textAlign: "center" }}>
                <Link href="/login" variant="body2">
                  {"Already have an account? Log in"}
                </Link>
              </Box>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Register;
