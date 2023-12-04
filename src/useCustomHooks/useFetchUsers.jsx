import { useQuery } from "@tanstack/react-query";
import { serverApi } from "../constant/constant";

const useFetchUsers = () => {
  const response = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch(`${serverApi}/users`).then((res) => res.json()),
  });
  return response;
};

export default useFetchUsers;
