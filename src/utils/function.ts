// 전체선택
export function selectboxAllCheck(event: React.ChangeEvent<HTMLInputElement>, attr?: string) {
    let checkboxs: NodeListOf<HTMLInputElement>;

    if (attr) {
        // attr 값이 있는 경우 → data-value=attr 인 것만 선택
        checkboxs = document.querySelectorAll(`input[data-type="checkbox"][data-gubun="${attr}"]`);
    } else {
        // attr 값이 없으면 → 기존 전체 선택
        checkboxs = document.querySelectorAll(`input[data-type="checkbox"]`);
    }

    if (event.target.checked) {
        for (let i=0; i<checkboxs.length; i++) {
            const checkbox: any = checkboxs[i];
            checkbox.checked = true;
        }
    } else {
        for (let i=0; i<checkboxs.length; i++) {
            const checkbox: any = checkboxs[i];
            checkbox.checked = false;
        }
    }
}

// 입력칸 정보 변경
export function changeFunction(event: any, func: Function) {
    func(event.target.value);
}

// 숫자 입력
export function changeNumberFunction(event: any, isNumberString: boolean, func: Function) {
    const v = event.target.value;
    const temp_v = v.toString().replace(/[^0-9]/g, '');
    if (parseInt(temp_v).toString() !== 'NaN') {
        if (isNumberString) {
            func(temp_v);
        } else {
            func(parseInt(temp_v));
        }
    } else {
        func(0);
    }
}

// 생년월일 입력
export function changeDateFunction(event: any, str: string, func: Function) {
    // 1. 숫자만
    let value = event.target.value.toString().replace(/[^0-9]/g, '');
    
    // 2. 8자리 제한
    if (value && value.length > 8) {
        value = value.substring(0, 8);
    }

    // 3. 연/월/일 나누기
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    func(year + (month ? `${str}${month}` : '') + (day ? `${str}${day}` : ''));
}

// 소수 입력
export function changeFloatFunction(event: any, func: Function) {
    const v = event.target.value;
    // 소수점 하나만 허용하고 나머지는 제거
    const temp_v = v.toString().replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); 

    const num = parseFloat(temp_v);
    if (!isNaN(num)) {
        func(num);
    } else {
        func(0);
    }
}