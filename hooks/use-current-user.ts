import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
    const session = useSession();

    return session.data?.user;
}

/*
import { ExtendedUser } from "@/next-auth";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<ExtendedUser | null>(null);
  
    useEffect(() => {
      const updateSession = async () => {
        if (status === "authenticated" && session?.user) {
          const freshSession = await getSession();
          setUser(freshSession?.user as ExtendedUser || null);
        } else {
          setUser(null);
        }
      };
  
      updateSession();
    }, [status, status]);
  
    return status !== "loading" ? user : null;
}*/