import { getAuth, onAuthStateChanged } from "firebase/auth";

import { auth as Auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    // console.log(uid);
  }
});

function SignOut() {
  Auth.signOut();
  localStorage.removeItem("token");
}

export { SignOut };
