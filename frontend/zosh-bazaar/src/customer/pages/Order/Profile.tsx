import Order from "./Order";
import OrderDetails from "./OrderDetails";
import { Route, Routes, useNavigate, useLocation } from "react-router";
import UserDetails from "../account/UserDetails"; // Ensure this path is correct
import { performLogout } from "../../../Redux Toolkit/features/Auth/AuthSlice";
import { useAppDispatch } from "../../../Redux Toolkit/store";
import {
  AccountBalanceWallet,
  AccountCircle,
  ExitToApp,
  LocationOn,
  ShoppingBag,
} from "@mui/icons-material";
import SavedCards from "./SavedCards";
import Address from "./Addresses";

const menu = [
  { name: "My Orders", path: "/account/orders", icon: <ShoppingBag /> },
  { name: "Profile Info", path: "/account", icon: <AccountCircle /> },
  {
    name: "Saved Cards",
    path: "/account/saved-cards",
    icon: <AccountBalanceWallet />,
  },
  { name: "Addresses", path: "/account/addresses", icon: <LocationOn /> },
  { name: "Logout", path: "/", icon: <ExitToApp /> },
];

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleClick = (item: any) => {
    if (item.name === "Logout") {
      dispatch(performLogout());
      navigate("/");
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Page Title */}
        <div className="mb-8 flex items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24 overflow-hidden">
              {/* Mobile: Horizontal Scroll, Desktop: Vertical List */}
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible scrollbar-hide p-2 lg:p-4 gap-2">
                {menu.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <div
                      key={item.path}
                      onClick={() => handleClick(item)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap
                        ${
                          isActive
                            ? "bg-[#00927C] text-white shadow-md font-semibold"
                            : "text-gray-600 hover:bg-teal-50 hover:text-[#00927C]"
                        }
                      `}
                    >
                      {/* Icon */}
                      <span
                        className={isActive ? "text-white" : "text-gray-400"}
                      >
                        {item.icon}
                      </span>
                      <p className="text-sm lg:text-base">{item.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Routes Render Here */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[60vh] p-4 sm:p-6">
              <Routes>
                <Route path="/" element={<UserDetails />} />
                <Route path="/orders" element={<Order />} />
                <Route
                  path="/orders/:orderId/:orderItemId"
                  element={<OrderDetails />}
                />
                <Route path="/saved-cards" element={<SavedCards/>} />
                <Route path="/addresses" element={<Address/>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollbar Utility */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none; 
            scrollbar-width: none; 
        }
      `}</style>
    </div>
  );
};

export default Profile;

