import { Button, TextField, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import {
  useAppDispatch,
  useAppSelectore,
} from "../../Redux Toolkit/store";
import {
  signin,
} from "../../Redux Toolkit/features/Auth/AuthSlice";
import { useNavigate } from "react-router";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const { auth } = useAppSelectore((store) => store);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signin({ ...values, navigate }));
    },
  });

  return (
    <div>
      <h1 className="text-2xl text-center font-bold text-teal-600 pb-5">
        Customer Login
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div>
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={auth.loading}
            sx={{ py: "12px" }}
          >
            {auth.loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

