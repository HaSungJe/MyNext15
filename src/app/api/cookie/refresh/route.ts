'use server';
import { cookies, headers as nextHeaders } from "next/headers";

const headers = {
    'Content-Type': 'application/json'
}

// refreshToken 얻기
export async function GET(): Promise<Response> {    
    const cookieStore = await cookies();
    const data = cookieStore.get('refreshToken');

    if (data) {
        return new Response(JSON.stringify({ success: true, data: data.value }), { headers });
    } else {
        return new Response(JSON.stringify({ success: false }), { headers });
    }
}

// refreshToken 생성
export async function POST(request: Request): Promise<Response> {
    // http, https 구분
    const headerList = await nextHeaders();
    const proto = headerList.get('x-forwarded-proto') || 'http';
    const isSecure = proto === 'https';

    const cookieStore = await cookies();
    const { data } = await request.json();

    try {
        cookieStore.set('refreshToken', data, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'development' ? false : isSecure, 
        });
    
        return new Response(JSON.stringify({ success: true }), { headers });
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { headers });
    }
}