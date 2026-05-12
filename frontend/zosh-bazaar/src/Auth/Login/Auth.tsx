import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button } from "@mui/material";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  
  return (
    <div className="flex justify-center h-[90vh] items-center">
      <div className="max-w-md h-[85vh] rounded-md shadow-md ">
        <img
          className="w-full rounded-t-md"
          src="https://zosh-bazzar.vercel.app/login_banner.png"
          alt=""
        />

        <div className="mt-8 px-10">
          {isLogin ? <LoginForm /> : <RegisterForm />}

          <div className="flex items-center gap-1 justify-center mt-5">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
              className="text-center"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Signup" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

