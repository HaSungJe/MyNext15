'use client';
import React, { JSX, useState } from "react";
import TapList from "./TapList";
import TapProvider from "./Provider";

// Tap
export type TapType = {
    id: number;
    title: string;
    component: JSX.Element;
}

// Provider
export type TapDataType = {
    onMovePage: Function;
}

export default function TapPage() {
    const [selectTap, setSelectTap] = useState<number>(0);
    const [taps, setTaps] = useState<Array<TapType>>([]);

    // 탭 추가
    function onAddTap(title: string, component: JSX.Element) {
        setSelectTap(taps.length);
        setTaps([...taps, {id: new Date().getTime(), title, component: React.cloneElement(component, {key: Date.now()})}]);
    }

    // 탭 삭제
    function onDeleteTap(index: number) {
        setTaps(taps.filter((_, componentIndex: number) => index !== componentIndex));
        setSelectTap(prev => prev === index ? 0 : (prev > index ? prev - 1 : prev));
    }

    // 페이지 이동
    function onMovePage(title: string, component: JSX.Element) {
        const newTaps = [...taps];
        newTaps[selectTap] = {
            id: new Date().getTime(),
            title,
            component: React.cloneElement(component, {key: Date.now()})
        }
        setTaps([...newTaps]);
    }
    
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

            {taps.length}
            <TapProvider tapData={{onMovePage}}>
                {
                    taps.map((tap: TapType, index: number) => {
                        return (
                            <div key={tap.id} style={{display: index === selectTap ? 'block' : 'none'}}>
                                {tap.component}
                            </div>
                        )
                    })
                }
            </TapProvider>
        </>
    )
}