/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// Components
import { Spacer } from "components/common";
import { NavbarFoo } from "components/layout";

// Styled Elements
import { NavbarStyles } from "assets/styles/layout";
import { EmployeeDropdown } from "components/header/EmployeeDropdown";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";

export const Navbar = ({ indexNavbar, setIndexNavbar }) => {
  const [buttonStyle, setButtonStyle] = useState("");
  const navRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarItems, setNavbarItems] = useState([
    {
      id: 0,
      text: "کارمندان",
      link: "/employees/list",
      innerDrop: [
        {
          text: "کارمند جدید",
          defSrc:
            require("assets/images/header/employee-dropdown/user-secondary.svg")
              .default,
          hoverSrc:
            require("assets/images/header/employee-dropdown/user-primary.svg")
              .default,
          badge: require("assets/images/common/plus/white-color-yellow-bg.svg")
            .default,
          path: "/employees/new-employee",
        },
        {
          text: "لیست کارمندان",
          defSrc:
            require("assets/images/header/employee-dropdown/user-secondary.svg")
              .default,
          hoverSrc:
            require("assets/images/header/employee-dropdown/user-primary.svg")
              .default,
          badge: "",
          path: "/employees/list",
        },
        {
          text: "کارمندان حذف شده",
          defSrc:
            require("assets/images/header/employee-dropdown/user-secondary.svg")
              .default,
          hoverSrc:
            require("assets/images/header/employee-dropdown/user-primary.svg")
              .default,
          badge: require("assets/images/common/trash/white-color.svg").default,
          path: "/employees/deleted-list",
        },
        {
          text: "ارسال پیامک",
          defSrc:
            require("assets/images/header/employee-dropdown/message-secondary.svg")
              .default,
          hoverSrc:
            require("assets/images/header/employee-dropdown/message-primary.svg")
              .default,
          badge: "",
          path: "/employees/send-message",
        },
        {
          text: "بارگذاری گروهی",
          defSrc:
            require("assets/images/header/employee-dropdown/upload-secondary.svg")
              .default,
          hoverSrc:
            require("assets/images/header/employee-dropdown/upload-primary.svg")
              .default,
          badge: "",
          path: "/employees/upload",
        },
      ],
      route: "/employees/list",
    },
  ]);
  const [isShown, setIsShown] = useState(false);

  const getItems = useCallback(
    (item) => {
      if (navbarItems.length < 5) {
        setNavbarItems([
          ...navbarItems,
          {
            text: item?.text,
            route: item?.route,
            link: item?.link,
            id: item?.id,
            innerDrop: item?.innerDrop,
          },
        ]);
      }
      const duplicateItem = navbarItems.filter((el) => el?.id == item.id);

      if (!!duplicateItem && duplicateItem.length !== 0) {
        let filteredArr = navbarItems.filter((el) => {
          return el?.id != item?.id;
        });
        setNavbarItems([...filteredArr]);
      }
    },
    [navbarItems]
  );
  useEffect(() => {
    setButtonStyle(location.pathname);
    const IndexNavbarItems = navbarItems.findIndex((el) => {
      return el.route.indexOf("/form-generator/list");
    });
  }, [location.pathname]);

  //first useEffect for persisit items of navbar when refresh page
  useEffect(() => {
    if (navbarItems !== null) {
      setNavbarItems(JSON.parse(localStorage.getItem("navbarItems")));
    }
  }, []);
  //second useEffect for persisit items of navbar when refresh page
  useEffect(() => {
    if (navbarItems !== null) {
      window.localStorage.setItem("navbarItems", JSON.stringify(navbarItems));
    } else {
      setNavbarItems(JSON.parse(localStorage.getItem("navbarItems")));
    }
  }, [navbarItems]);

  const spacerIndex = navbarItems?.findIndex((el) => {
    return location.pathname.startsWith(el.route);
  });

  const navBarItemsIndex = (index, item) => {
    setIndexNavbar(index);

    navigate(item.route);
    setIsShown(false);
  };
  const navBarItemsInnerDrops = (index, item) => {
    setIndexNavbar(index);
    setIsShown(false);
  };

  return (
    <nav>
      <NavbarStyles.List>
        {navbarItems?.map((item, index) => (
          <div key={item.id} onClick={() => navBarItemsInnerDrops(index, item)}>
            {item?.innerDrop?.length !== 0 ? (
              <div style={{ display: "flex" }}>
                <EmployeeDropdown
                  key={item.id}
                  button={buttonStyle.includes("/employees") ? "white" : null}
                  title={item.text}
                  innerDrop={item.innerDrop}
                  index={index}
                  indexNavbar={indexNavbar}
                  route={item.route}
                />
                {/* {index !== indexNavbar - 1 && index !== indexNavbar ? (
                  <Spacer line={index} />
                ) : null} */}
              </div>
            ) : (
              <div
                onClick={() => navBarItemsIndex(index, item)}
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <NavbarStyles.ListItem
                  button={
                    buttonStyle.includes(item.link) ||
                    buttonStyle.includes(item.link)
                      ? "white"
                      : null
                  }
                >
                  <NavLink
                    to={item.route}
                    ref={navRef}
                    style={{ fontSize: "1.1rem" }}
                  >
                    {item.text}
                  </NavLink>
                </NavbarStyles.ListItem>
                {/* {index !== spacerIndex - 1 && index !== spacerIndex ? (
                  <Spacer line={index} />
                ) : null} */}
              </div>
            )}
          </div>
        ))}
      </NavbarStyles.List>
    </nav>
  );
};
