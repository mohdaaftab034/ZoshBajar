import {
  Instagram,
  LinkedIn,
  Twitter,
  Send,
  CreditCard,
  Store,
  GitHub,
} from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();

  const shopLinks = [
    { label: "Men Fashion", path: "/products/men" },
    { label: "Women Fashion", path: "/products/women" },
    { label: "Kids Wear", path: "/products/kids" },
    { label: "Electronics", path: "/products/electronics" },
    { label: "Home & Furniture", path: "/products/home_furniture" },
    { label: "Beauty & Personal Care", path: "/products/beauty" },
    { label: "Grocery", path: "/products/grocery" },
  ];

  const customerLinks = [
    { label: "My Account", path: "/account" },
    { label: "My Orders", path: "/account/orders" },
    { label: "Track Order", path: "/account/orders" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Returns & Refunds", path: "/account/orders" },
    { label: "Customer Support", path: "/account" },
  ];

  const companyLinks = [
    { label: "About Us", path: "/" },
    { label: "Careers", path: "/" },
    { label: "Press & Media", path: "/" },
    { label: "Investor Relations", path: "/" },
    { label: "Sustainability", path: "/" },
    { label: "Corporate Info", path: "/" },
  ];

  const policyLinks = [
    { label: "Privacy Policy", path: "/" },
    { label: "Terms of Use", path: "/" },
    { label: "Shipping Policy", path: "/" },
    { label: "Return Policy", path: "/" },
    { label: "Payment Security", path: "/" },
    { label: "Report an Issue", path: "/account" },
  ];

  const handleNavigate = (path?: string) => {
    if (!path) return;
    navigate(path);
  };

  const socialLinks = [
    { Icon: GitHub, url: "https://github.com/mohdaaftab034" },
    { Icon: Instagram, url: "https://www.instagram.com/aaftab._0fficial034" },
    { Icon: Twitter, url: "https://x.com/AaftabAnsa4211" },
    {
      Icon: LinkedIn,
      url: "https://www.linkedin.com/in/aaftab-670888333?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BUH%2BHul2QQiKLw2b7RGHDoA%3D%3D",
    },
  ];

  return (
    <footer className="w-full bg-white mt-20 relative border-t border-gray-100 pt-10">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00927C] to-transparent opacity-70"></div>

      <div className="w-full px-6 sm:px-10 lg:px-20 pb-10">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 rounded-2xl p-6 mb-12 border border-gray-100">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Store className="text-[#00927C]" />
              Subscribe to our Newsletter
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Get the latest updates, offers and special promos.
            </p>
          </div>
          <div className="w-full md:w-auto flex gap-2">
            <TextField
              size="small"
              placeholder="Enter your email"
              sx={{
                bgcolor: "white",
                width: { xs: "100%", md: "300px" },
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#00927C",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: "none",
                "&:hover": { bgcolor: "#007a68", boxShadow: "none" },
              }}
              endIcon={<Send fontSize="small" />}
            >
              Subscribe
            </Button>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-12">
          {/* Brand & Socials */}
          <div className="lg:col-span-1 sm:col-span-2 xl:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-2xl font-bold text-[#00927C] tracking-tight">
                Zosh Bazaar
              </h1>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Zosh Bazaar brings you a premium ecommerce experience with trusted
              brands, secure payments, and fast delivery across India.
            </p>

            <div className="flex gap-2">
              {socialLinks.map(({ Icon, url }) => (
                <IconButton
                  key={url}
                  component="a"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    color: "#00927C",
                    bgcolor: "rgba(0, 146, 124, 0.1)",
                    "&:hover": { bgcolor: "#00927C", color: "white" },
                    transition: "all 0.3s ease",
                  }}
                  size="small"
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 border-l-4 border-[#00927C] pl-3">
              Shop
            </h2>
            <ul className="space-y-3 text-sm text-gray-500">
              {shopLinks.map((item, shopIdx) => (
                <li
                  key={`shop-${shopIdx}`}
                  onClick={() => handleNavigate(item.path)}
                  className="hover:text-[#00927C] cursor-pointer transition-all duration-200 hover:translate-x-1 hover:font-medium"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Links */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 border-l-4 border-[#00927C] pl-3">
              Customer
            </h2>
            <ul className="space-y-3 text-sm text-gray-500">
              {customerLinks.map((item, custIdx) => (
                <li
                  key={`customer-${custIdx}`}
                  onClick={() => handleNavigate(item.path)}
                  className="hover:text-[#00927C] cursor-pointer transition-all duration-200 hover:translate-x-1 hover:font-medium"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 border-l-4 border-[#00927C] pl-3">
              Company
            </h2>
            <ul className="space-y-3 text-sm text-gray-500">
              {companyLinks.map((item, compIdx) => (
                <li
                  key={`company-${compIdx}`}
                  onClick={() => handleNavigate(item.path)}
                  className="hover:text-[#00927C] cursor-pointer transition-all duration-200 hover:translate-x-1 hover:font-medium"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Links */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 border-l-4 border-[#00927C] pl-3">
              Policies
            </h2>
            <ul className="space-y-3 text-sm text-gray-500">
              {policyLinks.map((item, policyIdx) => (
                <li
                  key={`policy-${policyIdx}`}
                  onClick={() => handleNavigate(item.path)}
                  className="hover:text-[#00927C] cursor-pointer transition-all duration-200 hover:translate-x-1 hover:font-medium"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Zosh Bazaar. Designed & Developed by{" "}
            <a
              href="#"
              className="font-semibold text-[#00927C] hover:underline"
            >
              Mohd Aaftab
            </a>
            .
          </p>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 font-medium">
              100% Secure Payment:
            </span>
            <div className="flex gap-2 opacity-70 grayscale hover:grayscale-0 transition-all">
              <CreditCard fontSize="small" />
              {/* You can replace these with actual payment logo images */}
              <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-bold">
                VISA
              </div>
              <div className="w-8 h-5 bg-orange-500 rounded flex items-center justify-center text-[8px] text-white font-bold">
                MC
              </div>
              <div className="w-8 h-5 bg-indigo-600 rounded flex items-center justify-center text-[8px] text-white font-bold">
                UPI
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

