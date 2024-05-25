import React, { useState } from "react";
import Logo from "../Assets/airrr.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  
  const handleAboutClick = () => {
    window.location.href = "/";
    setTimeout(() => {
      const aboutSection = document.getElementById("about-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 500); 
    setOpenMenu(false);
  };
  const handleContactClick = () => {
    window.location.href = "/";
    setTimeout(() => {
      const aboutSection = document.getElementById("contact-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
    setOpenMenu(false);
  };
  
  const handleHomeClick = () => {
    console.log("home clicked")
    const homeSection = document.getElementById("home-section");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    }
    setOpenMenu(false);
  };

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      onClick: handleHomeClick,
    },
    {
      text: "About",
      icon: <InfoIcon />,
      onClick: handleAboutClick,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      onClick: handleContactClick,
    },
  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="AeroInspect Logo" />
      </div>
      <div className="navbar-links-container">
        <a href="/" onClick={handleHomeClick}>Home</a>
        <a href="#about-section">About</a>
        <a href="#contact-section">Contact</a>
        <button className="primary-button">Learn More</button>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.onClick}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
