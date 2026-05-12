import { useState } from "react";
import SellerLogin from "./SellerLogin";
import SellerAccountForm from "./SellerAccountForm";
import { Button } from "@mui/material";

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen ">
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-5 shadow-lg rounded-b-md">
        {isLogin ? <SellerLogin /> : <SellerAccountForm />}

        <div className="mt-10 space-y-2">
          {<h1 className="text-center text-sm font-medium">{isLogin ? "Have Account": "Don't Have Account"}</h1>}

          <Button
            onClick={() => setIsLogin(!isLogin)}
            fullWidth
            variant="outlined"
            sx={{ py: "12px" }}
          >
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </section>

      <section className="hidden md:block md:col-span-1 lg:col-span-2 ">
        <div className="">
            <img src="https://zosh-bazzar.vercel.app/seller.jpg" alt="" />
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;

