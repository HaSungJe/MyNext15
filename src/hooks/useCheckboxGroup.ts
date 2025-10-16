'use client';
import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useState } from "react";

export type UseCheckboxGroupType = {
    isAllSelected: boolean;
    selected: Array<string | number>;
    toggle: ChangeEventHandler<HTMLInputElement>;
    toggleAll: ChangeEventHandler<HTMLInputElement>;
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
    const toggle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (selected.includes(event.target.dataset.id)) {
            setIsAllSelected(false);
            setSelected(selected.filter((e: string | number) => e !== event.target.dataset.id));
        } else {
            setIsAllSelected(list.length === selected.length ? true : false);
            setSelected([...selected, event.target.dataset.id]);
        }
    }, [selected]);

    // 전체 선택/선택해제
    const toggleAll = useCallback(() => {
        if (isAllSelected) {
            setIsAllSelected(false);
            setSelected([]);
        } else {
            setIsAllSelected(true);
            setSelected(list.map((e: any) => e[key]));
        }
    }, [list, isAllSelected]);

    return { isAllSelected, selected, toggle, toggleAll }
}