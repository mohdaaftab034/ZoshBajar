import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { colors } from "../../../Data/Filters/color";
import { price } from "../../../Data/Filters/price";
// Assuming you have a separate discount data array, or reused price logic
// import { discount } from "../../../Data/Filters/discount";

const FilteredSection = () => {
  const [expandColor, setExpandColor] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedColor = searchParams.get("color") || "";
  const selectedPrice = searchParams.get("price") || "";
  const selectedDiscount = searchParams.get("discount") || "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset page to 1 whenever filters change
    params.delete("page");
    setSearchParams(params);
  };

  const handleClearAll = () => {
    setSearchParams({});
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <p className="text-lg font-bold text-gray-800">Filters</p>
        <Button
          size="small"
          sx={{ color: teal[600], textTransform: "none", fontWeight: 600 }}
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      </div>

      <Divider />

      {/* Color Filter */}
      <section>
        <FormControl component="fieldset" className="w-full">
          <FormLabel
            sx={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "10px",
              "&.Mui-focused": { color: teal[600] },
            }}
          >
            Color
          </FormLabel>
          <RadioGroup
            name="color-radio-group"
            className="pl-2"
            value={selectedColor}
            onChange={(e) => updateParam("color", e.target.value)}
          >
            {colors
              .slice(0, expandColor ? colors.length : 5)
              .map((item: any, colorIdx: number) => (
                <FormControlLabel
                  key={`color-${item.name}-${colorIdx}`}
                  value={item.name}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: "gray",
                        "&.Mui-checked": { color: teal[600] },
                      }}
                    />
                  }
                  label={
                    <span className="text-sm text-gray-600 capitalize">
                      {item.name}
                    </span>
                  }
                  className="hover:bg-gray-50 rounded-md -ml-2 pr-2 transition-colors"
                />
              ))}
          </RadioGroup>
        </FormControl>

        {colors.length > 5 && (
          <Button
            onClick={() => setExpandColor(!expandColor)}
            sx={{
              mt: 1,
              color: teal[600],
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            {expandColor ? "- Show Less" : `+ ${colors.length - 5} More`}
          </Button>
        )}
      </section>

      <Divider sx={{ borderStyle: "dashed" }} />

      {/* Price Filter */}
      <section>
        <FormControl component="fieldset" className="w-full">
          <FormLabel
            sx={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "10px",
              "&.Mui-focused": { color: teal[600] },
            }}
          >
            Price Range
          </FormLabel>
          <RadioGroup
            name="price-radio-group"
            className="pl-2"
            value={selectedPrice}
            onChange={(e) => updateParam("price", e.target.value)}
          >
            {price.map((item: any) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "gray",
                      "&.Mui-checked": { color: teal[600] },
                    }}
                  />
                }
                label={
                  <span className="text-sm text-gray-600">{item.name}</span>
                }
                className="hover:bg-gray-50 rounded-md -ml-2 pr-2 transition-colors"
              />
            ))}
          </RadioGroup>
        </FormControl>
      </section>

      <Divider sx={{ borderStyle: "dashed" }} />

      {/* Discount Filter */}
      <section>
        <FormControl component="fieldset" className="w-full">
          <FormLabel
            sx={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "10px",
              "&.Mui-focused": { color: teal[600] },
            }}
          >
            Discount Range
          </FormLabel>
          <RadioGroup
            name="discount-radio-group"
            className="pl-2"
            value={selectedDiscount}
            onChange={(e) => updateParam("discount", e.target.value)}
          >
            {/* Assuming using price array for mock, ideally use separate discount array */}
            {price.slice(0, 4).map((item: any) => (
              <FormControlLabel
                key={`disc-${item.value}`}
                value={item.value}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "gray",
                      "&.Mui-checked": { color: teal[600] },
                    }}
                  />
                }
                label={
                  <span className="text-sm text-gray-600">
                    {item.name} (Mock)
                  </span>
                }
                className="hover:bg-gray-50 rounded-md -ml-2 pr-2 transition-colors"
              />
            ))}
          </RadioGroup>
        </FormControl>
      </section>
    </div>
  );
};

export default FilteredSection;

