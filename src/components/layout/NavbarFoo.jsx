/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";

// Components
import { NavDropContainer } from "components/common";
import { NavbarFooItem } from "components/header/NavbarFooItem";

// Styled Elemnets
import { NavbarFooStyles } from "assets/styles/layout";

// Images
import Dots from "assets/images/header/dots.svg";
import Minus from "assets/images/header/foo-minus.svg";
import Plus from "assets/images/header/foo-plus.svg";
import featureData from "./menu";
import { useNavigate } from "react-router-dom";

export const NavbarFoo = ({
  getItems,
  navbarItems,
  isShown,
  setIsShown,
  setIndexNavbar,
}) => {
  const [Data, setDate] = useState(featureData);

  const handleToggle = () => setIsShown((prevState) => !prevState);
  const Navigate = useNavigate();
  const handleChangeIcon = (index) => {
    // setpPlusIcon(!plusIcon);
    // Data[index].bg = "green";
    if (navbarItems.length < 5) {
    }
    const duplicateItem = Data.filter((el) => el?.id - 1 == index);

    if (
      duplicateItem[0].bg ==
        "linear-gradient(262deg, #F5F5F5 0%, #E9E9E9 100%)" &&
      navbarItems.length < 5
    ) {
      Data[index].bg = "#183573";
      Data[index].border = false;
      Data[index].icon = Minus;
      Data[index].color = "linear-gradient(262deg, #F5F5F5 0%, #E9E9E9 100%)";
    } else {
      Data[index].bg = "linear-gradient(262deg, #F5F5F5 0%, #E9E9E9 100%)";
      Data[index].color = "#183573";
      Data[index].border = true;
      Data[index].icon = Plus;
    }

    setDate([...Data]);
  };
  // first useEffect for persisit items of navbar when refresh page
  useEffect(() => {
    if (Data !== null) {
      setDate(JSON.parse(localStorage.getItem("Data")));
    }
  }, [featureData]);
  // second useEffect for persisit items of navbar when refresh page
  useEffect(() => {
    if (Data !== null) {
      window.localStorage.setItem("Data", JSON.stringify(Data));
    } else {
      setDate(JSON.parse(localStorage.getItem("Data")));
    }
  }, [Data]);
  //second useEffect for persisit items of navbar when refresh page
  // useEffect(() => {
  //   if (Data !== null) {
  //     window.localStorage.setItem("Data", JSON.stringify(Data));
  //   } else {
  //     setDate(JSON.parse(localStorage.getItem("Data")));
  //   }
  // }, [Data]);

  const getItemsnavbar = (item) => {
    Navigate(item?.route);
    // return getItems({
    //   text: item.text,
    //   id: item?.id,
    //   link: item?.link,
    //   route: item?.route,
    //   innerDrop: item.innerDrop,
    // });
  };

  const featureElements = Data?.map((item, idx) => (
    <div key={item.id}>
      <NavbarFooItem
        index={idx}
        id={item.id}
        key={idx}
        text={item.text}
        icon={item.icon}
        handleChangeIcon={handleChangeIcon}
        bg={item.bg}
        color={item.color}
        border={item.border}
        innerDrop={item.innerDrop}
        item={item}
        getItems={getItems}
        setIsShown={setIsShown}
        setIndexNavbar={setIndexNavbar}
        navbarItems={navbarItems}
      />
    </div>
  ));

  return (
    <NavbarFooStyles.Container>
      <NavbarFooStyles.Dots onClick={handleToggle} src={Dots} alt="Dots" />
      {isShown && (
        <NavDropContainer setIsShown={setIsShown} isShown={isShown}>
          <NavbarFooStyles.GridSys>{featureElements}</NavbarFooStyles.GridSys>
        </NavDropContainer>
      )}
    </NavbarFooStyles.Container>
  );
};
