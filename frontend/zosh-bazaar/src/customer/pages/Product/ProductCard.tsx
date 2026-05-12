import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FavoriteBorder,
  ChatBubbleOutline,
  ShoppingCartOutlined,
  Send,
} from "@mui/icons-material";
import { IconButton, Dialog, DialogContent, TextField } from "@mui/material";
import { api } from "../../../config/api";
import { useAppDispatch } from "../../../Redux Toolkit/store";
import { addProductToWishlist } from "../../../Redux Toolkit/wishlist/wishlistSlice";

// --- Product Card Component ---
const ProductCard = ({ item }: any) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State for Chatbot
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval: any;
    if (isHovered && item.images && item.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % item.images.length);
      }, 1200);
    } else {
      setCurrentImage(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, item.images]);

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to product details
    setIsChatOpen(true);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to product details
    // Add your add-to-cart logic here
  };

  const addToWishlist = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation(); //  ab e real event hai

    try {
      dispatch(
        addProductToWishlist({
          productId,
          size: "M",
          jwt: localStorage.getItem("jwt"),
        })
      );
    } catch (error) {
    }
  };

  return (
    <>
      <div
        onClick={() =>
          navigate(
            `/product-details/${item.category}/${item.title}/${item._id}`
          )
        }
        className="group flex flex-col gap-2 cursor-pointer w-full relative"
      >
        {/* Image Container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full aspect-3/4 overflow-hidden rounded-xl bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300"
        >
          {/* Images with Slider Effect */}
          {item.images && item.images.length > 0 && (
            <>
              {item.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={item.title}
                  className={`
                        absolute top-0 left-0 w-full h-full object-cover object-top
                        transition-opacity duration-500 ease-in-out
                        ${index === currentImage ? "opacity-100" : "opacity-0"}
                    `}
                />
              ))}
            </>
          )}

          {/* Wishlist Button (Top Right) */}
          <div className="absolute top-3 right-3 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <IconButton
              onClick={(e) => addToWishlist(e, item._id)}
              sx={{ bgcolor: "white", "&:hover": { bgcolor: "#f0f0f0" } }}
              size="small"
            >
              <FavoriteBorder sx={{ fontSize: 20 }} />
            </IconButton>
          </div>

          {/* --- NEW: Action Buttons (Chat & Cart) at Bottom --- */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <IconButton
              onClick={handleChatClick}
              sx={{
                bgcolor: "white",
                color: "#00927C",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                "&:hover": { bgcolor: "#00927C", color: "white" },
              }}
            >
              <ChatBubbleOutline fontSize="small" />
            </IconButton>
            <IconButton
              onClick={handleCartClick}
              sx={{
                bgcolor: "white",
                color: "#333",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                "&:hover": { bgcolor: "#333", color: "white" },
              }}
            >
              <ShoppingCartOutlined fontSize="small" />
            </IconButton>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-1 px-1">
          <h3 className="font-bold text-sm text-gray-800 truncate uppercase tracking-wide">
            {item.seller?.bussinessDetails?.bussinessName || "Brand"}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-1">{item.title}</p>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-bold text-base text-gray-900">
              ₹{item?.sellingPrice}
            </span>
            {item?.mrpPrice > item?.sellingPrice && (
              <>
                <span className="text-xs text-gray-400 line-through">
                  ₹{item?.mrpPrice}
                </span>
                <span className="text-xs font-bold text-[#00927C]">
                  ({item.discountPercent}% OFF)
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* --- Product Specific Chatbot Modal --- */}
      <ProductChatbot
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        product={item}
      />
    </>
  );
};

export default ProductCard;

// --- Sub-component: Product Chatbot ---
const ProductChatbot = ({ open, onClose, product }: any) => {
  const [messages, setMessages] = useState<any[]>([
    {
      sender: "bot",
      text: `Hello! I see you're interested in the ${product.title}. Ask me anything about it!`,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // 1. Add User Message to UI
    const newMessages = [...messages, { sender: "user", text: inputValue }];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true);

    try {
      // 2. Call the Backend (Using axios syntax)
      // POST request: api.post(url, data, config)
      const response = await api.post("/chat/chatbot", {
        product: product,
        userMessage: inputValue,
        chatHistory: [],
      }); // Headers are usually handled automatically by your api instance

      // Axios returns data in response.data
      const reply = response.data.reply;

      // 3. Add Gemini Response to UI
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble connecting right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={(e: any) => {
        e.stopPropagation();
        onClose();
      }}
      // ... keep your existing styling ...
    >
      {/* ... keep your Header ... */}

      <DialogContent
        sx={{
          p: 2,
          bgcolor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex-1 overflow-y-auto space-y-3 pb-3 custom-scrollbar">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === "user"
                    ? "bg-[#00927C] text-white rounded-tr-none"
                    : "bg-white text-gray-700 shadow-sm rounded-tl-none border border-gray-100"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-500 text-xs px-3 py-2 rounded-2xl rounded-tl-none">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
          <TextField
            fullWidth
            placeholder="Ask about details, price, fabric..."
            variant="standard"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
            InputProps={{ disableUnderline: true }}
          />
          <IconButton
            onClick={handleSend}
            color="primary"
            disabled={!inputValue || loading}
          >
            <Send fontSize="small" sx={{ color: "#00927C" }} />
          </IconButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

