import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { colors } from "../../Data/Filters/color";
import { mainCategory } from "../../Data/category/mainCategory";
import { menLevelTwo } from "../../Data/category/levelTwo/menLevelTwo";
import { womenLevelTwo } from "../../Data/category/levelTwo/womenLevelTwo";
import { furnitureLevelTwo } from "../../Data/category/levelTwo/furnitureLevelTwo";
import { electronicLevelTwo } from "../../Data/category/levelTwo/electronicLevelTwo";
import { menLevelThree } from "../../Data/category/level three/menLevelThree";
import { womenLevelThree } from "../../Data/category/level three/womenLevelThree";
import { furnitureLevelThree } from "../../Data/category/level three/furnitureLevelThree";
import { electronicLevelThree } from "../../Data/category/level three/electronicsLevelThree";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { useAppDispatch, useAppSelectore } from "../../Redux Toolkit/store";
import { createProduct } from "../../Redux Toolkit/features/seller/sellerProductSlice";

const sizes = ["FREE", "XS", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];

const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  beauty: [],
  home_furniture: furnitureLevelThree,
  electronics: electronicLevelThree,
};

const AddProducts = () => {
  const [uploadImage, setUploadImage] = useState(false);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelectore((store) => store.sellerProduct);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: 100,
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      sizes: "",
    },
    onSubmit: (value) => {
      const jwt = localStorage.getItem("jwt");
      // value.quantity = 
      dispatch(createProduct({ jwt, request: value }));
    },
  });

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];

    setUploadImage(true);

    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);

    setUploadImage(false);
  };

  const handleRemoveImage = (_index: any) => {
  };

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter(
      (child: any) => child.parentCategoryId === parentCategoryId
    );
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-center py-5 uppercase">
        Add Products
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5 rounded-md" size={{ xs: 12 }}>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <label htmlFor="fileInput" className="relative">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternate className="text-gray-700 " />
              </span>
              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>

            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((item, index) => (
                <div className="relative" key={index}>
                  <img
                    src={item}
                    className="w-24 h-24 object-cover rounded-md"
                    alt=""
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none",
                    }}
                  >
                    <Close sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id="mrp_price"
              name="mrpPrice"
              label="MRP Price"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id="selling_price"
              name="sellingPrice"
              label="Selling Price"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <FormControl fullWidth required>
              <InputLabel id="color_label">Color</InputLabel>
              <Select
                labelId="color_label"
                id="color"
                name="color"
                onChange={formik.handleChange}
                value={formik.values.color}
                label="Color"
              >
                <MenuItem value="none">None</MenuItem>
                {colors.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <FormControl fullWidth required>
              <InputLabel id="size_label">Size</InputLabel>
              <Select
                labelId="size_label"
                id="size"
                name="sizes"
                onChange={formik.handleChange}
                value={formik.values.sizes}
                label="size"
              >
                <MenuItem value="none">None</MenuItem>
                {sizes.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth required>
              <InputLabel id="category_label">Category</InputLabel>
              <Select
                labelId="category_label"
                id="category"
                name="category"
                onChange={formik.handleChange}
                value={formik.values.category}
                label="category"
              >
                <MenuItem value="none">None</MenuItem>
                {mainCategory.map((item, index) => (
                  <MenuItem key={index} value={item.categoryid}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth required>
              <InputLabel id="category2_label">Second Category</InputLabel>
              <Select
                labelId="category2_label"
                id="category2"
                name="category2"
                onChange={formik.handleChange}
                value={formik.values.category2}
                label="second category"
              >
                <MenuItem value="none">None</MenuItem>
                {formik.values.category &&
                  categoryTwo[formik.values.category]?.map((item, index) => (
                    <MenuItem key={index} value={item.categoryId}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth required>
              <InputLabel id="category3_label">Third Category</InputLabel>
              <Select
                labelId="category3_label"
                id="category3"
                name="category3"
                onChange={formik.handleChange}
                value={formik.values.category3}
                label="second category"
              >
                <MenuItem value="none">None</MenuItem>
                {formik.values.category2 &&
                  childCategory(
                    categoryThree[formik.values.category],
                    formik.values.category2
                  )?.map((item: any, index: any) => (
                    <MenuItem key={index} value={item.categoryId}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              sx={{ p: "14px" }}
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : null}
            >
              {loading ? "Adding..." : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddProducts;

