import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../store/reducers/userReducer";

function SignUp() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    axios
      .post("http://localhost:8000/auth/signUp", values)
      .then(({ data }) => {
        dispatch(auth(data));
        navigate("/");
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box maxWidth={500} display="grid" gap={2} minWidth={350}>
        <Typography variant="h4">Sign up</Typography>
        <Controller
          name="name"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                {...field}
                required
                value={field.value || ""}
                error={!!errors[field.name]}
                helperText={!!errors[field.name] && "Please enter Name!"}
                label="Name"
                variant="outlined"
              />
            </FormControl>
          )}
        />
        <Controller
          name="email"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                {...field}
                required
                value={field.value || ""}
                error={!!errors[field.name]}
                helperText={!!errors[field.name] && "Please enter Email!"}
                label="Email"
                variant="outlined"
                type="email"
              />
            </FormControl>
          )}
        />
        <Controller
          name="password"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                {...field}
                required
                value={field.value || ""}
                error={!!errors[field.name]}
                helperText={!!errors[field.name] && "Please enter Password"}
                label="Password"
                variant="outlined"
                type="password"
              />
            </FormControl>
          )}
        />
        <Button
          variant="contained"
          sx={{ py: 2 }}
          onClick={handleSubmit(onSubmit)}
        >
          Sign up
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mt={2}>
        <Typography>Do you have an account?</Typography>
        <Link to="/signin">Sign in</Link>
      </Box>
    </Box>
  );
}

export default SignUp;