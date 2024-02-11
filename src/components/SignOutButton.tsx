import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

type Props = {
  fontSize?: string;
  toggleMenu?: () => void;
};

export const SignOutButton = ({ fontSize, toggleMenu }: Props) => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    if (toggleMenu) {
      toggleMenu();
    }
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className={`py-3 px-6 text-${fontSize} text-sky-600 font-bold bg-white hover:bg-sky-100`}
    >
      Sign Out
    </button>
  );
};
