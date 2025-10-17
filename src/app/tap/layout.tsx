'use client';
import React, { JSX, useCallback, useState } from "react";
import TapList from "./list/page";
import TapProvider from "./Provider";

// Tap
export type TapType = {
    id: number;
    title: string;
    component: JSX.Element;
}

// Provider
export type TapDataType = {
    selectTap: number;
    setSelectTap: Function;
    taps: Array<TapType>;
    setTaps: Function;
    onAddTap: Function;
    onDeleteTap: Function;
    onMovePage: Function;
}

export default function TapLayout({ children }: { children: React.ReactNode }) {
    const [selectTap, setSelectTap] = useState<number>(0);
    const [taps, setTaps] = useState<Array<TapType>>([]);

    // 탭 추가
    const onAddTap = useCallback((title: string, component: JSX.Element) => {
        setSelectTap(taps.length);
        setTaps([...taps, {id: new Date().getTime(), title, component: React.cloneElement(component, {key: Date.now()})}]);
    }, [taps])

    // 탭 삭제
    const onDeleteTap = useCallback((index: number) => {
        setTaps(taps.filter((_, componentIndex: number) => index !== componentIndex));
        if (index === selectTap) {
            setSelectTap(0);
        }
    }, [selectTap, taps]);

    // 페이지 이동
    const onMovePage = useCallback((title: string, component: JSX.Element) => {
        const newTaps = [...taps];
        newTaps[selectTap] = {
            id: new Date().getTime(),
            title,
            component: React.cloneElement(component, {key: Date.now()})
        }
        setTaps([...newTaps]);
    }, [selectTap, taps]);

    return (
        <>
            {/* 탭 및 메뉴 목록 */}
            <hr />
            <button type="button" onClick={() => onAddTap('목록페이지', <TapList params={{}}/>)}>목록페이지 열기</button>
            <br />
            {
                taps.map((tap: TapType, index: number) => {
                    if (tap) {
                        return (
                            <div key={`tap-${tap.title}-${index}`} style={{backgroundColor: index === selectTap ? 'red' : ''}}>
                                <button type="button" onClick={() => setSelectTap(index)}>{tap.title} ({index})</button>
                                <button type="button" onClick={() => onDeleteTap(index)}>X</button>
                            </div>
                        )
                    }
                })
            }
            <hr />
            <TapProvider tapData={{selectTap, setSelectTap, taps, setTaps, onAddTap, onDeleteTap, onMovePage}}>
                {children}
            </TapProvider>
        </>
    )
}