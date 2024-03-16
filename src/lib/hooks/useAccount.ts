import useSWR from "swr";
import { Account } from "@/lib/db";

const fetchAccount = async () => {
  const res = await fetch(`/api/account`);
  return res.json() as Promise<any>;
};

export const useAccount = () => {
  const { data, error, mutate, isLoading } = useSWR(
    "/api/account",
    fetchAccount
  );

  return {
    isLoading,
    mutate,
    data,
    isError: !!error,
  };
};
