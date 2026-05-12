import {
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Add,
  AdminPanelSettings,
  Category,
  Dashboard,
  ElectricBolt,
  Home,
  IntegrationInstructions,
  LocalOffer,
  Logout,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { useAppSelectore } from "../../Redux Toolkit/store";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <Dashboard />,
    activeIcon: <Dashboard />,
  },
  {
    name: "Coupons",
    path: "/admin/coupons",
    icon: <IntegrationInstructions />,
    activeIcon: <IntegrationInstructions />,
  },
  {
    name: "Add New Coupon",
    path: "/admin/add-coupons",
    icon: <Add />,
    activeIcon: <Add />,
  },
  {
    name: "Home Page Grid",
    path: "/admin/home-grid",
    icon: <Home />,
    activeIcon: <Home />,
  },
  {
    name: "Electronics Category",
    path: "/admin/electronics-category",
    icon: <ElectricBolt />,
    activeIcon: <ElectricBolt />,
  },
  {
    name: "Shop By Category",
    path: "/admin/shop-by-category",
    icon: <Category />,
    activeIcon: <Category />,
  },
  {
    name: "Featured Deals",
    path: "/admin/deals",
    icon: <LocalOffer />,
    activeIcon: <LocalOffer />,
  },
];

const AdminDrawerList = ({ toggleDrawer }: any) => {
  const location = useLocation();
  const { user } = useAppSelectore((store) => store.user);
  const navigate = useNavigate();

  const handleLogout = () => {
  };

  const handleClick = (item: any) => {
    navigate(item.path);
    if (toggleDrawer) {
      toggleDrawer(false);
    }
  };

  return (
    <div className="h-full flex flex-col w-[280px] bg-white border-r border-gray-100 shadow-2xl font-sans">
      {/* --- Admin Brand Header --- */}
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="relative w-12 h-12 rounded-xl bg-linear-to-tr from-[#00927C] to-[#26d0b3] flex items-center justify-center text-white font-bold shadow-lg shadow-teal-200">
          <AdminPanelSettings sx={{ fontSize: 26 }} />
          <div className="absolute inset-0 bg-white opacity-20 rounded-xl blur-sm"></div>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-800 tracking-tight leading-none">
            Zosh Admin
          </h2>
          <p className="text-xs text-gray-400 font-semibold mt-1 uppercase tracking-wide">
            Control Panel
          </p>
        </div>
      </div>

      {/* --- Navigation Menu --- */}
      <div className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-2">
          Management
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
                  fontSize: "0.9rem",
                  letterSpacing: "0.01em",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* --- User Profile Footer --- */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 mt-auto">
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#00927C",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {user?.fullName?.[0]?.toUpperCase() || "A"}
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-800 truncate">
              {user?.fullName || "Admin User"}
            </p>
            <p className="text-xs text-gray-400 truncate">Administrator</p>
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

export default AdminDrawerList;

