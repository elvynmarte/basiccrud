import {
  VscAccount,
  VscSettingsGear,
  VscListTree,
  VscListSelection,
  VscSignOut,
} from "react-icons/vsc";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Dock from "./Dock";

export default function BottomNav() {
  const navi = useNavigate();
  const [itemsel, setItemsel] = useState(0);

  useEffect(() => {}, []);

  const items = [
    {
      icon: <VscListTree size={18} />,
      label: "Items",
      onClick: () => {
        navi("/items");
        setItemsel(0);
      },
      className: itemsel == 0 ? "dock-item-selected" : "",
    },
    {
      icon: <VscListSelection size={18} />,
      label: "Types",
      onClick: () => {
        navi("/types");
        setItemsel(1);
      },
      className: itemsel == 1 ? "dock-item-selected" : "",
    },
    {
      icon: <VscAccount size={18} />,
      label: "Users",
      onClick: () => {
        navi("/users");
        setItemsel(2);
      },
      className: itemsel == 2 ? "dock-item-selected" : "",
    },
    {
      icon: <VscSettingsGear size={18} />,
      label: "Settings",
      onClick: () => {
        navi("/profile");
        setItemsel(3);
      },
      className: itemsel == 3 ? "dock-item-selected" : "",
    },
    {
      icon: <VscSignOut size={18} />,
      label: "Log out",
      onClick: () => {
        const conf = confirm("Do you want to log out?");

        if (!conf) return;

        localStorage.clear();
        setItemsel(0);
        navi("/");
        window.location.href = window.location.href;
      },
    },
  ];

  return (
    <>
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </>
  );
}
