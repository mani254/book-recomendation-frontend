import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "@/components/baseLayout";

axios.defaults.withCredentials = true;

export default function MyApp({ Component, pageProps }) {
   const router = useRouter();
   const noNavbarRoutes = ["/login", "/register"];
   const isLayoutNeeded = !noNavbarRoutes.includes(router.pathname);
   const [isAuthChecked, setIsAuthChecked] = useState(false);

   useEffect(() => {
      const checkAuth = async () => {
         const authToken = localStorage.getItem("authToken");

         if (authToken) {
            try {
               const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/initial`, {}, {
                  headers: { Authorization: `Bearer ${authToken}` }
               });

               if (res.data) {
                  localStorage.setItem("authToken", res.data.authToken);
                  localStorage.setItem("isAdmin", res.data.isAdmin);
                  localStorage.setItem("username", res.data.username)
               }
            } catch (error) {
               console.error("Initial login failed:", error);
               localStorage.removeItem("authToken");
               localStorage.removeItem("isAdmin");
               localStorage.removeItem("username")
               router.push("/login");
               window.alert('login expired login again')
            }
         } else {
            router.push("/login");
         }

         setIsAuthChecked(true);
      };

      checkAuth();
   }, []);

   if (!isAuthChecked) return <div>Loading...</div>;

   return isLayoutNeeded ? (
      <BaseLayout>
         <Component {...pageProps} />
      </BaseLayout>
   ) : (
      <Component {...pageProps} />
   );
}
