import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelectore } from "../../Redux Toolkit/store";
import { createDeal } from "../../Redux Toolkit/features/admin/dealSlice";

const CreateDealForm = () => {

  const  homeCategories  = useAppSelectore((store) => store.homeCategory.homeCategories) as any;
  const { loading } = useAppSelectore((store) => store.deal);
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      discount: 0,
      categoryId: "",
    },
    onSubmit: (values) => {
      dispatch(createDeal(values))
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      sx={{ width: 600, margin: "auto", padding: 3 }}
      className="space-y-6"
    >
      <div>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Create New Deal
        </Typography>
      </div>

      <div>
        <TextField
          fullWidth
          name="discount"
          label="Discount"
          value={formik.values.discount}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        <FormControl fullWidth required>
          <InputLabel id="category_label">Category</InputLabel>
          <Select
            labelId="category_label"
            id="category"
            name="categoryId"
            onChange={formik.handleChange}
            value={formik.values.categoryId}
            label="category"
          >
            <MenuItem value="none">None</MenuItem>
            {homeCategories?.dealCategories?.map((item: any, index: number) => (
              <MenuItem key={index} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div>
        <Button
          type="submit"
          variant="contained"
          sx={{py: "11px"}}
          fullWidth
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : null}
        >
            {loading ? "Creating..." : "Create Deal"}
        </Button>
      </div>
    </Box>
  );
};

export default CreateDealForm;

