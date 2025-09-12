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