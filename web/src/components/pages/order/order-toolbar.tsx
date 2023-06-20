import { useMemo } from "react";
import { ROLE } from "@/constants";
import { Tab, Tabs } from "@mui/material";
import { useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "react-router-dom";
import { ORDER_TABS } from "@/constants/enum/order";
import { BasicToolbar, DatePicker } from "@/components/common";
import SearchUsersWithUrl from "../users/search-users-with-url";

type Props = {};

const tabs: string[] = Object.values(ORDER_TABS);

export default function OrderToolbar({}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { user } = useAppSelector((state) => state.auth);

  const value = useMemo(() => {
    const status = searchParams.get("status");
    if (status) {
      return tabs.includes(status) ? status : tabs[0];
    }
    return tabs[0];
  }, [searchParams.get("status")]);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setSearchParams((prev) => {
      prev.set("status", newValue);
      return prev;
    });
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {tabs.map((label, index) => (
          <Tab key={index} label={label} value={label} />
        ))}
      </Tabs>
      <BasicToolbar placeholder="Search Order" title="Orders List">
        {user.role === ROLE.ADMIN && (
          <SearchUsersWithUrl role={ROLE.WHOLESELLER} />
        )}
        <DatePicker label="Start date" urlKey="startDate" />
        <DatePicker label="End date" urlKey="endDate" />
      </BasicToolbar>
    </>
  );
}
