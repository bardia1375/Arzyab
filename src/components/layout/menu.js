import Plus from "assets/images/header/foo-plus.svg";

const featureData = [
  {
    id: 1,
    text: "کارمندان",
    route: "/employees/list",
    link: "/employees",
    bg: "linear-gradient(262deg, #F5F5F5 0%, #E9E9E9 100%)",
    color: "#183573",
    border: true,
    icon: Plus,

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
  },
];

export default featureData;
