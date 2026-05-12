import React, { useEffect, useState } from "react";
import DealCard from "./DealCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  useAppDispatch,
  useAppSelectore,
} from "../../../../Redux Toolkit/store";
import { type Deal as DealType, getAllDeals } from "../../../../Redux Toolkit/features/admin/dealSlice";
import { Typography } from "@mui/material";
import { LocalOffer } from "@mui/icons-material"; 

const Deal = () => {
  const dispatch = useAppDispatch();
  const deal = useAppSelectore((store) => store.deal);
  const [slidesToShow, setSlidesToShow] = useState(2); // Default to 2 for mobile-first
  const sliderRef = React.useRef<any>(null);

  // Handle window resize to update slides
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 374) {
        setSlidesToShow(1.5);
      } else if (width < 480) {
        setSlidesToShow(2);
      } else if (width < 640) {
        setSlidesToShow(2.5);
      } else if (width < 768) {
        setSlidesToShow(3);
      } else if (width < 1024) {
        setSlidesToShow(3);
      } else if (width < 1280) {
        setSlidesToShow(4);
      } else {
        setSlidesToShow(5);
      }
      // Trigger slider reinitialization
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive Slider Settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2.5,
          centerMode: false,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 374,
        settings: {
          slidesToShow: 1.5,
          centerMode: false,
          centerPadding: "0px",
          adaptiveHeight: true,
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(getAllDeals(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  // Don't render if no deals
  if (!deal.deals || deal.deals.length === 0) return null;

  return (
    <div className="py-6 sm:py-10 bg-white px-3 sm:px-5 lg:px-20">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <LocalOffer className="text-[#ff3e6c]" sx={{ fontSize: { xs: 24, sm: 32 } }} />
        <Typography
          variant="h5"
          className="font-bold text-gray-800"
          sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
        >
          Deals of the Day
        </Typography>
      </div>

      {/* Slider Container */}
      <div className="w-full overflow-hidden">
        {/* -mx-1 sm:-mx-2 is used to counteract the padding on individual items */}
        <Slider ref={sliderRef} {...settings} className="-mx-1 sm:-mx-2">
          {deal?.deals?.map((item: DealType, index: number) => (
            <div key={`${item._id}-${index}`} className="px-1 sm:px-2 md:px-3 py-1 sm:py-2">
              <DealCard
                deal={{
                  image: item?.category?.image || "",
                  discount: item.discount ?? 0,
                  categoryName: item?.category?.name || "",
                  categoryId: item?.category?.categoryId,
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Deal;

