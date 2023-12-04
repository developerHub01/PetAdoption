import { createContext, useEffect, useState } from "react";
import auth from "../firebase/config";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import useAxiosPublic from "../AxiosInstance/useAxiosPublic";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userProfileImage, setUserProfileImage] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  const publicAxios = useAxiosPublic();

  const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signOutUser = () => {
    return signOut(auth);
  };

  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const facebookProvider = new FacebookAuthProvider();
  const facebookSignIn = () => signInWithPopup(auth, facebookProvider);

  useEffect(() => {
    const userStatus = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUserLoading((prev) => false);
      if (currentUser) {
        setUser((prev) => currentUser);
        setUserProfileImage((prev) => currentUser?.photoURL);
        publicAxios
          .post("/setJwt", loggedUser)
          .then((res) => localStorage.setItem("token", res.data.token));
      } else {
        setUser((prev) => null);
        localStorage.removeItem("token");
      }
    });
    return () => userStatus();
  }, [userLoading]);

  const authInfo = {
    user,
    setUser,
    userProfileImage,
    setUserProfileImage,
    userLoading,
    signUpUser,
    signInUser,
    signOutUser,
    googleSignIn,
    facebookSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
