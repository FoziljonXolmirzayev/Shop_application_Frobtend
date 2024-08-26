import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function CreateProductModal({ open, onClose, refetch }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (values) => {
    axios
      .post("http://localhost:8000/products/create", values)
      .then(() => {
        onClose();
        refetch();
        reset({});
        toast.success("Product created successfully");
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Product</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          gap={2}
          flexDirection="column"
          width="100%"
          minWidth={350}
          pt={1}
        >
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
                  helperText={!!errors[field.name] && "Please enter Title!"}
                  label="Title"
                  variant="outlined"
                />
              </FormControl>
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  {...field}
                  value={field.value || ""}
                  error={!!errors[field.name]}
                  helperText={!!errors[field.name] && "Please enter price!"}
                  label="Price"
                  variant="outlined"
                  type="number"
                />
              </FormControl>
            )}
          />
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  {...field}
                  value={field.value || ""}
                  error={!!errors[field.name]}
                  helperText={!!errors[field.name] && "Please enter Quantity!"}
                  label="Quantity"
                  variant="outlined"
                  type="number"
                />
              </FormControl>
            )}
          />
          <Controller
            name="discount"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  {...field}
                  value={field.value || ""}
                  label="Discount"
                  variant="outlined"
                  type="number"
                  defaultValue={0}
                />
              </FormControl>
            )}
          />
          <Controller
            name="description"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  {...field}
                  multiline
                  rows={6}
                  required
                  value={field.value || ""}
                  error={!!errors[field.name]}
                  helperText={
                    !!errors[field.name] && "Please enter description!"
                  }
                  label="Description"
                  variant="outlined"
                />
              </FormControl>
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="info" onClick={onClose} fullWidth>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained" fullWidth>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateProductModal;
