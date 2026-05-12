import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../../Redux Toolkit/store";
import { updateHomeCategory, createSingleHomeCategory } from "../../Redux Toolkit/features/customer/homeCategorySlice";
import { useState, useEffect } from "react";
import { api } from "../../config/api";
import { mainCategory } from "../../Data/category/mainCategory";
import { menLevelTwo } from "../../Data/category/levelTwo/menLevelTwo";
import { womenLevelTwo } from "../../Data/category/levelTwo/womenLevelTwo";
import { furnitureLevelTwo } from "../../Data/category/levelTwo/furnitureLevelTwo";
import { electronicLevelTwo } from "../../Data/category/levelTwo/electronicLevelTwo";

// Validation Schema
const validationSchema = yup.object({
  name: yup.string().required("Category name is required"),
  categoryId: yup.string().required("Category ID is required"),
  image: yup.string().url("Must be a valid URL").required("Image URL is required"),
});

// Category maps
const categoryTwo: Record<string, any[]> = {
  men: menLevelTwo,
  women: womenLevelTwo,
  home_furniture: furnitureLevelTwo,
  electronics: electronicLevelTwo,
};

const ShopByCategoryForm = ({ selectedCategory, onClose }: any) => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  
  // Check if this is a create or edit operation
  const isCreate = !selectedCategory?._id;

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      name: selectedCategory?.name || "",
      categoryId: selectedCategory?.categoryId || "",
      image: selectedCategory?.image || "",
    },
    onSubmit: (values) => {
      if (isCreate) {
        // Create new category
        dispatch(
          createSingleHomeCategory({
            ...values,
            section: "SHOP_BY_CATEGORIES",
          })
        );
      } else {
        // Update existing category
        dispatch(
          updateHomeCategory({
            id: selectedCategory._id,
            homeCategory: values,
          })
        );
      }
      onClose();
    },
  });

  // Fetch products - filtered by category
  useEffect(() => {
    const fetchProducts = async () => {
      if (!formik.values.categoryId) {
        setProducts([]);
        return;
      }

      setLoadingProducts(true);
      try {
        const response = await api.get("/products", {
          params: {
            category: formik.values.categoryId,
            sellersOnly: "true",
            pageNumber: 0,
            pageSize: 50,
          },
        });
        setProducts(response.data.content || []);
      } catch (error) {
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [formik.values.categoryId]);

  const handleProductClick = (product: any) => {
    formik.setFieldValue("image", product.images[0]);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
        {isCreate ? "Create Shop by Category" : "Edit Shop by Category"}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* IMAGE URL */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Image URL"
              placeholder="https://example.com/image.jpg"
              value={formik.values.image}
              onChange={(e) => formik.setFieldValue("image", e.target.value)}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={
                formik.touched.image
                  ? (formik.errors.image as string | undefined) || ""
                  : ""
              }
            />
          </Grid>

          {/* LEVEL 1 - Main Category */}
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth required>
              <InputLabel>Main Category</InputLabel>
              <Select
                value={formik.values.name}
                label="Main Category"
                onChange={(e) => {
                  const value = e.target.value;
                  formik.setFieldValue("name", value);
                  formik.setFieldValue("categoryId", "");
                }}
              >
                <MenuItem value="">Select Category</MenuItem>
                {mainCategory.map((cat) => (
                  <MenuItem key={cat.categoryid} value={cat.categoryid}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* LEVEL 2 - Sub Category */}
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth required disabled={!formik.values.name}>
              <InputLabel>Sub Category</InputLabel>
              <Select
                value={formik.values.categoryId}
                label="Sub Category"
                onChange={(e) => formik.setFieldValue("categoryId", e.target.value)}
              >
                <MenuItem value="">Select Sub Category</MenuItem>
                {categoryTwo[formik.values.name]?.map((item) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* PRODUCT PREVIEW */}
          {formik.values.categoryId && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ p: 2, bgcolor: "#F9FAFB", borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                  Products in {categoryTwo[formik.values.name]?.find(c => c.categoryId === formik.values.categoryId)?.name} ({products.length} products)
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
                  Click on any product to use its image for this category card
                </Typography>

                {loadingProducts ? (
                  <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                    <CircularProgress size={30} sx={{ color: "#00927C" }} />
                  </Box>
                ) : products.length > 0 ? (
                  <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                    {products.map((product: any) => (
                      <Box
                        key={product._id}
                        onClick={() => handleProductClick(product)}
                        sx={{
                          display: "flex",
                          gap: 2,
                          p: 1.5,
                          mb: 1,
                          bgcolor: formik.values.image === product.images[0] ? "#E6F7F5" : "white",
                          borderRadius: 1,
                          border: formik.values.image === product.images[0] ? "2px solid #00927C" : "1px solid #E5E7EB",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": {
                            bgcolor: "#F0FDF4",
                            borderColor: "#00927C",
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                            borderRadius: 4,
                            flexShrink: 0,
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {product.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ₹{product.sellingPrice} • {product.color} • {product.size}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No products found in this category. Sellers need to add products to this category.
                  </Typography>
                )}
              </Box>
            </Grid>
          )}

          {/* SUBMIT BUTTON */}
          <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                bgcolor: "#00927C",
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": { bgcolor: "#007a68" },
              }}
            >
              {isCreate ? "Create Category" : "Update"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ShopByCategoryForm;

