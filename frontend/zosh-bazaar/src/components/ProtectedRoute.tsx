import React from "react";
import { Navigate } from "react-router";
import { useAppSelectore } from "../Redux Toolkit/store";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  allowSellerJwt?: boolean;
  redirectTo?: string;
  children: React.ReactElement;
}

const ProtectedRoute = ({
  allowedRoles = [],
  allowSellerJwt = false,
  redirectTo = "/login",
  children,
}: ProtectedRouteProps) => {
  const { auth, sellerAuth, seller } = useAppSelectore((store) => store);

  const hasAllowedRole =
    allowedRoles.length === 0 || (auth.role && allowedRoles.includes(auth.role));

  const sellerHasAllowedRole = 
    allowSellerJwt && sellerAuth.role && allowedRoles.includes(sellerAuth.role);

  const sellerAuthed = allowSellerJwt && (!!sellerAuth.jwt || !!seller.profile);

  if (hasAllowedRole || sellerAuthed || sellerHasAllowedRole) {
    return children;
  }

  return <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
