"use client";

import { createAppStore } from "@/lib/store/store";
// import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

const ErrorComponent = ({ errorMessage }: { errorMessage: string|null }) => (
  <div className="text-red-500 font-bold text-center">{errorMessage}</div>
);

const CommonLoading = () => (
  <div className="text-blue-500 font-bold text-center">Loading...</div>
);

export default function AuthProvider({ children }: { children: React.ReactNode }) {

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStore = async () => {
      try{
        const appStore = await createAppStore();
        setStore(appStore);
      }catch(error: any){
        setError(`Error initializing the app: ${error.message}`)
      }finally{
        setLoading(false);
      }
    };
    initializeStore();
  }, []);

  if(loading || error){
    return (
      <div>
        {loading ?<CommonLoading/>: <ErrorComponent errorMessage={error}/>}
      </div>
    )
  }

  return <Provider store = {store}>{children}</Provider>;
}