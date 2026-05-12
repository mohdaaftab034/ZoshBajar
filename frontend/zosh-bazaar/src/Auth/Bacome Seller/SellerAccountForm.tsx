import {
  CircularProgress,
  Button,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import BecomeSellerStep1 from "./BecomeSellerStep1";
import BecomeSellerStep2 from "./BecomeSellerStep2";
import BecomeSellerStep3 from "./BecomeSellerStep3";
import BecomeSellerStep4 from "./BecomeSellerStep4";
import { useAppDispatch, useAppSelectore } from "../../Redux Toolkit/store";
import { createSeller } from "../../Redux Toolkit/features/seller/sellerAuthentication";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Bussness Details",
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelectore((store) => store.sellerAuth);

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      GSTIN: "",
      pickupAddress: {
        name: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        locality: "",
      },
      bankDetails: {
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: "",
    },
    onSubmit: (values) => {
      dispatch(createSeller({ seller: values, navigate }));
    },
  });

  return (
    <div className="">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-20 space-y-10">
        {activeStep === 0 ? (
          <BecomeSellerStep1 formik={formik} />
        ) : activeStep === 1 ? (
          <BecomeSellerStep2 formik={formik} />
        ) : activeStep === 2 ? (
          <BecomeSellerStep3 formik={formik} />
        ) : (
          <BecomeSellerStep4 formik={formik} />
        )}
      </div>

      <div className="flex items-center justify-between mt-5">
        <Button
          variant="contained"
          disabled={loading || activeStep === 0}
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Back
        </Button>

        <Button
          variant="contained"
          disabled={loading && activeStep === steps.length - 1}
          onClick={
            activeStep === steps.length - 1
              ? () => formik.handleSubmit()
              : () => setActiveStep(activeStep + 1)
          }
        >
          {loading && activeStep === steps.length - 1 ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : activeStep === steps.length - 1 ? (
            "Create Account"
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SellerAccountForm;

