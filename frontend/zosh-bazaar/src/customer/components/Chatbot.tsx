import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Paper,
  IconButton,
  TextField,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import { Close, Send, SmartToy, OpenInNew } from "@mui/icons-material";
import { api } from "../../config/api";

interface ChatbotProps {
  onClose: () => void;
}

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

type SuggestedAction = {
  label: string;
  path: string;
};

const Chatbot = ({ onClose }: ChatbotProps) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hi there! I can help with orders, cart, wishlist, login, and where to go next on Zosh Bazaar.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<SuggestedAction[]>([
    { label: "Open Cart", path: "/cart" },
    { label: "Open Wishlist", path: "/wishlist" },
    { label: "View Orders", path: "/account/orders" },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const chatHistory = messages
        .filter((msg) => msg.sender !== "bot" || msg.text !== messages[0]?.text)
        .slice(1)
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        }));

      const response = await api.post("/chat/chatbot", {
        userMessage,
        chatHistory,
      });

      const reply = response.data?.reply || "I can help you navigate Zosh Bazaar.";
      const actions = Array.isArray(response.data?.suggestedActions)
        ? response.data.suggestedActions
        : [];

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setSuggestedActions(actions.length > 0 ? actions : suggestedActions);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I could not reach the assistant right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        width: { xs: "90vw", sm: 350 },
        height: 500,
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        mb: 2, // Margin bottom to separate from FAB
        animation: "fadeInUp 0.3s ease-out forwards",
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      {/* Header */}
      <div className="bg-[#00927C] p-4 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <SmartToy />
          </div>
          <div>
            <h3 className="font-bold text-sm">Zosh Assistant</h3>
            <p className="text-[10px] opacity-90 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />{" "}
              Online
            </p>
          </div>
        </div>
        <IconButton size="small" onClick={onClose} sx={{ color: "white" }}>
          <Close fontSize="small" />
        </IconButton>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: "#00927C",
                  mr: 1,
                  fontSize: 12,
                }}
              >
                Z
              </Avatar>
            )}
            <div
              className={`max-w-[80%] p-3 text-sm rounded-2xl shadow-sm ${
                msg.sender === "user"
                  ? "bg-[#00927C] text-white rounded-br-none"
                  : "bg-white text-gray-700 border border-gray-100 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {suggestedActions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestedActions.map((action) => (
              <Button
                key={action.path}
                size="small"
                variant="outlined"
                startIcon={<OpenInNew fontSize="small" />}
                onClick={() => {
                  navigate(action.path);
                  onClose();
                }}
                sx={{
                  borderColor: "#00927C",
                  color: "#00927C",
                  textTransform: "none",
                  borderRadius: 999,
                  px: 1.5,
                }}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
        <TextField
          fullWidth
          placeholder="Type a message..."
          variant="standard"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          InputProps={{ disableUnderline: true, sx: { fontSize: "0.9rem" } }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!input.trim() || loading}
          sx={{
            bgcolor: "#f0fdfa",
            color: "#00927C",
            "&:hover": { bgcolor: "#e6fffa" },
          }}
        >
          {loading ? <CircularProgress size={18} sx={{ color: "#00927C" }} /> : <Send fontSize="small" />}
        </IconButton>
      </div>
    </Paper>
  );
};

export default Chatbot;

