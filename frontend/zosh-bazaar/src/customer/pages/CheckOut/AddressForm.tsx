import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelectore } from "../../../Redux Toolkit/store";
import { createAddress } from "../../../Redux Toolkit/features/customer/addressSlice";

const AddressForm = ({ onClose }: any) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelectore((store) => store.address);

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      locality: "",
    },
    onSubmit: async (value) => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        await dispatch(createAddress({ addressData: value, jwt }));
        formik.resetForm();
        if (onClose) {
          onClose();
        }
      }
    },
  });

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto" }}>
      <p className="text-sm text-gray-500 text-center mb-6">
        Please enter your shipping details accurately.
      </p>

      <form onSubmit={formik.handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <TextField
              fullWidth
              name="name"
              label="Full Name"
              variant="outlined"
              size="medium"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>

          <div>
            <TextField
              fullWidth
              name="mobile"
              label="Mobile Number"
              variant="outlined"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </div>

          <div>
            <TextField
              fullWidth
              name="pinCode"
              label="Pin Code"
              variant="outlined"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <TextField
              fullWidth
              name="address"
              label="Address (House No, Building, Street)"
              variant="outlined"
              multiline
              rows={2}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <TextField
              fullWidth
              name="locality"
              label="Locality / Town"
              variant="outlined"
              value={formik.values.locality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
            />
          </div>

          <div>
            <TextField
              fullWidth
              name="city"
              label="City"
              variant="outlined"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </div>

          <div>
            <TextField
              fullWidth
              name="state"
              label="State"
              variant="outlined"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </div>

          <div style={{ gridColumn: "1 / -1", marginTop: "16px" }}>
            <Button
              sx={{
                py: 1.5,
                bgcolor: "#00927C",
                "&:hover": { bgcolor: "#007a68" },
                fontWeight: "bold",
              }}
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : null}
            >
              {loading ? "Saving..." : "Save Address"}
            </Button>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default AddressForm;

