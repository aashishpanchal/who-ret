import { FiHome } from "react-icons/fi";
import { GrAmazon } from "react-icons/gr";
import { LuScanFace } from "react-icons/lu";
import { AiFillShop } from "react-icons/ai";
import type { LinkItemsProps } from "./types";
import { BiRadioCircle } from "react-icons/bi";
import { BsJournalBookmark } from "react-icons/bs";
import { FaShoppingBag, FaList, FaUsers } from "react-icons/fa";

export const adminNavList: LinkItemsProps = [
  { title: "Dashboard", icon: FiHome, href: "/admin" },
  {
    title: "Sellers",
    icon: AiFillShop,
    href: "/admin/sellers?page=0&size=10",
  },
  {
    title: "Kyc",
    icon: LuScanFace,
    href: "/admin/kyc?page=0&size=10",
  },
  {
    title: "Retailers",
    icon: FaUsers,
    href: "/admin/retailers?page=0&size=10",
  },
  {
    title: "Banner",
    icon: GrAmazon,
    href: "/admin/banners?page=0&size=10",
  },
  {
    title: "Categories",
    icon: FaList,
    href: "/admin/categories?page=0&size=10",
  },
  {
    title: "Products",
    icon: FaShoppingBag,
    baseUrl: "/admin/products",
    child: [
      {
        title: "List",
        icon: BiRadioCircle,
        href: "?page=0&size=10",
      },
      {
        title: "Add",
        icon: BiRadioCircle,
        href: "/add",
      },
    ],
  },
  {
    title: "Orders",
    icon: BsJournalBookmark,
    href: "/admin/orders",
  },
];

export const wholesellerNavList: LinkItemsProps = [
  { title: "Dashboard", icon: FiHome, href: "/admin" },
  {
    title: "Banner",
    icon: GrAmazon,
    href: "/admin/banners?page=0&size=10",
  },
  {
    title: "Categories",
    icon: FaList,
    href: "/admin/categories?page=0&size=10",
  },
  {
    title: "Products",
    icon: FaShoppingBag,
    baseUrl: "/admin/products",
    child: [
      {
        title: "List",
        icon: BiRadioCircle,
        href: "?page=0&size=10",
      },
      {
        title: "Add",
        icon: BiRadioCircle,
        href: "/add",
      },
    ],
  },
  {
    title: "Orders",
    icon: BsJournalBookmark,
    href: "/admin/orders",
  },
];
