'use client';
import { UserInfoType, UserProfileType } from "@/types/user";
import { useContext } from "react";
import { UserContext, UserProfileContext } from "./Provider";

export default function Home() {
    // 회원정보
    const userInfo: UserInfoType = useContext(UserContext);
    const userProfile: UserProfileType = useContext(UserProfileContext);

    return (
        <div>
            메인화면

            <hr />
            로그인 정보<br />
            아이디: {userInfo?.user_id}<br />
            이름: {userInfo?.name}<br />
            나이: {userInfo?.age}<br />

            <br />
            연락처: {userProfile?.tel}<br />
            이메일: {userProfile?.email}<br />
            알림 수신여부: {userProfile?.push_receive_yn}
        </div>
    );
}
