import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./sideBar.scss";
import { SideBarLogic } from "./SideBarLogic";

import List from "@mui/material/List";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ListItem from "@mui/material/ListItem";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";

import hradLogo from "../../assets/sideBar/hradLogo.svg";
import rightArrow from "../../assets/sideBar/rightArrow.svg";
import { Slide } from "@mui/material";

const SideBarComponent = () => {
  let location = useLocation();
  const containerRef = React.useRef()

  const { sideBarLinkData } = SideBarLogic();
  const [isMobile, setIsMobile] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleSidebar = () => {
    setIsMobile(!isMobile);
    setOpen(true);
  };

  const handleMobile = () => {
    if (document.body.clientWidth < 950) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  React.useEffect(() => {
    handleMobile();
  }, [location]);

  window.addEventListener("resize", function () {
    handleMobile();
  });

  window.addEventListener("load", function () {
    handleMobile();
  });

  return (
    <>
      <MenuIcon
        onClick={() => {
          handleSidebar();
        }}
        className={`menu-bar z-50 absolute top-7 ${isMobile ? "block" : "hidden"
          }`}
      />
      <div
        className={` 
        ${open ? "sidebar-text" : ""}
       
           responsive-sidebar z-50  `}
      >

        <List className={`${isMobile ? "hide-list" : ""} h-auto lg:h-screen`}>
          <ListItem className="my-3 z-30">
            <NavLink to="/" className="sidebar-icons-list">
              <div>
                <img src={hradLogo} alt="hradLogo" />
                <div className="text-lg font-bold ps-2">
                  <span className="hrColor text-white">hr</span>ad.
                </div>
              </div>
            </NavLink>
          </ListItem>
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className=" icon-btn"
          >
            <img
              className={
                open ? "rotate-arrow w-full m-2" : "not-rotate-arrow w-full m-2"
              }
              src={rightArrow}
              alt="rightArrow"
            />
          </button>
          <div className="fixed w-[6rem] h-full bg-white top-0 left-0 z-10 icon-bg" />
          <div className="md:h-[80%] scrollbar-hidden overflow-auto">
            {sideBarLinkData.map((item, index) => {
              return (
                Object.keys(item).length !== 0 && (
                  <ListItem key={index} className="my-3 z-30 ">
                    <NavLink
                      to={item?.path}
                      className="sidebar-icons-list min-[950px]:pr-[5rem]"
                    >
                      {({ isActive }) => (
                        <img
                          className={`background-design ${isActive
                            ? item?.activeIcon
                              ? "active-icon"
                              : ""
                            : ""
                            }`}
                          src={
                            isActive
                              ? item?.activeIcon
                                ? item?.activeIcon
                                : item?.icon
                              : item?.icon
                          }
                          alt="overview"
                        />
                      )}
                    </NavLink>
                    <Slide direction="right" in={open} ref={containerRef.current} timeout={400}
                      mountOnEnter={false}
                      unmountOnExit={false}
                      easing={{
                        enter: "cubic-bezier(0.42, 0, 0.58, 1)",
                        exit: "cubic-bezier(0.42, 0, 0.58, 1)"
                      }}
                    >
                      <Accordion
                        className="sidebar-text-elements flex-col "
                        style={{ display: open ? "flex" : "none" }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <NavLink className="text-sm ">{item?.text}</NavLink>
                        </AccordionSummary>
                        <AccordionDetails>
                          {item?.sublist?.map((subItem, subIndex) => {
                            return (
                              Object.keys(subItem).length !== 0 && (
                                <div
                                  className="sidebar-text-element-employees flex flex-col"
                                  key={subIndex}
                                >
                                  <NavLink
                                    to={subItem?.path}
                                    className="sidebar-text-list "
                                  >
                                    {subItem?.text}
                                  </NavLink>
                                </div>
                              )
                            );
                          })}
                        </AccordionDetails>
                      </Accordion>
                    </Slide>
                  </ListItem>
                )
              );
            })}
          </div>
        </List>
      </div>
    </>
  );
};

export default SideBarComponent;
