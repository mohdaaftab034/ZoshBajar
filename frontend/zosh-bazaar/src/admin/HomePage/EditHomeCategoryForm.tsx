import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { mainCategory } from "../../Data/category/mainCategory";
import { menLevelTwo } from "../../Data/category/levelTwo/menLevelTwo";
import { womenLevelTwo } from "../../Data/category/levelTwo/womenLevelTwo";
import { furnitureLevelTwo } from "../../Data/category/levelTwo/furnitureLevelTwo";
import { electronicLevelTwo } from "../../Data/category/levelTwo/electronicLevelTwo";
import { menLevelThree } from "../../Data/category/level three/menLevelThree";
import { womenLevelThree } from "../../Data/category/level three/womenLevelThree";
import { furnitureLevelThree } from "../../Data/category/level three/furnitureLevelThree";
import { electronicLevelThree } from "../../Data/category/level three/electronicsLevelThree";
import { useAppDispatch } from "../../Redux Toolkit/store";
import { updateHomeCategory } from "../../Redux Toolkit/features/customer/homeCategorySlice";
import { useState, useEffect } from "react";
import { api } from "../../config/api";

/* ---------- CATEGORY MAPS ---------- */
const categoryTwo: Record<string, any[]> = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicLevelTwo,
};

const categoryThree: Record<string, any[]> = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  beauty: [],
  home_furniture: furnitureLevelThree,
  electronics: electronicLevelThree,
};

/* ---------- HELPER ---------- */
const childCategory = (list: any[] = [], parentId: string) =>
  list.filter((item) => item.parentCategoryId === parentId);

const EditHomeCategoryForm = ({ selectedCategory, onClose }: any) => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  /* ---------- FORMIK ---------- */
  //
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: selectedCategory?.image || "",
      name: selectedCategory?.name || "", // level-1 key
      categoryId: selectedCategory?.categoryId || "", // level-2
      category2: selectedCategory?.category2 || "", // level-3
    },
    onSubmit: (values) => {
      dispatch(
        updateHomeCategory({
          id: selectedCategory._id,
          homeCategory: values,
        })
      );
      onClose();
    },
  });

  /* ---------- ROOT CATEGORY KEY ---------- */
  const rootCategoryKey =
    mainCategory.find((cat) =>
      categoryTwo[cat.categoryid]?.some(
        (lvl2) => lvl2.categoryId === formik.values.categoryId
      )
    )?.categoryid || "";

  /* ---------- FETCH PRODUCTS FOR PREVIEW ---------- */
  useEffect(() => {
    const fetchProducts = async () => {
      const categoryToFetch = formik.values.category2 || formik.values.categoryId;
      if (!categoryToFetch) {
        setProducts([]);
        return;
      }

      setLoadingProducts(true);
      try {
        const response = await api.get("/products", {
          params: {
            category: categoryToFetch,
            sellersOnly: "true",
            pageNumber: 0,
            pageSize: 10,
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
  }, [formik.values.categoryId, formik.values.category2, selectedCategory]);

  /* ---------- HANDLE PRODUCT CLICK ---------- */
  const handleProductClick = (product: any) => {
    formik.setFieldValue("image", product.images[0]);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <p className="text-xl font-bold text-center pb-5">Edit Home Category</p>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* IMAGE */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Image URL"
              value={formik.values.image}
              onChange={(e) => formik.setFieldValue("image", e.target.value)}
            />
          </Grid>

          {/* LEVEL 1 */}
          <Grid size={{ xs: 12 }}>
            <TextField
              select
              fullWidth
              label="Category"
              value={formik.values.name}
              onChange={(e) => {
                const value = e.target.value;
                formik.setFieldValue("name", value);
                formik.setFieldValue("categoryId", "");
                formik.setFieldValue("category2", "");
              }}
            >
              {mainCategory.map((cat) => (
                <MenuItem key={cat.categoryid} value={cat.categoryid}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* LEVEL 2 */}
          <Grid size={{ xs: 12 }}>
            <TextField
              select
              fullWidth
              label="Sub Category"
              value={formik.values.categoryId}
              onChange={(e) => {
                formik.setFieldValue("categoryId", e.target.value);
                formik.setFieldValue("category2", "");
              }}
              disabled={!formik.values.name}
            >
              <MenuItem value="">None</MenuItem>
              {categoryTwo[formik.values.name]?.map((item) => (
                <MenuItem key={item.categoryId} value={item.categoryId}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* LEVEL 3 */}
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Third Category</InputLabel>
              <Select
                value={formik.values.category2}
                label="Third Category"
                onChange={(e) =>
                  formik.setFieldValue("category2", e.target.value)
                }
                disabled={!formik.values.categoryId}
              >
                <MenuItem value="">None</MenuItem>

                {formik.values.categoryId &&
                  childCategory(
                    categoryThree[rootCategoryKey] || [],
                    formik.values.categoryId
                  ).map((item) => (
                    <MenuItem key={item.categoryId} value={item.categoryId}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          {/* PRODUCTS PREVIEW */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mt: 2, p: 2, bgcolor: "#F9FAFB", borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                Products in this category ({products.length} seller products)
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                Click on any product to use its image for this category card
              </Typography>
              {loadingProducts ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                  <CircularProgress size={30} sx={{ color: "#00927C" }} />
                </Box>
              ) : products.length > 0 ? (
                <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
                  {products.map((product: any) => (
                    <Box
                      key={product._id}
                      onClick={() => handleProductClick(product)}
                      sx={{
                        display: "flex",
                        gap: 2,
                        p: 1,
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
                  No seller products found in this category. Sellers need to add products to this category.
                </Typography>
              )}
            </Box>
          </Grid>

          {/* SUBMIT */}
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: "14px" }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditHomeCategoryForm;

