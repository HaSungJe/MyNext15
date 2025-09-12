'use client';
import { useEffect, useState } from "react";
import Provider, { UserContext } from "./Provider";
import { UserInfoType, UserProfileType } from "@/types/user";
import LayoutProvider from "./Provider";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);

    // 페이지 시작
    useEffect(() => {
        // 로그인이 되어있다고 가정하기
        setUserInfo({
            user_id: 'asdf1234',
            name: '김테스트',
            age: 30
        });

        setUserProfile({
            tel: '010-0000-0000',
            email: 'asdf@naver.com',
            push_receive_yn: 'Y'
        });
    }, []);

    return (
        <html lang="ko">
            <body>
                <LayoutProvider userInfo={userInfo} userProfile={userProfile}>
                    {children}
                </LayoutProvider>
            </body>
        </html>
    );
}
