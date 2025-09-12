'use client';
import { UserInfoType, UserProfileType } from "@/types/user";
import { createContext } from "react";

type ProviderProps = {
    userInfo: UserInfoType;
    userProfile: UserProfileType;
    children: React.ReactNode;
}

// Context
export const UserContext = createContext<UserInfoType | null>(null); // 회원정보
export const UserProfileContext = createContext<UserProfileType>(null); // 회원 프로필

/**
 * LayoutProvider
 * 
 * @param param0 
 * @returns 
 */
export default function LayoutProvider({userInfo, userProfile, children}: ProviderProps) {
    return (
        <UserContext.Provider value={userInfo}> {/* 회원정보 */}
            <UserProfileContext.Provider value={userProfile}> {/* 회원 프로필 */}
                {children}
            </UserProfileContext.Provider>
        </UserContext.Provider>
    )
}