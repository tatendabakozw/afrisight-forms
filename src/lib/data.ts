import { UserGroupIcon } from "@heroicons/react/24/outline";

export const nav_items = [
  { name: "Home", location: "/", id: "asldj" },
  { name: "About", location: "/about", id: "aslwwdj" },
  { name: "Contact", location: "/contact", id: "asl111dj" },
];
export const dashboard_nav = {
  sidebar: [
    {
      name: "Dashboard",
      location: "/dashboard",
      id: "asldj",
      Icon: UserGroupIcon,
    },
    {
      name: "Orders",
      location: "/dashboard/orders",
      id: "aslwwdj",
      Icon: UserGroupIcon,
    },
    {
      name: "Customers",
      location: "/dasbboard//customers",
      id: "asl111dj",
      Icon: UserGroupIcon,
    },
    {
      name: "Clients",
      location: "/dashboard/clients",
      id: "asl111dj",
      Icon: UserGroupIcon,
    },
    {
      name: "Settings",
      location: "/dashboard/settings",
      id: "asl111dj",
      Icon: UserGroupIcon,
    },
  ],
  navbar: [
    {
      name: "Home",
      location: "/dashboard",
      id: "dashboard",
      Icon: UserGroupIcon,
    },
    {
      name: "Profile",
      location: "/dashboard/profile",
      id: "asldj",
      Icon: UserGroupIcon,
    },
  ],
};
