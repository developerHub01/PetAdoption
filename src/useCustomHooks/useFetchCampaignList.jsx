import { useQuery } from "@tanstack/react-query";
import { serverApi } from "../constant/constant";

const useFetchCampaignList = (numberOfUser) => {
  let searchQuery = `${serverApi}/campaign`;
  if (numberOfUser) searchQuery += `?numberOfUser=${numberOfUser}`;
  console.log(numberOfUser);
  const response = useQuery({
    queryKey: ["pets", numberOfUser],
    queryFn: () => fetch(searchQuery).then((res) => res.json()),
  });
  return response;
};

export default useFetchCampaignList;
