import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../AxiosInstance/useAxiosPrivate";
import Loader from "../components/Loader";

const useTotalCost = ({ email }) => {
  console.log(email);
  const axiosPrivate = useAxiosPrivate();
  const response = useQuery({
    queryKey: ["totalCost", email],
    queryFn: () => axiosPrivate.get(`/donate/${email}`).then((res) => res.data),
  });
  // if (isLoading) return <Loader />;

  console.log(response);

  // return data.reduce((acc, curr) => acc + curr, 0);
};

export default useTotalCost;
