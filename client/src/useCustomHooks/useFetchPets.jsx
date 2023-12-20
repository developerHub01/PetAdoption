import { useQuery } from "@tanstack/react-query";
import { serverApi } from "../constant/constant";

const useFetchPets = () => {
  const response = useQuery({
    queryKey: ["pets"],
    queryFn: () => fetch(`${serverApi}/pet`).then((res) => res.json()),
  });
  return response;
};

export default useFetchPets;
