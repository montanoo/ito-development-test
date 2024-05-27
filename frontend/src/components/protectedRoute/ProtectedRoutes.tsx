import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  redirectPath: string;
  isAllowed: boolean;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({
  redirectPath,
  isAllowed,
}) => {
  return isAllowed ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoutes;
