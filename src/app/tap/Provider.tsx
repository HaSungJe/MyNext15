'use client';
import { createContext } from "react";
import { TapDataType } from "./layout";

// Props
type TapProviderProps = {
    children: React.ReactNode;
    tapData: TapDataType;
}

// Context
export const TapContext = createContext<TapDataType | null>(null);

export default function TapProvider({children, tapData}: TapProviderProps) {
    return (
        <TapContext.Provider value={tapData}>
            {children}
        </TapContext.Provider>
    )
}