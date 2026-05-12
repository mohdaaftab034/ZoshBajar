import {
  AccountCircle,
  AddShoppingCart,
  Close,
  FavoriteBorder,
  Menu,
  Search,
  Storefront,
  ChevronRight,
  Category, // Added for icon
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  InputBase,
  Collapse,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { mainCategory } from "../../Data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import { useNavigate } from "react-router";
import { useAppSelectore } from "../../Redux Toolkit/store";

// --- 1. Import Category Data for Suggestions ---
import { menLevelTwo } from "../../Data/category/levelTwo/menLevelTwo";
import { womenLevelTwo } from "../../Data/category/levelTwo/womenLevelTwo";
import { electronicLevelTwo } from "../../Data/category/levelTwo/electronicLevelTwo";
import { furnitureLevelTwo } from "../../Data/category/levelTwo/furnitureLevelTwo";
import { menLevelThree } from "../../Data/category/level three/menLevelThree";
import { womenLevelThree } from "../../Data/category/level three/womenLevelThree";
import { furnitureLevelThree } from "../../Data/category/level three/furnitureLevelThree";
import { electronicLevelThree } from "../../Data/category/level three/electronicsLevelThree";

const Navbar = () => {
  const { user, cart, wishlist } = useAppSelectore((store) => store);
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]); // State for suggestions

  const navigate = useNavigate();
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("md"));
  const cartCount = cart.cart?.cartItems?.length || 0;
  const wishlistCount = wishlist.wishlist?.wishlistItems?.length || 0;

  // --- 2. Combine all categories into one searchable list ---
  const allSearchableItems = [
    ...menLevelTwo,
    ...womenLevelTwo,
    ...electronicLevelTwo,
    ...furnitureLevelTwo,
    ...menLevelThree,
    ...womenLevelThree,
    ...furnitureLevelThree,
    ...electronicLevelThree,
  ];

  // --- 3. Filter Logic ---
  useEffect(() => {
    if (searchText.trim().length > 1) {
      // Filter items that match the search text (case insensitive)
      const filtered = allSearchableItems.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      // Limit to top 8 results to avoid huge list
      setSuggestions(filtered.slice(0, 8));
    } else {
      setSuggestions([]);
    }
  }, [searchText]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e: any) => {
    if ((e.key === "Enter" || e.type === "click") && searchText.trim()) {
      navigate(`/search?q=${searchText}`);
      setSearchOpen(false);
      setSuggestions([]); // Clear suggestions on search
    }
  };

  // --- 4. Handle Suggestion Click ---
  const handleSuggestionClick = (categoryId: string) => {
    navigate(`/products/${categoryId}`);
    setSearchText("");
    setSuggestions([]);
    setSearchOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
      className="bg-white"
    >
      {/* ... (Existing Sidebar Code) ... */}
      <div className="p-6 bg-[#00927C] text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl">Zosh Bazaar</h2>
          <IconButton onClick={handleMobileMenuToggle} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </div>

        {user.user?.fullName ? (
          <div
            className="flex items-center gap-3"
            onClick={() => navigate("/account")}
          >
            <Avatar
              src={user.user?.profilePicture || ""}
              sx={{ width: 50, height: 50, border: "2px solid white" }}
            >
              {user.user?.fullName?.[0]?.toUpperCase()}
            </Avatar>
            <div>
              <p className="font-semibold text-lg truncate w-40">
                {user.user?.fullName}
              </p>
              <p className="text-xs opacity-80 cursor-pointer hover:underline">
                View Profile
              </p>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => {
              navigate("/login");
              setMobileMenuOpen(false);
            }}
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              backgroundColor: "white",
              color: "#00927C",
              fontWeight: "bold",
            }}
            startIcon={<AccountCircle />}
          >
            Login / Signup
          </Button>
        )}
      </div>

      <Box className="grow overflow-y-auto py-2">
        <List>
          {/* ... (Existing List Items) ... */}
          <ListItem disablePadding>
            <ListItemText
              primary="Shop by Category"
              primaryTypographyProps={{
                style: { fontWeight: "bold", padding: "0 16px", color: "#888" },
              }}
            />
          </ListItem>
          {mainCategory.map((item) => (
            <ListItem key={item.categoryid} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(`/products/${item.categoryid}`);
                  setMobileMenuOpen(false);
                }}
                sx={{ py: 1.5 }}
              >
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ style: { fontWeight: 500 } }}
                />
                <ChevronRight className="text-gray-400" fontSize="small" />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/account/orders")}>
              <ListItemIcon>
                <Storefront className="text-[#00927C]" />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/wishlist")}>
              <ListItemIcon>
                <FavoriteBorder className="text-[#00927C]" />
              </ListItemIcon>
              <ListItemText primary="My Wishlist" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={() => {
            navigate("/become-seller");
            setMobileMenuOpen(false);
          }}
          variant="outlined"
          fullWidth
          startIcon={<Storefront />}
          sx={{ color: "#00927C", borderColor: "#00927C" }}
        >
          Become a Seller
        </Button>
      </div>
    </Box>
  );

  return (
    <>
      <Box className="sticky top-0 left-0 right-0 z-50">
        <div className="bg-white bg-opacity-95 backdrop-blur-md shadow-sm">
          <div className="flex items-center justify-between px-3 sm:px-6 lg:px-20 h-16 sm:h-[70px] border-b border-gray-200">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              {!isLarge && (
                <IconButton onClick={handleMobileMenuToggle}>
                  <Menu className="text-gray-700" sx={{ fontSize: 29 }} />
                </IconButton>
              )}

              <h1
                onClick={() => navigate("/")}
                className="logo cursor-pointer text-lg sm:text-xl md:text-2xl font-bold text-[#00927C]"
              >
                Zosh Bazaar
              </h1>

              {/* Desktop Categories */}
              <ul className="hidden md:flex items-center font-medium text-gray-800 ml-8">
                {mainCategory.map((item) => (
                  <li
                    key={item.categoryid}
                    onMouseEnter={() => {
                      setShowSheet(true);
                      setSelectedCategory(item.categoryid);
                    }}
                    onMouseLeave={() => setShowSheet(false)}
                    onClick={() => navigate(`/products/${item.categoryid}`)}
                    className="mainCategory hover:text-[#00927C] cursor-pointer hover:border-b-2 h-16 sm:h-[70px] px-3 sm:px-4 border-[#00927C] flex items-center transition-all duration-200"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-5">
              {/* DESKTOP SEARCH: Expandable Input */}
              {isLarge ? (
                <div className="relative group hidden lg:block">
                  <div className="flex items-center border border-gray-200 rounded-full bg-gray-100 px-2 sm:px-3 py-1 transition-all duration-300 w-40 sm:w-[200px] focus-within:w-48 sm:focus-within:w-[300px] focus-within:border-[#00927C] focus-within:ring-1 focus-within:ring-[#00927C]">
                    <Search className="text-gray-500" />
                    <InputBase
                      placeholder="Search..."
                      className="ml-2 w-full"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={handleSearch}
                    />
                    {/* Clear Button */}
                    {searchText && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSearchText("");
                          setSuggestions([]);
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    )}
                  </div>

                  {/* --- SUGGESTION DROPDOWN (DESKTOP) --- */}
                  {suggestions.length > 0 && (
                    <Paper
                      elevation={4}
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        mt: 1,
                        maxHeight: 400,
                        overflowY: "auto",
                        borderRadius: 2,
                      }}
                    >
                      <List>
                        {suggestions.map((item, index) => (
                          <ListItemButton
                            key={index}
                            onClick={() =>
                              handleSuggestionClick(item.categoryId)
                            }
                          >
                            <ListItemIcon>
                              <Category
                                fontSize="small"
                                className="text-gray-400"
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={item.name}
                              primaryTypographyProps={{
                                fontSize: "0.9rem",
                                color: "#333",
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Paper>
                  )}
                </div>
              ) : (
                // MOBILE SEARCH TRIGGER
                <IconButton onClick={() => setSearchOpen(!searchOpen)}>
                  <Search sx={{ fontSize: 24 }} />
                </IconButton>
              )}

              {/* User Profile */}
              {isLarge && (
                <>
                  {user.user?.fullName ? (
                    <Button
                      onClick={() => navigate("/account")}
                      className="flex items-center gap-2"
                    >
                      <Avatar
                        src={user.user.profilePicture}
                        sx={{ width: 29, height: 29, bgcolor: "#00927C" }}
                      >
                        {user.user.fullName[0].toUpperCase()}
                      </Avatar>
                      <h1 className="font-semibold capitalize text-gray-700">
                        {user.user?.fullName}
                      </h1>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => navigate("/login")}
                      variant="contained"
                      sx={{ bgcolor: "#00927C" }}
                      startIcon={<AccountCircle />}
                    >
                      Login
                    </Button>
                  )}
                </>
              )}

              <IconButton
                onClick={() => navigate("/wishlist")}
                className="hidden md:flex"
              >
                <Badge
                  badgeContent={wishlistCount}
                  color="error"
                  overlap="circular"
                  invisible={wishlistCount === 0}
                >
                  <FavoriteBorder sx={{ fontSize: { sm: 24, md: 29 } }} />
                </Badge>
              </IconButton>

              <IconButton onClick={() => navigate("/cart")}>
                <Badge
                  badgeContent={cartCount}
                  color="error"
                  overlap="circular"
                  invisible={cartCount === 0}
                >
                  <AddShoppingCart sx={{ fontSize: { xs: 24, md: 29 } }} />
                </Badge>
              </IconButton>

              {isLarge && (
                <Button
                  onClick={() => navigate("/become-seller")}
                  variant="outlined"
                  startIcon={<Storefront />}
                  sx={{ color: "#00927C", borderColor: "#00927C" }}
                >
                  Become Seller
                </Button>
              )}
            </div>
          </div>

          {/* MOBILE SEARCH BAR: Sliding Dropdown */}
          <Collapse in={searchOpen && !isLarge}>
            <div className="p-4 bg-white border-b border-gray-200 shadow-inner relative">
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                <Search className="text-gray-500 mr-2" />
                <InputBase
                  autoFocus={searchOpen}
                  placeholder="Search..."
                  className="w-full"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleSearch}
                />
                {searchText && (
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSearchText("");
                      setSuggestions([]);
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                )}
              </div>

              {/* --- SUGGESTION DROPDOWN (MOBILE) --- */}
              {suggestions.length > 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    mt: 1,
                    maxHeight: 300,
                    overflowY: "auto",
                    border: "1px solid #eee",
                  }}
                >
                  <List>
                    {suggestions.map((item, index) => (
                      <ListItemButton
                        key={index}
                        onClick={() => handleSuggestionClick(item.categoryId)}
                      >
                        <ListItemIcon>
                          <Search fontSize="small" className="text-gray-400" />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Paper>
              )}
            </div>
          </Collapse>
        </div>
      </Box>

      {/* Mobile Sidebar */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{ zIndex: 9999 }}
      >
        {drawerContent}
      </Drawer>

      {/* Category Sheet */}
      {showSheet && isLarge && (
        <div
          onMouseEnter={() => setShowSheet(true)}
          onMouseLeave={() => setShowSheet(false)}
          className="fixed top-[70px] left-0 right-0 z-9998 mx-20"
        >
          <CategorySheet
            selectedCategory={selectedCategory}
            setShowSheet={setShowSheet}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;

