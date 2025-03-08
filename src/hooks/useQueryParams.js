import { useRouter, useSearchParams } from "next/navigation";

export const useQueryParams = (defaults = {}) => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const params = new URLSearchParams(searchParams.toString());

   const getParam = (key) => params.get(key) || "";

   const setParam = (key, value) => {
      if (value) {
         params.set(key, value);
      } else {
         params.delete(key);
      }
      router.replace(`?${params.toString()}`);
   };

   const setBulk = (newParams) => {
      Object.entries(newParams).forEach(([key, value]) => {
         if (value) {
            params.set(key, value);
         } else {
            params.delete(key);
         }
      });
      router.replace(`?${params.toString()}`);
   };

   const resetParams = () => {
      const defaultParams = new URLSearchParams(defaults);
      router.replace(`?${defaultParams.toString()}`);
   };

   return { getParam, setParam, resetParams, searchParams, setBulk };
};
