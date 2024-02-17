import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { app } from "@/firebase";
import { useAppContext } from "@/contexts/AppContext";
import * as apiClient from "../api-client";

export const GoogleAuth = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();

  const mutation = useMutation(apiClient.signInWithGoogle, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      mutation.mutate(userData);
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="flex items-center gap-2 bg-white p-1 mt-5 font-bold  hover:bg-sky-600 hover:text-white "
    >
      <span className="p-1 bg-white md:p-2">
        <FcGoogle size={25} />
      </span>
      <span className="pr-2"> Sing in with Google</span>
    </button>
  );
};
