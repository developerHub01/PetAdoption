import { createContext, useEffect, useState } from "react";
import auth from "../firebase/config";
import { serverApi } from "../constant/constant";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userProfileImage, setUserProfileImage] = useState({});
  const [userLoading, setUserLoading] = useState(true);

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
        fetch(`${serverApi}/setJwt`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("token", data.token);
          })
          .catch((error) => {
            console.log(error.message);
          });
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
