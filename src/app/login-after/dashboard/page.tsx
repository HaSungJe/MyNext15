'use client';
import { LoginContext, UserContext, UserProfileContext } from "@/app/LayoutProvider";
import { AccessDataType, UserInfoType, UserProfileType } from "@/types/user";
import { memo, useContext } from "react";

const Home: React.FC<null> = memo(() => {
    // 회원정보
    const loginData: AccessDataType = useContext(LoginContext);
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
            알림 수신여부: {userProfile?.push_receive_yn}<br />

            <br />
            {loginData.accessToken}<br />
            <button type="button" onClick={() => loginData?.accessTokenRefresh()}>Refresh</button>
        </div>
    );
});

export default Home;
