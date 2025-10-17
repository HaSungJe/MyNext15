'use client';
import { useContext } from "react";
import { TapContext } from "./Provider";
import { TapDataType } from "./page";
import TapList from "./TapList";

type ParamsProps = {
    params: Record<string, string>;
}

export default function TapView({params}: ParamsProps) {
    const tapContext = useContext<TapDataType>(TapContext);

    return (
        <>
            searchVal: {params?.searchVal}
            상세페이지입니다.
            <br/><br/>

            <button
                type="button"
                onClick={() => tapContext.onMovePage('목록페이지', <TapList params={params}/>)}
            >목록페이지로 이동</button>

            <hr />
        </>
    )
}