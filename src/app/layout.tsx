'use client';
import { useEffect, useState } from "react";
import { UserInfoType, UserProfileType } from "@/types/user";
import LayoutProvider from "./LayoutProvider";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    const [accessToken, setAccessToken] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);

    // 페이지 시작
    useEffect(() => {
        // 로그인이 되어있다고 가정하기
        setAccessToken(new Date().getTime().toString());

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

    // AccessToken 재발급하기
    async function accessTokenRefresh(): Promise<void> {
        setAccessToken(new Date().getTime().toString());
    }

    return (
        <html lang="ko">
            <body>
                <LayoutProvider accessData={{accessToken, accessTokenRefresh}} userInfo={userInfo} userProfile={userProfile}>
                    {children}
                </LayoutProvider>
            </body>
        </html>
    );
}
