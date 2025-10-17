'use client';
import { useContext } from "react";
import { TapDataType, TapType } from "../layout";
import { TapContext } from "../Provider";

export default function TapPage() {
    const tapContext = useContext<TapDataType>(TapContext);
    
    return (
        <>  
            {tapContext.taps.length}
            {
                tapContext.taps.map((tap: TapType, index: number) => {
                    return (
                        <div key={tap.id} style={{display: index === tapContext.selectTap ? 'block' : 'none'}}>
                            {tap.component}
                        </div>
                    )
                })
            }
        </>
    )
}