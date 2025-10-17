'use client';
import { useEffect, useRef, useState } from "react";
import dayjs from 'dayjs';

type TimerProps = {
    time: string;
    closeFunc?: Function;
}

export default function Timer({time, closeFunc}: TimerProps) {
    const [text, setText] = useState('00:00');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(createText, 300);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [time]);

    // 시간 정보 생성
    function createText() {
        const timoutDayjs = dayjs(time).diff(dayjs(), 'second');
        if (timoutDayjs >= 0) {
            const miunte = Math.floor(timoutDayjs / 60).toString().padStart(2, '0');
            const second = Math.floor(timoutDayjs % 60).toString().padStart(2, '0');
            setText(`${miunte}:${second}`);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            if (closeFunc) {
                closeFunc();
            }
        }
    }

    return (
        <span style={{padding: '5px'}}>{text}</span>
    )
}