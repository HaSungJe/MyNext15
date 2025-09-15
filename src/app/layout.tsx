'use client';
import { useEffect, useState } from "react";
import { UserInfoType, UserProfileType } from "@/types/user";
import { getAccessToken } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import LayoutProvider from "./LayoutProvider";
import Loading from "@/components/Loading";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [accessToken, setAccessToken] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);

    // 페이지 시작
    useEffect(() => {
        const fetch = async () => {
            const accessToken = await getAccessToken();
            if (accessToken) {
                setAccessToken(accessToken);
            }
            setLoading(false);
        }


        // // 로그인이 되어있다고 가정하기
        // setAccessToken(new Date().getTime().toString());

        // setUserInfo({
        //     user_id: 'asdf1234',
        //     name: '김테스트',
        //     age: 30
        // });

        // setUserProfile({
        //     tel: '010-0000-0000',
        //     email: 'asdf@naver.com',
        //     push_receive_yn: 'Y'
        // });

        fetch();
    }, []);

    // AccessToken 재발급하기
    async function accessTokenRefresh(): Promise<void> {
        const accessToken = await getAccessToken();
        if (accessToken) {
            setAccessToken(accessToken);
        } else {
            setAccessToken(null);
        }
    }

    return (
        <html lang="ko">
            <body>
                <LayoutProvider accessData={{accessToken, accessTokenRefresh}} userInfo={userInfo} userProfile={userProfile}>
                    {
                        loading ?
                        <Loading />
                        :
                        <>
                            {children}
                        </>
                    }
                </LayoutProvider>
            </body>
        </html>
    );
}
