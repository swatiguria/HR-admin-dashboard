import applications from "../../assets/sideBar/applications.svg";
import payroll from "../../assets/sideBar/payroll.svg";
import reports from "../../assets/sideBar/reports.svg";
import performance from "../../assets/sideBar/performance.svg";
import termination from "../../assets/sideBar/termination.svg";
import jobs from "../../assets/sideBar/jobs.svg";
import activity from "../../assets/sideBar/activity.svg";
import overview from "../../assets/sideBar/overview.svg";
import employees from "../../assets/sideBar/employees.svg";
import settings from "../../assets/sideBar/settings.svg";
import activityActive from "../../assets/sideBar/Chartactive.svg";
import employeesActive from "../../assets/sideBar/employeesactive.svg";
import activeSettings from "../../assets/sideBar/activeSettings.svg";
import { useSelector } from "react-redux";

export const SideBarLogic = () => {
  const { userInfo } = useSelector((state) => state.signInUser);

  const sideBarLinkData = [
    {
      icon: overview,
      text: "Overview",
      path: "/dashboard/employee/overview",
    },
    {
      icon: applications,
      text: "Applications",
      path: "/dashboard/employee/overview",
    },
    {
      icon: employees,
      activeIcon: employeesActive,
      text: "Employee",
      path: "/dashboard/employee",
      sublist: [
        userInfo?.role?.includes("admin")
          ? {
              text: "Overview",
              path: "/dashboard/employee/overview",
            }
          : {
              text: "Profile",
              path: `/dashboard/employee/profile/${userInfo?._id}`,
            },
        {
          text: "Holidays",
          path: "/dashboard/employee/holidays",
        },
        userInfo?.role?.includes("TL")
          ? {
              text: "My Team",
              path: "/dashboard/employee/list",
            }
          : {},
        userInfo?.role?.includes("admin")
          ? {
              text: "My Leaves",
              path: "/dashboard/employee/my-leaves",
            }
          : {},
        {
          text: userInfo?.role?.includes("admin")
            ? "Employee Leaves"
            : "My Leaves",
          path: "/dashboard/employee/leaves",
        },
        userInfo?.role?.includes("admin")
          ? {
              text: "Leave Settings",
              path: "/dashboard/employee/leaves-settings",
            }
          : {},
      ],
    },
    {
      icon: settings,
      activeIcon: activeSettings,
      text: "Settings",
      path: "/dashboard/settings",
      sublist: [
        userInfo?.role?.includes("admin")
          ? {
              text: "Department",
              path: "/dashboard/settings/department",
            }
          : {},
        userInfo?.role?.includes("admin")
          ? {
              text: "Company Settings",
              path: "/dashboard/settings/company-settings",
            }
          : {
              text: "Company Policies",
              path: "/dashboard/settings/company-policies",
            },
      ],
    },
    {
      icon: activity,
      activeIcon: activityActive,
      text: "Activity",
      path: "/dashboard/activity/system-logs",
      sublist: [
        {
          text: "System Logs",
          path: "/dashboard/activity/system-logs",
        },
      ],
    },
    {
      icon: payroll,
      text: "Payroll",
      path: "/dashboard/employee/overview",
    },
    {
      icon: reports,
      text: "Reports",
      path: "/dashboard/employee/overview",
    },
    {
      icon: performance,
      text: "Performance",
      path: "/dashboard/employee/overview",
    },
    {
      icon: termination,
      text: "Termination",
      path: "/dashboard/employee/overview",
    },
    {
      icon: jobs,
      text: "Jobs",
      path: "/dashboard/employee/overview",
    },
  ];

  return {
    sideBarLinkData,
  };
};
