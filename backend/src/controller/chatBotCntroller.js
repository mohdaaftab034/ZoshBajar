const OpenAI = require("openai");
require("dotenv").config();

if (!process.env.GROQ_API_KEY) {
  console.warn("GROQ_API_KEY missing; chatbot endpoint will be disabled.");
}

const groqClient = process.env.GROQ_API_KEY
  ? new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    })
  : null;

const siteGuide = `
Zosh Bazaar site guide:
- Home: browse featured products and category entry points.
- Search: use the search bar at the top to find products quickly.
- Cart: review items you plan to buy at /cart.
- Wishlist: save items for later at /wishlist.
- Orders: check purchase status at /account/orders.
- Account: update profile and saved details at /account.
- Become a Seller: start selling at /become-seller.
- Login / Signup: access your account at /login.
`;

const buildSuggestedActions = (message = "") => {
  const text = message.toLowerCase();

  if (text.includes("cart") || text.includes("checkout") || text.includes("buy")) {
    return [{ label: "Open Cart", path: "/cart" }];
  }

  if (text.includes("wishlist") || text.includes("save") || text.includes("favorite")) {
    return [{ label: "Open Wishlist", path: "/wishlist" }];
  }

  if (text.includes("order") || text.includes("track") || text.includes("delivery")) {
    return [{ label: "View Orders", path: "/account/orders" }];
  }

  if (text.includes("seller") || text.includes("sell")) {
    return [{ label: "Become a Seller", path: "/become-seller" }];
  }

  if (text.includes("login") || text.includes("sign in") || text.includes("signin") || text.includes("signup")) {
    return [{ label: "Login / Signup", path: "/login" }];
  }

  if (text.includes("profile") || text.includes("account")) {
    return [{ label: "Open Account", path: "/account" }];
  }

  return [
    { label: "Browse Home", path: "/" },
    { label: "Open Cart", path: "/cart" },
    { label: "Open Wishlist", path: "/wishlist" },
  ];
};

const chatBotController = async (req, res) => {
  try {
    const { product, userMessage, chatHistory } = req.body;

    if (!product || !userMessage) {
      if (!userMessage) {
        return res.status(400).json({
          error: "Message is required",
        });
      }
    }

    const isProductMode = Boolean(product);

    const systemPrompt = isProductMode
      ? `
You are an AI assistant for a specific e-commerce product.

Product Name: ${product.title}
Price: ${product.sellingPrice}
Description: ${product.description}

Answer user questions strictly based on the above product details.
If the information is not available, say you don't have that information.
Keep the response short, clear, and helpful.
`
      : `
You are the Zosh Bazaar shopping assistant.

Use the site guide below to help customers navigate the store, understand pages, and complete actions.

${siteGuide}

Rules:
- Answer in a friendly, concise way.
- If the user asks where to go next, suggest the most relevant page.
- Mention navigation page names naturally when useful.
- If the user asks about something not covered, offer the closest useful page or action.
`;

    if (!groqClient) {
      return res.status(503).json({ error: "Chatbot unavailable" });
    }

    const historyMessages = (chatHistory || []).map((msg) => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: msg.content,
    }));

    const completion = await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: [
        { role: "system", content: systemPrompt },
        ...historyMessages,
        { role: "user", content: userMessage },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content || "";
    const suggestedActions = isProductMode
      ? buildSuggestedActions(userMessage)
      : buildSuggestedActions(userMessage);

    res.json({ reply, suggestedActions });
  } catch (error) {
    console.error("Chatbot error:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = { chatBotController };

