import { IconType } from "react-icons/lib";

export interface LinkItemProps {
  title: string;
  icon: IconType;
  href?: string;
  baseUrl?: string;
  child?: LinkItemProps[];
}

export type LinkItemsProps = Array<LinkItemProps>;

export type SubMenusItem = {
  name: string;
  icon: IconType;
  menus: string[];
};
