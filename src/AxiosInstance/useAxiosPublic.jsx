import axios from "axios";
import { serverApi } from "../constant/constant";
const instance = axios.create({
  baseURL: serverApi,
});
const useAxiosPublic = () => {
  return [instance];
};

export default useAxiosPublic;
