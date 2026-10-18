import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import { getMe } from "./api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Turns Firebase error codes into friendly messages
export function friendlyError(err) {
  const messages = {
    "auth/email-already-in-use": "This email is already registered. Try logging in.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/invalid-credential": "Wrong email or password.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Wrong email or password.",
    "auth/too-many-requests": "Too many attempts. Try again later.",
    "auth/network-request-failed": "Network error. Check your internet.",
  };
  return messages[err.code] || err.message;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(true);

  // Runs when the page loads and every time the user logs in or out
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const me = await getMe(); // ask the server: is this user admin?
          setIsAdmin(me.isAdmin);
          setUid(me.uid);
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
        setUid("");
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signup = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
  };
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, isAdmin, uid, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
