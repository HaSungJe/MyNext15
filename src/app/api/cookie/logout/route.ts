'use server';
import { cookies } from "next/headers";

const headers = {
    'Content-Type': 'application/json'
}

// 로그아웃 생성
export async function POST(request: Request): Promise<Response> {
    try {
        const cookieStroe = await cookies();
        cookieStroe.delete('accessToken');
        cookieStroe.delete('refreshToken');
        return new Response(JSON.stringify({ success: true }), { headers });
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { headers });
    }
}