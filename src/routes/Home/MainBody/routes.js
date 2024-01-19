// Components
import { MainBody } from "./MainBody";
import { HomePage } from "./Dashboard";
import { Request } from "./Request";
import { MyMessages } from "./MyMessages";
import { MyProfile } from "./MyProfile";
import { MyTraffics } from "./MyTraffics/Container";
import { WorkReport } from "./WorkReport/Container";
import { MyWeeklyPlan } from "./MyWeeklyPlan/Container";
import { MyAssignments } from "./MyAssignments/Container";
import { MyWorker } from "./MyWeeklyPlan/MyWorker/Container";
import { MyDiagram } from "./MyDiagram/Container";
import { MyDiagramInfo } from "./MyDiagram/MyDiagramInfo/Container";
import { MyClocking } from "./MyClocking/Container";
import { SendingTimeWrapper } from "./SendingTime/Container";
import { Dashboard } from "assets/styles/home/dashboard";

const routes = {
  path: "/",
  element: <MainBody />,
  parent: "home",
  children: [

    {
      name: "profile",
      path: "/profile",
      element: <MyProfile />,
    },
    {
      name: "messages",
      path: "/messages",
      element: <MyMessages />,
    },
    {
      name: "traffics",
      path: "/",
      element: <MyProfile />,
    },

    // {
    //   name: "clocking",
    //   path: "/clocking",
    //   element: <MyClocking />,
    // },

    {
      name: "clocking",
      path: "/clocking",
      element: <MyClocking />,
    },

    // {
    //   name: "sendingTime",
    //   path: "/sendingTime",
    //   element: <MyTraffics />,
    // },
    {
      name: "sendingTime",
      path: "/sendingTime",
      element: <SendingTimeWrapper />,
    },
    {
      name: "weeklyPlan",
      path: "/weeklyPlan",
      element: <MyWeeklyPlan />,
    },
    {
      name: "weeklyPlan",
      path: "/weeklyPlan/:id",
      element: <MyWorker />,
    },
    {
      name: "order",
      path: "/order",
      element: <MyDiagram />,
    },
    {
      name: "order",
      path: "/order",
      element: <MyDiagram />,
    },
    {
      name: "diagram",
      path: "/diagram/:id",
      element: <MyDiagramInfo />,
    },
    {
      name: "assignments",
      path: "/assignments",
      element: <MyAssignments />,
    },
    {
      name: "work_report",
      path: "/work-report",
      element: <WorkReport />,
    },
    {
      name: "list",
      path: "/home",
      element: <HomePage />,
    },
    {
      name: "request",
      path: "/request",
      element: <Request />,
    },
  ],
};

export default routes;
