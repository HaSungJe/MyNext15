'use server';
import { cookies } from "next/headers";
import * as jwt from 'jsonwebtoken';

const headers = {
    'content-type': 'application/json'
}

// 소셜 로그인정보 쿠키 얻기
export async function GET() {
    const cookieStore = await cookies();
    const snsCookie = cookieStore.get("sns");

    try {
        if (snsCookie?.value) {
            const result = jwt.verify(snsCookie.value, process.env.NEXT_PUBLIC_JWT_CODE as string);
            return new Response(JSON.stringify({ success: true, data: result }), {headers});
        } else {
            return new Response(JSON.stringify({ success: false }), {headers});
        }
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), {headers});
    }
}

// 소셜 로그인정보 쿠키 삭제
export async function DELETE(): Promise<Response> {
    try {
        const cookieStore = await cookies();

        // 소셜 로그인정보 쿠키 삭제
        cookieStore.delete("sns");

        // next-auth 관련 쿠키 삭제
        const cookieList = cookieStore.getAll();
        for (let i = 0; i < cookieList.length; i++) {
            if (cookieList[i].name.includes("next-auth")) {
                cookieStore.delete(cookieList[i].name);
            }
        }

        return new Response(JSON.stringify({ success: true }), {headers});
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), {headers});
    }
}