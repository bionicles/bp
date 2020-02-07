import fetch from "unfetch";
import useSWR from "swr";

const fetcher = async path => {
  const res = await fetch(process.env.HOST + path);
  return await res.json();
};

export const useApi = path => useSWR(path, fetcher);
