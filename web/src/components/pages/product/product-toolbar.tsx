import { ROLE } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { BasicToolbar, SelectPublic } from "@/components/common";
import SearchUsersWithUrl from "@components/pages/users/search-users-with-url";

type Props = {};

export default function ProductToolBar({}: Props) {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <BasicToolbar
      placeholder="Search Product"
      title="Product List"
      className="flex flex-row"
    >
      <SelectPublic />
      {user.role === ROLE.ADMIN && (
        <SearchUsersWithUrl role={ROLE.WHOLESELLER} className="max-w-40" />
      )}
    </BasicToolbar>
  );
}
