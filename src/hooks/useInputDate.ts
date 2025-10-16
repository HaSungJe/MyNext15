import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";

export type UseInputDateType = {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    setValue: Function;
    resetValue: Function;
}

// 검색정보 변경
export default function useInput(dot: string, initValue: string = ""): UseInputDateType {
    const [value, setValue] = useState<string>(initValue);

    // 값 생성
    const onCreate = useCallback((changeValue: string) => {
        changeValue = changeValue.toString().replace(/[^0-9]/g, '');
        changeValue = changeValue && changeValue.length > 0 ? changeValue = changeValue.substring(0, 8) : changeValue;
        const year = value.substr(0, 4);
        const month = value.substr(4, 2);
        const day = value.substr(6, 2);
        return year + (month ? `${dot}${month}` : '') + (day ? `${dot}${day}` : '');
    }, []);

    // 값 변경
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(onCreate(event.target.value));
    }, []);

    // 값 초기화
    const resetValue = useCallback(() => {
        setValue(onCreate(initValue));
    }, []);

    return {value, onChange, setValue, resetValue};
}