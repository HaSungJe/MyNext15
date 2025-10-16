'use client';
import useCheckboxGroup, { UseCheckboxGroupType } from "@/hooks/useCheckboxGroup";
import { memo, useCallback, useMemo, useState } from "react";

type DataType = {
    id: string;
    title: string;
}

const Main: React.FC<null> = memo(() => {
    // 목록
    const [reset, setReset] = useState<number>(0);

    // 목록
    const list = useMemo<Array<DataType>>(() => {
        const now = new Date().getTime().toString();
        return [
            {id: `${now}-1`, title: `제목 ${now}-1 입니다.`},
            {id: `${now}-2`, title: `제목 ${now}-1 입니다.`},
            {id: `${now}-3`, title: `제목 ${now}-3 입니다.`},
            {id: `${now}-4`, title: `제목 ${now}-4 입니다.`},
            {id: `${now}-5`, title: `제목 ${now}-5 입니다.`},
            {id: `${now}-6`, title: `제목 ${now}-6 입니다.`},
            {id: `${now}-7`, title: `제목 ${now}-7 입니다.`},
            {id: `${now}-8`, title: `제목 ${now}-8 입니다.`},
            {id: `${now}-9`, title: `제목 ${now}-9 입니다.`},
            {id: `${now}-10`, title: `제목 ${now}-10 입니다.`}
        ]
    }, [reset]);

    // 체크박스
    const checkboxGroup: UseCheckboxGroupType = useCheckboxGroup(list, 'id');

    return (
        <>
            <button type="button" onClick={() => setReset((prev) => prev + 1)}>리셋하기</button>
            <table>
                <colgroup>
                    <col style={{width: '20%'}}/>
                    <col style={{width: 'auto'}}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>
                            <input 
                                type="checkbox"
                                checked={checkboxGroup.isAllSelected}
                                onChange={checkboxGroup.toggleAll}
                            />
                        </th>
                        <th>제목</th>
                    </tr>
                </thead>
                <tbody>
                    <List list={list} checkboxGroup={checkboxGroup}/>
                </tbody>
            </table>
        </>
    )
});

// 목록
const List: React.FC<{list: Array<DataType>, checkboxGroup: UseCheckboxGroupType}> = memo(({list, checkboxGroup}) => {
    if (list && list.length > 0) {
        return list.map((data: DataType) => {
            return (
                <tr key={`data-${data.id}`}>
                    <td>
                        <input 
                            type="checkbox"
                            data-id={data.id}
                            checked={checkboxGroup.selected.includes(data.id) ? true : false}
                            onChange={checkboxGroup.toggle}
                        />
                    </td>
                    <td>{data.title}</td>
                </tr>
            )
        });
    }
});


export default Main;