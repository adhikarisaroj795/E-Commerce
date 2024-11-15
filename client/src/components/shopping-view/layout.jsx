import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* commom header  */}
      <ShoppingHeader />
      <main className="flex fex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
