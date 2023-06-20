import { useState } from "react";
import List from "@mui/material/List";
import { LinkItemsProps } from "../types";
import { NavLink } from "react-router-dom";
import { FaExpandAlt } from "react-icons/fa";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import ListItemButton from "@mui/material/ListItemButton";

export default function nav(linkList: LinkItemsProps, baseUrl?: string) {
  return linkList.flatMap((link, index) => {
    const [open, setOpen] = useState(false);
    if (link.child) {
      return (
        <List key={index} component="nav" sx={{ m: 0, p: 0 }}>
          <Tooltip
            title={link.title.length > 15 ? link.title : undefined}
            placement="top"
          >
            <ListItem sx={{ m: 0, p: 0 }}>
              <span className="w-full mr-3 rounded-r-full overflow-hidden ">
                <ListItemButton
                  onClick={() => setOpen(!open)}
                  className="flex items-center justify-center gap-x-4"
                  sx={{ px: 3 }}
                >
                  <link.icon size={30} className="text-gray-300" />
                  <p
                    className={`w-full font-Poppins text-gray-300 whitespace-pre`}
                  >
                    {link.title.length > 10
                      ? link.title.slice(0, 15) + "...."
                      : link.title}
                  </p>
                  <FaExpandAlt className="text-gray-300" size={25} />
                </ListItemButton>
              </span>
            </ListItem>
          </Tooltip>
          <Collapse in={open} timeout="auto">
            {nav(link.child, link?.baseUrl as string)}
          </Collapse>
        </List>
      );
    } else {
      return (
        <Tooltip
          title={link.title.length > 15 ? link.title : undefined}
          placement="top"
          key={index}
        >
          <ListItem key={index} sx={{ m: 0, p: 0 }}>
            <NavLink
              end
              to={(baseUrl ? baseUrl + link.href : link.href) as string}
              className={({ isActive }) =>
                `w-full mr-3 rounded-r-full overflow-hidden text-gray-300 ${
                  isActive &&
                  "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                }`
              }
            >
              {({ isActive }) => (
                <ListItemButton
                  className="flex items-center justify-center gap-x-4"
                  sx={{ px: 3 }}
                >
                  <link.icon
                    size={25}
                    className={`${isActive ? "text-white" : "text-gray-300"}`}
                  />
                  <p
                    className={`w-full font-Poppins ${
                      isActive && "text-white"
                    } whitespace-pre`}
                  >
                    {link.title.length > 10
                      ? link.title.slice(0, 15) + "...."
                      : link.title}
                  </p>
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        </Tooltip>
      );
    }
  });
}
