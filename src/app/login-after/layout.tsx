'use client';

import { AccessDataType } from "@/types/user";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../LayoutProvider";
import Loading from "@/components/tLoading";

export default function LoginAfterLayout({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const loginData: AccessDataType = useContext(LoginContext);
    
    // 로그인이 되어있지 않은 경우, 로그인 페이지로 이동
    useEffect(() => {
        if (loginData?.accessToken) {
            setLoading(false);
        } else {
            router.push('/login');
        }
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <>
                {children}
            </>
        )
    }
}