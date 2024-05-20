import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { FaCartArrowDown, FaSearch, FaUserCircle } from "react-icons/fa";
import { logo } from "../../assets";

function Header() {
  return (
      <ReactNavbar
        burgerColor="#eb4034"
        burgerColorHover="#a62d24"
        logo={logo}
        logoWidth="20vmax"
        navColor1="rgba(0,0,0,1)"
        logoHoverSize="10px"
        logoColor="rgba(255,255,255,1)"
        logoHoverColor="#eb4034"
        searchIcon
        cartIcon
        profileIcon
        SearchIconElement={FaSearch}
        CartIconElement={FaCartArrowDown}
        ProfileIconElement={FaUserCircle}
        link1Text="Home"
        link2Text="Product"
        link3Text="Contact"
        link4Text="About"
        link1Url="/"
        link2Url="/product"
        link3Url="/contact"
        link4Url="/about"
        link1Size="1.3vmax"
        link1Color="rgba(255,255,255,1)"
        nav1justifyContent="flex-end"
        nav2justifyContent="flex-end"
        nav3justifyContent="flex-start"
        nav4justifyContent="flex-start"
        link1ColorHover="#eb4034"
        link1Margin="1vmax"
        profileIconColor="rgba(255,255,255,1)"
        cartIconColor="rgba(255,255,255,1)"
        searchIconColor="rgba(255,255,255,1)"
        profileIconColorHover="#eb4034"
        searchIconColorHover="#eb4034"
        cartIconColorHover="#eb4034"
        cartIconMargin="1vmax"
      />
  );
}

export default Header;
