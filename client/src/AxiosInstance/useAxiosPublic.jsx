import axios from "axios";
import { serverApi } from "../constant/constant";
const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: serverApi,
  });
  return instance;
};

export default useAxiosPublic;
