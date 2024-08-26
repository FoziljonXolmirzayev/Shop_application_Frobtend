import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CreateProductModal from "./components/CreateModal";
import axios from "axios";
import { toast } from "react-toastify";
import ProductCard from "./components/Card";

function Products() {
  const [isCreateModalOpen, setIsCreateOpenModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const toggleCreateModalOpen = useCallback(
    () => setIsCreateOpenModalOpen((prev) => !prev),
    []
  );

  const getProducts = () => {
    axios
      .get("http://localhost:8000/products/get")
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => toast.error(err.response.data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Box maxWidth={1200} mx="auto" px={2} pt={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Products</Typography>
          <Button variant="contained" onClick={toggleCreateModalOpen}>
            Add new
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item sm={12} md={6} lg={4}>
              <ProductCard product={product} refetch={getProducts} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <CreateProductModal
        open={isCreateModalOpen}
        onClose={toggleCreateModalOpen}
        refetch={getProducts}
      />
    </>
  );
}

export default Products;
