import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import UserForm from "./components/UserForm";
import { useState, useEffect } from "react";

function App() {
  const { user } = useUser();
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    if (user) {
      checkUserExists(user.id);
    }
  }, [user]);

  const checkUserExists = async (clerkId) => {
    const response = await fetch(
      `http://localhost:5000/api/checkUser/${clerkId}`
    );
    const data = await response.json();
    if (data.exists) {
      setUserExists(true);
    }
  };

  const handleUserSubmit = async (formData) => {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        clerkId: user.id,
        email: user.primaryEmailAddress.emailAddress,
      }),
    });
    const data = await response.json();
    if (data.message === "User exists" || data.message === "User created") {
      setUserExists(true);
    }
  };

  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
          {user && user.id && !userExists && (
            <UserForm clerkId={user.id} onSubmit={handleUserSubmit} />
          )}
        </SignedIn>
      </header>
    </>
  );
}

export default App;
