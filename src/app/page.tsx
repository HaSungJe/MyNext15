'use client';
import { AccessDataType } from "@/types/user";
import { useContext, useEffect } from "react";
import { LoginContext } from "./LayoutProvider";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const loginData: AccessDataType = useContext(LoginContext);
    
    useEffect(() => {
        if (loginData?.accessToken) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    }, []);
}
