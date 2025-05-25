import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Dashboard from "./icons/Dashboard";
import Accounts from "./icons/Accounts";
import Batches from "./icons/Batches";
import Resolution from "./icons/Resolution";
import Assessment from "./icons/Assessment";
import Appeal from "./icons/Appeal";
import Summary from "./icons/Summary";
import CircleArrow from "./icons/CircleArrow";
import Logout from "./icons/Logout";
import Settings from "./icons/Settings";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import useWindowWidth from "@/hooks/useWindowWidth";
interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}
interface LayoutProps {
  setIsExpanded: (value: boolean) => void;
  isExpanded: boolean;
}
const Layout = (props: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const width = useWindowWidth();
  const menuItems: MenuItem[] = [
    { icon: <Dashboard />, label: "Dashboard", path: "/" },
    { icon: <Accounts />, label: "Accounts", path: "/accounts" },
    { icon: <Batches />, label: "Batches", path: "/batches" },
    { icon: <Resolution />, label: "Resolution", path: "/resolution" },
    { icon: <Assessment />, label: "Assessments", path: "/assessments" },
    { icon: <Appeal />, label: "Appeal Letter", path: "/appeal" },
    { icon: <Summary />, label: "Summary", path: "/summary" },
  ];
  // useEffect(() => {
  //   if (width <= 758) {
  //     setIsSidebarOpen(false); 
  //   } else {
  //     setIsSidebarOpen(true); 
  //   }
  // }, [width]);
  useEffect(() => {
    if (width <= 758) {
      setIsSidebarOpen(false); // hidden on mobile
      props.setIsExpanded(true); // always show expanded on mobile when open
    } else {
      setIsSidebarOpen(true); // open on desktop
    }
  }, [width]);

  const handleToggleSidebar = () => {
    if (width <= 758) {
      // mobile toggle open/close
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      // desktop toggle expand/collapse
      props.setIsExpanded(!props.isExpanded);
    }
  };
  return (
    // <div
    //   className={` ${isSidebarOpen ? "sidebar" : "hide-sidebar"}`}
    // >
    //   <div
    //     className="d-md-none d-flex justify-content-end"
    //     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    //   >
    //     {isSidebarOpen ? (
    //       <IoIosArrowDropupCircle className="text-white fs-1" />
    //     ) : (
    //       <IoIosArrowDropdownCircle className="text-white fs-1" />
    //     )}
    //   </div>

    //   {isSidebarOpen && (
    //     <>
    //       <div className="d-none d-md-flex justify-content-end">
    //         <button
    //           className="text-white bg-transparent border-0  px-0 toggleButton"
    //           onClick={() => props.setIsExpanded(!props.isExpanded)}
    //           aria-label="Toggle sidebar"
    //         >
    //           <CircleArrow />
    //         </button>
    //       </div>
    //       <ul className="list-unstyled">
    //         {menuItems.map((item, index) => (
    //           <li key={index}>
    //             <div className="d-flex flex-row column-gap-2">
    //               {item.icon}
    //               {((props.isExpanded && isSidebarOpen)|| (!props.isExpanded && !isSidebarOpen) ) && (
    //                 <p className="leftText">{item.label}</p>
    //               )}
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //       <div className="mb-3 mt-5">
    //         <div className="d-flex flex-row column-gap-2 ps-3">
    //           <Settings />
    //           {(props.isExpanded || isSidebarOpen) && (
    //             <p className="leftText">Settings</p>
    //           )}
    //         </div>
    //         <div className="text-center mt-2">
    //           <Button
    //             variant="success"
    //             className="w-100 rounded-3 pb-2 d-flex justify-content-center align-items-center gap-2"
    //           >
    //             <Logout />
    //             {(props.isExpanded || isSidebarOpen) && (
    //               <span className="leftText">Logout</span>
    //             )}
    //           </Button>
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </div>
    <div className={`sidebar-container ${isSidebarOpen ? "sidebar" : "hide-sidebar"}`}>
      {/* Mobile toggle icon */}
      <div className="d-md-none d-flex justify-content-end" onClick={handleToggleSidebar}>
        {isSidebarOpen ? (
          <IoIosArrowDropupCircle className="text-white fs-1" />
        ) : (
          <IoIosArrowDropdownCircle className="text-white fs-1" />
        )}
      </div>

      {/* Desktop toggle button */}
      {isSidebarOpen && width > 758 && (
        <div className="d-none d-md-flex justify-content-end">
          <button
            className="text-white bg-transparent border-0 px-0 toggleButton"
            onClick={handleToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <CircleArrow />
          </button>
        </div>
      )}

      {isSidebarOpen && (
        <>
          <ul className="list-unstyled">
            {menuItems.map((item, index) => (
              <li key={index}>
                <div className="d-flex flex-row column-gap-2">
                  {item.icon}
                  {(width <= 758 || props.isExpanded) && <p className="leftText">{item.label}</p>}
                </div>
              </li>
            ))}
          </ul>

          <div className="mb-3 mt-5">
            <div className="d-flex flex-row column-gap-2 ps-3">
              <Settings />
              {(width <= 758 || props.isExpanded) && <p className="leftText">Settings</p>}
            </div>
            <div className="text-center mt-2">
              <Button variant="success" className="w-100 rounded-3 pb-2 d-flex justify-content-center align-items-center gap-2">
                <Logout />
                {(width <= 758 || props.isExpanded) && <span className="leftText">Logout</span>}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
