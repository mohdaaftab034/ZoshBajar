import { Button, TextField, Paper, Typography, Alert, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelectore } from "../../Redux Toolkit/store";
import { createCoupon } from "../../Redux Toolkit/features/admin/couponSlice";
import { Discount } from "@mui/icons-material";
import { useState } from "react";

interface CouponFormValue {
  code: string;
  discountPercentage: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
}

const CouponsForm = () => {
  const dispatch = useAppDispatch();
  const adminCoupon = useAppSelectore((store) => store.adminCoupon);
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik<CouponFormValue>({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    onSubmit: async (values) => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        const result = await dispatch(createCoupon({ coupon: values, jwt }));
        if (createCoupon.fulfilled.match(result)) {
          setShowSuccess(true);
          formik.resetForm();
          setTimeout(() => setShowSuccess(false), 5000);
        }
      }
    },
  });

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <Typography variant="h4" className="text-gray-800 font-bold mb-6 text-center md:text-left">
          Create New Coupon
        </Typography>

        <Paper elevation={0} className="p-6 md:p-10 rounded-2xl border border-gray-200 bg-white shadow-sm">
          {showSuccess && (
            <Alert severity="success" className="mb-4">
              Coupon created successfully!
            </Alert>
          )}
          {adminCoupon.error && (
            <Alert severity="error" className="mb-4">
              {adminCoupon.error}
            </Alert>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Coupon Code */}
              <div>
                <TextField
                  fullWidth
                  name="code"
                  label="Coupon Code"
                  placeholder="e.g. SUMMER2025"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  error={formik.touched.code && Boolean(formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code}
                  InputProps={{
                    startAdornment: <Discount className="text-gray-400 mr-2" fontSize="small" />,
                  }}
                />
              </div>

              {/* Discount Percentage */}
              <div>
                <TextField
                  fullWidth
                  type="number"
                  name="discountPercentage"
                  label="Discount %"
                  placeholder="e.g. 20"
                  value={formik.values.discountPercentage}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: <span className="text-gray-500 font-bold">%</span>,
                  }}
                />
              </div>

              {/* Start Date */}
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={formik.values.validityStartDate}
                    onChange={(value) => formik.setFieldValue("validityStartDate", value)}
                    className="w-full"
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </div>

              {/* End Date */}
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    value={formik.values.validityEndDate}
                    onChange={(value) => formik.setFieldValue("validityEndDate", value)}
                    className="w-full"
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </div>

              {/* Min Order Value */}
              <div className="sm:col-span-2">
                <TextField
                  fullWidth
                  type="number"
                  name="minimumOrderValue"
                  label="Minimum Order Value"
                  placeholder="e.g. 500"
                  value={formik.values.minimumOrderValue}
                  onChange={formik.handleChange}
                  InputProps={{
                    startAdornment: <span className="text-gray-500 mr-1">₹</span>,
                  }}
                />
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2 mt-4">
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={adminCoupon.loading}
                  startIcon={adminCoupon.loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : null}
                  sx={{
                    bgcolor: "#00927C",
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textTransform: "none",
                    boxShadow: "0 4px 14px 0 rgba(0, 146, 124, 0.39)",
                    "&:hover": { bgcolor: "#007a68" },
                  }}
                >
                  {adminCoupon.loading ? "Creating..." : "Create Coupon"}
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default CouponsForm;
