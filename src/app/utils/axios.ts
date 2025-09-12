'use client';
import { getAccessToken } from './cookie';
import axios from 'axios';

/**
 * 엑셀 다운로드
 * 
 * @param fileName 
 * @param url 
 * @param reload 
 */
export async function axiosExcelDown(url: string, fileName: string, headers: Record<string, any> = {}) {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.get(url, {responseType: 'blob', headers: {...headers,Authorization: `Bearer ${accessToken}`}});
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `${fileName}.xlsx`);
        link.style.cssText = "display:none";
        link.click();
        link.remove();
    } catch (error: any) {
        console.log(error)
    }
}

/**
 * Get
 * 
 * @param url 
 * @param headers
 */
export async function axiosGet(url: string, headers: Record<string, any> = {}) {
    try {
        const accessToken = await getAccessToken();
        return await axios.get(url, {headers: {...headers, Authorization: `Bearer ${accessToken}`}});
    } catch (error: any) {
        if (error?.response?.data?.statusCode === 401) {
            if (headers['retry'] === undefined) {
                headers['retry'] = '1';
                return await axiosGet(url, headers);
            } else {
                throw error
            }
        } else {
            throw error;
        }
    }
}

/**
 * Post 
 * 
 * @param url 
 * @param body 
 * @param headers
 * @returns 
 */
export async function axiosPost(url: string, body: any, headers: Record<string, any> = {}) {
    try {
        const accessToken = await getAccessToken();
        return await axios.post(url, body, {headers: {...headers, Authorization: `Bearer ${accessToken}`,},});
    } catch (error: any) {
        if (error?.response?.data?.statusCode === 401) {
            if (headers['retry'] === undefined) {
                headers['retry'] = '1';
                return await axiosGet(url, headers);
            } else {
                throw error
            }
        } else {
            throw error;
        }
    }
}

/**
 * Put
 * 
 * @param url 
 * @param body 
 * @param headers
 * @returns 
 */
export async function axiosPut(url: string, body: any, headers: Record<string, any> = {}) {
    try {
        const accessToken = await getAccessToken();
        return await axios.put(url, body, {headers: {...headers, Authorization: `Bearer ${accessToken}`}});
    } catch (error: any) {
        if (error?.response?.data?.statusCode === 401) {
            if (headers['retry'] === undefined) {
                headers['retry'] = '1';
                return await axiosGet(url, headers);
            } else {
                throw error
            }
        } else {
            throw error;
        }
    }
}

/**
 * Patch
 * 
 * @param url 
 * @param body 
 * @param reload 
 * @param headers
 * @returns 
 */
export async function axiosPatch(url: string, body: any, headers: Record<string, any> = {}) {
    try {
        const accessToken = await getAccessToken();
        return await axios.patch(url, body, {headers: {...headers, Authorization: `Bearer ${accessToken}`}});
    } catch (error: any) {
        if (error?.response?.data?.statusCode === 401) {
            if (headers['retry'] === undefined) {
                headers['retry'] = '1';
                return await axiosGet(url, headers);
            } else {
                throw error
            }
        } else {
            throw error;
        }
    }
}

/**
 * Delete
 * 
 * @param url 
 * @param body 
 * @param headers
 */
export async function axiosDelete(url: string, body: any, headers: Record<string, any> = {}) {
    try {
        const accessToken = await getAccessToken();
        if (body && body !== null) {
            await axios.delete(url, {data: body, headers: {...headers, Authorization: `Bearer ${accessToken}`}});
        } else {
            await axios.delete(url, {headers: {...headers, Authorization: `Bearer ${accessToken}`}});
        }
    } catch (error: any) {
        if (error?.response?.data?.statusCode === 401) {
            if (headers['retry'] === undefined) {
                headers['retry'] = '1';
                return await axiosGet(url, headers);
            } else {
                throw error
            }
        } else {
            throw error;
        }
    }
}