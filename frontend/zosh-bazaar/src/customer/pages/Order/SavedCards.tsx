import { useState } from "react";
import {
  Add,
  CreditCard,
  DeleteOutline,
  Lock,
  RemoveRedEye,
  SimCard,
  Wifi,
  CalendarMonth,
  Key,
  Person,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
} from "@mui/material";

// --- Mock Data ---
const initialCards = [
  {
    id: 1,
    holderName: "Mohd Aaftab",
    number: "4567 •••• •••• 1234",
    expiry: "12/28",
    type: "VISA",
    gradient: "from-[#1a1f71] to-[#00927C]",
  },
  {
    id: 2,
    holderName: "Pablo Pandy",
    number: "5399 •••• •••• 8876",
    expiry: "09/26",
    type: "MASTERCARD",
    gradient: "from-[#1f1f1f] to-[#434343]",
  },
];

const SavedCards = () => {
  const [cards, setCards] = useState(initialCards);
  const [open, setOpen] = useState(false);

  const handleRemove = (id: number) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              Saved Cards
              <span className="text-sm font-normal text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                {cards.length} Cards
              </span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm flex items-center gap-1">
              <Lock fontSize="small" className="text-[#00927C]" />
              Your payment details are stored securely.
            </p>
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={<Add />}
            sx={{
              bgcolor: "#00927C",
              borderRadius: "10px",
              padding: "10px 24px",
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: "0 4px 14px 0 rgba(0, 146, 124, 0.39)",
              "&:hover": { bgcolor: "#007a68" },
            }}
          >
            Add New Card
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {cards.map((card) => (
            <PaymentCard key={card.id} card={card} onRemove={handleRemove} />
          ))}

          {/* ADD NEW CARD PLACEHOLDER (REDESIGNED) */}
          <div
            onClick={() => setOpen(true)}
            className="group relative h-[220px] rounded-2xl border-2 border-dashed border-gray-300 bg-white flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#00927C] hover:shadow-lg hover:-translate-y-1"
          >
            {/* Hover Background Effect */}
            <div className="absolute inset-0 bg-[#00927C]/0 group-hover:bg-[#00927C]/5 rounded-2xl transition-colors duration-300" />

            {/* Animated Icon */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#00927C] group-hover:scale-110 shadow-sm">
              <Add
                sx={{ fontSize: 32 }}
                className="text-gray-400 group-hover:text-white transition-colors duration-300"
              />
            </div>

            <h3 className="relative z-10 font-bold text-gray-500 group-hover:text-[#00927C] transition-colors duration-300">
              Add New Card
            </h3>
            <p className="relative z-10 text-xs text-gray-400 mt-1">
              Save a new payment method
            </p>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      <AddCardModal open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

// --- Component: Individual Payment Card ---
const PaymentCard = ({ card, onRemove }: any) => {
  return (
    <div className="group relative h-[220px]">
      {/* The Card Visual */}
      <div
        className={`
            relative w-full h-full rounded-2xl p-6 text-white shadow-xl overflow-hidden
            bg-linear-to-br ${card.gradient}
            transition-transform duration-300 transform group-hover:-translate-y-2
        `}
      >
        {/* Glassmorphism Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl pointer-events-none"></div>

        {/* Top: Chip & NFC */}
        <div className="flex justify-between items-start mb-6">
          <SimCard
            sx={{ fontSize: 40, color: "#e0e0e0", transform: "rotate(90deg)" }}
          />
          <Wifi
            sx={{ fontSize: 28, opacity: 0.8, transform: "rotate(90deg)" }}
          />
        </div>

        {/* Middle: Number */}
        <div className="mb-6">
          <p className="text-2xl font-mono tracking-widest drop-shadow-md">
            {card.number}
          </p>
        </div>

        {/* Bottom: Details */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-gray-300 uppercase tracking-wider mb-0.5">
              Card Holder
            </p>
            <p className="font-bold tracking-wide uppercase text-sm">
              {card.holderName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-300 uppercase mb-0.5">
              Expires
            </p>
            <p className="font-bold text-sm">{card.expiry}</p>
          </div>
        </div>

        {/* Brand Watermark */}
        <div className="absolute bottom-4 right-6 opacity-20 text-4xl font-black italic pointer-events-none">
          {card.type}
        </div>
      </div>

      {/* Hover Actions (Edit/Delete) - Positioned nicely below */}
      <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 group-hover:-bottom-10 transition-all duration-300 z-10">
        <Button
          size="small"
          startIcon={<RemoveRedEye />}
          sx={{
            color: "#555",
            bgcolor: "white",
            boxShadow: 2,
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
        >
          View
        </Button>
        <Button
          size="small"
          startIcon={<DeleteOutline />}
          onClick={() => onRemove(card.id)}
          sx={{
            color: "red",
            bgcolor: "white",
            boxShadow: 2,
            "&:hover": { bgcolor: "#fff0f0" },
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

// --- Component: Add Card Modal ---
const AddCardModal = ({ open, handleClose }: any) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 3, padding: 1 } }}
    >
      <DialogTitle
        sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#1f2937", pb: 1 }}
      >
        Add New Card
      </DialogTitle>

      <DialogContent>
        {/* Visual Strip */}
        <div className="w-full h-1 bg-linear-to-r from-[#00927C] to-blue-600 rounded-full mb-6 opacity-80"></div>

        <Box component="form" className="space-y-5">
          <TextField
            fullWidth
            label="Card Number"
            placeholder="0000 0000 0000 0000"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCard className="text-[#00927C]" />
                </InputAdornment>
              ),
            }}
          />

          <div className="grid grid-cols-2 gap-5">
            <TextField
              fullWidth
              label="Expiry Date"
              placeholder="MM/YY"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonth className="text-gray-400" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="CVV"
              type="password"
              placeholder="123"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Key className="text-gray-400" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <TextField
            fullWidth
            label="Card Holder Name"
            placeholder="JOHN DOE"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <div className="mt-6 flex items-center gap-3 text-xs text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="p-1 bg-white rounded-full">
            <Lock sx={{ fontSize: 16 }} className="text-[#00927C]" />
          </div>
          <p>
            Your card details are secured with 256-bit encryption and will not
            be shared.
          </p>
        </div>
      </DialogContent>

      <DialogActions sx={{ padding: "0 24px 24px 24px" }}>
        <Button
          onClick={handleClose}
          sx={{ color: "gray", textTransform: "none", fontWeight: 600 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleClose}
          disableElevation
          sx={{
            bgcolor: "#00927C",
            fontWeight: "bold",
            padding: "10px 30px",
            textTransform: "none",
            borderRadius: 2,
            "&:hover": { bgcolor: "#007a68" },
          }}
        >
          Save Card
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SavedCards;

