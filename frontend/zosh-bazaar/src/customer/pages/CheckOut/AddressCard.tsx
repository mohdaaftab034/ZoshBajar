import { Radio } from "@mui/material";
import { Home, LocalPhone } from "@mui/icons-material";

const AddressCard = ({ value, selectedValue, handleChange, item }: any) => {
  const isSelected = selectedValue === value;

  return (
    <div
      onClick={() => handleChange({ target: { value } })} // Make whole card clickable
      className={`
        p-4 border rounded-xl flex items-start gap-3 cursor-pointer transition-all duration-200
        ${
          isSelected
            ? "border-[#00927C] bg-[#00927C]/5 shadow-md ring-1 ring-[#00927C]"
            : "border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white"
        }
      `}
    >
      <Radio
        checked={isSelected}
        value={value}
        onChange={handleChange}
        name="radio-buttons"
        sx={{
          color: isSelected ? "#00927C" : "default",
          "&.Mui-checked": { color: "#00927C" },
          padding: 0,
          marginTop: "2px",
        }}
      />

      <div className="space-y-2 w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-gray-800 text-base">{item.name || "Name"}</h1>
          {isSelected && (
            <span className="text-[10px] font-bold bg-[#00927C] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
              Selected
            </span>
          )}
        </div>

        <div className="text-sm text-gray-600 flex items-start gap-2">
          <Home fontSize="small" className="text-gray-400 mt-0.5" />
          <p className="leading-relaxed">
            {item.address}, {item.locality}, {item.city}, {item.state} - {item.pincode}
          </p>
        </div>

        <div className="text-sm text-gray-600 flex items-center gap-2">
          <LocalPhone fontSize="small" className="text-gray-400" />
          <p className="font-medium">{item.mobile || "Not provided"}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;

