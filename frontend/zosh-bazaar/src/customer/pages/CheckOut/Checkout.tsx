import { Box, Button, Modal, Typography, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddressCard from "./AddressCard";
import { Add, CreditCard, LocationOn, Payment } from "@mui/icons-material";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import { useAppDispatch, useAppSelectore } from "../../../Redux Toolkit/store";
import { createOrder } from "../../../Redux Toolkit/features/customer/orderSlice";
import { fetchUserAddresses } from "../../../Redux Toolkit/features/customer/addressSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 600 }, // Responsive width
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: "none",
  maxHeight: "90vh",
  overflowY: "auto",
};

const paymentGatewayList = [
  {
    name: "RAZORPAY",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
  },
  {
    name: "STRIPE",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
  },
];

const Checkout = () => {
  const dispatch = useAppDispatch();
  const { addresses, loading: addressLoading } = useAppSelectore((store) => store.address);
  const { loading } = useAppSelectore((store) => store.order);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [paymentGateway, setPaymentGatway] = useState(
    paymentGatewayList[0].name
  );

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchUserAddresses(jwt));
    }
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]);
    }
  }, [addresses]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // Refresh addresses after closing modal
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchUserAddresses(jwt));
    }
  };

  const handleChange = (e: any) => {
    const addressId = e.target.value;
    const address = addresses.find((addr: any) => addr._id === addressId);
    setSelectedAddress(address);
  };

  const checkout = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }
    
    const result = await dispatch(createOrder({
      address: selectedAddress,
      jwt: localStorage.getItem("jwt"),
      paymentGateway,
    }));

    if(createOrder.fulfilled.match(result)) {
      const paymentUrl = result.payload.payment_link_url;
      if(paymentUrl) {
        window.location.href = paymentUrl;
      }
    }
  }

  return (
    <div className="pt-6 sm:pt-10 px-3 sm:px-6 md:px-10 lg:px-20 xl:px-28 min-h-screen bg-gray-50 pb-20">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8 border-b border-gray-200 pb-3 sm:pb-4 flex items-start sm:items-center gap-2 sm:gap-3">
        <LocationOn className="text-[#00927C] flex-shrink-0" fontSize="small" sx={{ fontSize: { xs: "24px", sm: "32px" } }} />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Checkout</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Select address and payment method
          </p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-10 relative">
        {/* LEFT COLUMN: Addresses */}
        <div className="col-span-2 space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
            <span className="font-semibold text-base sm:text-lg text-gray-800">
              Delivery Address
            </span>
            <Button
              onClick={handleOpen}
              variant="contained"
              startIcon={<Add />}
              size="small"
              sx={{
                bgcolor: "#00927C",
                textTransform: "none",
                borderRadius: "8px",
                fontSize: "0.875rem",
              }}
            >
              Add New
            </Button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide ml-1">
              Saved Addresses
            </p>
            {addressLoading ? (
              <div className="flex justify-center items-center py-12">
                <CircularProgress size={40} sx={{ color: "#00927C" }} />
              </div>
            ) : addresses.length > 0 ? (
              addresses.map((item: any) => (
                <AddressCard
                  key={item._id}
                  value={item._id}
                  selectedValue={selectedAddress?._id}
                  handleChange={handleChange}
                  item={item}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No saved addresses found</p>
                <p className="text-sm mt-2">Click "Add New" to add your first address</p>
              </div>
            )}
            <div
              onClick={handleOpen}
              className="p-3 sm:p-5 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 hover:border-[#00927C] transition-all text-gray-500 hover:text-[#00927C]"
            >
              <Add fontSize="small" />
              <span className="font-medium text-sm">Add New Address</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Payment & Summary (Sticky) */}
        <div className="col-span-1 space-y-4 sm:space-y-6 mt-6 sm:mt-8 lg:mt-0 h-fit sticky top-20 sm:top-24">
          {/* Payment Method Selection */}
          <section className="bg-white p-3 sm:p-5 rounded-xl shadow-sm border border-gray-100 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Payment className="text-[#00927C]" sx={{ fontSize: { xs: "20px", sm: "24px" } }} />
              <h3 className="font-bold text-sm sm:text-base text-gray-800">Payment Method</h3>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {paymentGatewayList.map((item, paymentIdx) => (
                <div
                  key={`payment-${item.name}-${paymentIdx}`}
                  onClick={() => setPaymentGatway(item.name)}
                  className={`
                        flex items-center justify-between p-2 sm:p-3 rounded-lg border cursor-pointer transition-all text-sm
                        ${
                          paymentGateway === item.name
                            ? "border-[#00927C] bg-[#00927C]/5 shadow-sm ring-1 ring-[#00927C]"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }
                    `}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentGateway === item.name
                          ? "border-[#00927C]"
                          : "border-gray-400"
                      }`}
                    >
                      {paymentGateway === item.name && (
                        <div className="w-2 h-2 rounded-full bg-[#00927C]" />
                      )}
                    </div>
                    <span className="font-semibold text-xs sm:text-sm">{item.name}</span>
                  </div>
                  {/* Placeholder for Logo if needed */}
                  <CreditCard fontSize="small" className="text-gray-400" />
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Summary */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <PricingCard />
            <div className="p-3 sm:p-5 pt-0">
              <Button 
              onClick={checkout}
                variant="contained"
                fullWidth
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : null}
                sx={{
                  py: 1.5,
                  bgcolor: "#00927C",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  boxShadow: "0 4px 12px rgba(0, 146, 124, 0.2)",
                }}
              >
                {loading ? "Processing..." : "PAY NOW"}
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* Address Form Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="address-modal-title"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center mb-4">
            <Typography id="address-modal-title" variant="h6" fontWeight="bold">
              Add New Address
            </Typography>
            <Button onClick={handleClose} size="small" color="inherit">
              Close
            </Button>
          </div>
          <AddressForm onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default Checkout;

