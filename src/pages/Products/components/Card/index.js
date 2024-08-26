import React, { useCallback, useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateProductModal from "../UpdateModal";

function ProductCard({ product, refetch }) {
  const [isUpdateModalOpen, setIsUpdateOpenModalOpen] = useState(false);

  const { _id, name, description, price, quantity, discount } = product;

  const onDelete = () => {
    axios
      .delete("http://localhost:8000/products/delete/" + _id)
      .then(() => {
        refetch();
      })
      .catch((err) => toast.error(err.response.data));
  };

  const toggleUpdateModalOpen = useCallback(
    () => setIsUpdateOpenModalOpen((prev) => !prev),
    []
  );

  return (
    <>
      <Card>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography>{name}</Typography>
          <Typography color="GrayText">{description}</Typography>
          <Box display="flex" gap={1}>
            <AttachMoneyIcon />
            <Typography>{price} uzs</Typography>
          </Box>
          <Box display="flex" gap={1}>
            <ShoppingCartOutlinedIcon />
            <Typography>{quantity}</Typography>
          </Box>
          <Box display="flex" gap={1}>
            <DiscountOutlinedIcon />
            <Typography>{discount} %</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button color="error" variant="outlined" fullWidth onClick={onDelete}>
            Delete
          </Button>
          <Button
            color="warning"
            variant="contained"
            fullWidth
            onClick={toggleUpdateModalOpen}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
      <UpdateProductModal
        product={product}
        open={isUpdateModalOpen}
        onClose={toggleUpdateModalOpen}
        refetch={refetch}
      />
    </>
  );
}

export default ProductCard;
