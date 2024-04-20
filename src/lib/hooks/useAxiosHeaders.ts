import useSessionStorage from "./useSessionStorage";

const useAxiosHeaders = () => {
  const token = useSessionStorage("auth");
  return {
    Authentication: token,
  };
};

export default useAxiosHeaders;
