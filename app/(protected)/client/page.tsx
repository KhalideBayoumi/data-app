"use client";

import { UserInfo } from "@/components/user-info";
import { userCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";

const ClientPage = () => {
    const user = userCurrentUser();
    return ( 
        <UserInfo 
            label="🧑‍🎨 Client component"
            user={user} />
    );
}
 
export default ClientPage;