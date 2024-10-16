import { framer, User } from "framer-plugin";
import { useEffect } from "react";
import { useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await framer.getCurrentUser();
      setUser(user);
    };
    
    getUser();
  }, []);

  return user;
};
