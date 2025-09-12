// 로그인 및 재발급 함수 정보
export type AccessDataType = {
    accessToken: string;
    accessTokenRefresh: Function;
}

// 회원정보
export type UserInfoType = {
    user_id: string;
    name: string;
    age: number;
}

// 회원 프로필
export type UserProfileType = {
    tel: string;
    email: string;
    push_receive_yn: 'Y' | 'N';
}