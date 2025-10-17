'use client';
import useInput, { UseInputType } from "@/hooks/useInput";
import { useContext } from "react";
import { TapContext } from "./Provider";
import { TapDataType } from "./page";
import TapView from "./TapView";

type ParamsProps = {
    params: Record<string, string>;
}

export default function TapList({params}: ParamsProps) {
    const tapContext = useContext<TapDataType>(TapContext);
    const searchVal: UseInputType = useInput(params?.searchVal ?? '');

    return (
        <>
            <input type="text" value={searchVal.value} onChange={searchVal.onChange}/>
            {params?.searchVal}
            목록페이지입니다.
            <br/><br/>

            <button
                type="button"
                onClick={() => tapContext.onMovePage('상세페이지', <TapView params={{searchVal: searchVal.value}}/>)}
            >상세페이지로 이동</button>

            <hr />
        </>
    ) 
}