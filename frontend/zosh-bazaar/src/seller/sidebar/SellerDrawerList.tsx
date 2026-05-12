import {
  Divider,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  AccountBalanceWallet,
  AccountBox,
  AddBox,
  Dashboard,
  Inventory,
  Logout,
  ReceiptLong,
  ShoppingBag,
  Storefront,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../../Redux Toolkit/store";
import { performLogout } from "../../Redux Toolkit/features/Auth/AuthSlice";

const menu = [
  {
    name: "Dashboard",
    path: "/seller",
    icon: <Dashboard />,
    activeIcon: <Dashboard />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBag />,
    activeIcon: <ShoppingBag />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <Inventory />,
    activeIcon: <Inventory />,
  },
  {
    name: "Add Product",
    path: "/seller/add-products",
    icon: <AddBox />,
    activeIcon: <AddBox />,
  },
  {
    name: "Payments",
    path: "/seller/payment",
    icon: <AccountBalanceWallet />,
    activeIcon: <AccountBalanceWallet />,
  },
  {
    name: "Transactions",
    path: "/seller/transaction",
    icon: <ReceiptLong />,
    activeIcon: <ReceiptLong />,
  },
];

const menu2 = [
  {
    name: "Account Settings",
    path: "/seller/account",
    icon: <AccountBox />,
    activeIcon: <AccountBox />,
  },
];

const SellerDrawerList = ({ toggleDrawer }: any) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(performLogout());
  };

  const handleClick = (item: any) => {
    navigate(item.path);
    if (toggleDrawer) {
      toggleDrawer(false);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col w-full sm:w-[280px] shadow-2xl border-r border-gray-100 font-sans">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="relative w-12 h-12 rounded-xl bg-linear-to-tr from-[#00927C] to-[#26d0b3] flex items-center justify-center text-white shadow-lg shadow-teal-200">
          <Storefront sx={{ fontSize: 26 }} />
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-white opacity-20 rounded-xl blur-sm"></div>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-800 tracking-tight leading-none">
            Zosh Seller
          </h2>
          <p className="text-xs text-gray-400 font-semibold mt-1 uppercase tracking-wide">
            Vendor Panel
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-2">
          Overview
        </p>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              onClick={() => handleClick(item)}
              className={`
                group flex items-center px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 ease-in-out
                ${
                  isActive
                    ? "bg-linear-to-r from-[#00927C] to-[#007563] text-white shadow-lg shadow-teal-100 translate-x-1"
                    : "text-gray-500 hover:bg-teal-50 hover:text-[#00927C]"
                }
              `}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color: isActive ? "white" : "inherit",
                  transition: "color 0.2s",
                }}
              >
                {isActive ? item.activeIcon : item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.95rem",
                  letterSpacing: "0.01em",
                }}
              />
            </div>
          );
        })}

        <div className="my-4 px-4">
          <Divider sx={{ borderColor: "#f3f4f6" }} />
        </div>

        <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          Settings
        </p>
        {menu2.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              onClick={() => handleClick(item)}
              className={`
                group flex items-center px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 ease-in-out
                ${
                  isActive
                    ? "bg-gray-800 text-white shadow-md translate-x-1"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color: isActive ? "white" : "inherit",
                }}
              >
                {isActive ? item.activeIcon : item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.95rem",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
          <Avatar
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            sx={{ width: 40, height: 40, bgcolor: "#00927C" }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-800 truncate">
              Mohd Aaftab
            </p>
            <p className="text-xs text-gray-400 truncate">seller@zosh.com</p>
          </div>
          <IconButton
            onClick={handleLogout}
            size="small"
            sx={{
              color: "gray",
              "&:hover": { color: "#ef4444", bgcolor: "#fef2f2" },
            }}
          >
            <Logout fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default SellerDrawerList;

