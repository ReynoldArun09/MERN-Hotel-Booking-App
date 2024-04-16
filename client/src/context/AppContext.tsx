import { BASE_URL } from "@/main";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";


export type AppContextType = {
  isLoggedIn: boolean;

};



export const AppContext = createContext<AppContextType | undefined>(undefined);



export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError } = useQuery({
    queryKey: ["ValidateToken"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/user/validate-user`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Validation failed");
      }

      return response.json();
    },
    retry: false,
  });



  return (
    <AppContext.Provider value={{ isLoggedIn: !isError}}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context as AppContextType;
};
