import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../AxiosInstance/useAxiosPublic";

const useFetchCampaignList = (numberOfUser) => {
  let searchQuery = `/campaign?donationStatusActive=${true}`;
  if (numberOfUser) searchQuery += `&numberOfUser=${numberOfUser}`;
  const publicAxios = useAxiosPublic();
  const response = useQuery({
    queryKey: ["pets", numberOfUser],
    queryFn: () =>
      publicAxios.get(searchQuery).then((res) => {
        return res.data;
      }),
  });
  return response;
};

export default useFetchCampaignList;
