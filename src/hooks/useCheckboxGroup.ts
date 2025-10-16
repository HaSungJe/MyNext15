'use client';
import { useCallback, useEffect, useState } from "react";

export type UseCheckboxGroupType = {
    isAllSelected: boolean;
    selected: Array<string | number>;
    toggle: Function;
    toggleAll: Function;
}

// 체크박스 체크/체크해제
export default function useCheckboxGroup(list: Array<any>, key: string): UseCheckboxGroupType {
    const [isAllSelected, setIsAllSelected] = useState<boolean>(false); // 전체 선택여부
    const [selected, setSelected] = useState<Array<string | number>>([]); // 선택된 값

    // 목록 변경시, 선택값 초기화
    useEffect(() => {
        setIsAllSelected(false);
        setSelected([]);
    }, [list]);

    // 선택/선택해제
    const toggle = useCallback((id: string | number) => {
        if (selected.includes(id)) {
            setIsAllSelected(false);
            setSelected(selected.filter((e: string | number) => e !== id));
        } else {
            setIsAllSelected(list.length === selected.length ? true : false);
            setSelected([...selected, id]);
        }
    }, []);

    // 전체 선택/선택해제
    const toggleAll = useCallback(() => {
        if (isAllSelected) {
            setSelected([]);
        } else {
            setSelected(list.map((e: any) => e[key]));
        }
    }, []);

    return { isAllSelected, selected, toggle, toggleAll }
}