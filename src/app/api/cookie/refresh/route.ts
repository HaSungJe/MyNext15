'use server';
import { cookies } from "next/headers";

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
    const cookieStore = await cookies();
    const { data } = await request.json();

    try {
        cookieStore.set('refreshToken', data, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'development' ? false : true, 
        });
    
        return new Response(JSON.stringify({ success: true }), { headers });
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { headers });
    }
}