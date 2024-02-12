import * as React from "react";
import { useContext, useState } from "react";

import { ToastMessage } from "../common/types/toast";
import { AppContext } from "../common/types/context";
import Toast from "@/components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const [isError, setIsError] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { error } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
    onSuccess: () => {
      setIsError(false);
      setIsLoading(false);
    },
    onError: () => {
      setIsError(true);
      setIsLoading(false);
    },
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        stripePromise,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
