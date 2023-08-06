"use client";
import { initAuth } from "@/firebase/clientApp";
import ProfileComponent from "./components/ProfileComponent";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Loading from "../rankings/loading";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Profile() {
  const auth = initAuth();
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loading />;
  }
  if (user) {
    return <ProfileComponent user={user} />;
  }
  if (!user) {
    return (
      <div className="flex mt-5 flex-col place-items-center 2xl:grid 2xl:grid-cols-2 gap-5 justify-center drop-shadow-md">
        <Login />
        <Register />
      </div>
    );
  }
}
