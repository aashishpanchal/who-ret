import useUrlQuery from "@/hooks/useUrlQuery";
import { useQuery } from "@tanstack/react-query";
import { getAllBannerFn } from "@/http/apis/banner-api";
import { Container, Stack, Typography } from "@mui/material";
import BannerDataTable from "@/components/pages/banner/banner-data-table";
import AddEditBanner from "@/components/pages/banner/add-edit-banner";

type Props = {};

export default function Banners({}: Props) {
  const { query } = useUrlQuery();

  const { isLoading, refetch, data } = useQuery({
    queryKey: ["banner-list", query],
    queryFn: async () => (await getAllBannerFn(query)).data,
  });

  return (
    <Container className="mt-10">
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography variant="h5">Banner</Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <AddEditBanner variant="add" refetch={refetch} />
        </Stack>
      </Stack>
      <BannerDataTable isLoading={isLoading} refetch={refetch} data={data} />
    </Container>
  );
}
