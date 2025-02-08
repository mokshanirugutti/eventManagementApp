import React from "react";
import { Outlet } from "react-router";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/Footer";



const Layout : React.FC = () => {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;