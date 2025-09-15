'use client';
import { AccessDataType } from '@/types/user';
import { getAccessToken } from './cookie';
import axios from 'axios';

/**
 * 엑셀 다운로드
 * 
 * @param loginData
 * @param fileName 
 * @param url 
 * @param reload 
 */
export async function axiosExcelDown(loginData: AccessDataType, url: string, fileName: string, headers: Record<string, any> = {}) {
    try {
        const response = await axios.get(url, {responseType: 'blob', headers: {...headers,Authorization: `Bearer ${loginData?.accessToken}`}});
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `${fileName}.xlsx`);
        link.style.cssText = "display:none";
        link.click();
        link.remove();
    } catch (error: any) {
        if (error?.response?.data?.statusCode === 401) {
            if (headers['retry'] === undefined) {
                headers['retry'] = '1';
                loginData.accessTokenRefresh();
                return await axiosExcelDown(loginData, url, fileName, headers);
            } else {
                throw error;
            }
        } else {
            throw error;
        }
    }
}

/**
 * Get
 * 
 * @param loginData
 * @param url 
 * @param headers
 */
export async function axiosGet(loginData: AccessDataType, url: string, headers: Record<string, any> = {}) {
    try {
        return await axios.get(url, {headers: {...headers, Authorization: `Bearer ${loginData?.accessToken}`}});
    } catch (error: any) {
        if (error?.response?.data?.statusCode === 401) {
            if (headers['retry'] === undefined) {
                headers['retry'] = '1';
                if (loginData && loginData?.accessTokenRefresh) {
                    loginData.accessTokenRefresh();
                }
                return await axiosGet(loginData, url, headers);
            } else {
                throw error;
            }
        } else {
            throw error;
        }
    }
}

/**
 * Post 
 * 
 * @param loginData
 * @param url 
 * @param body 
 * @param headers
 * @returns 
 */
export async function axiosPost(loginData: AccessDataType, url: string, body: any, headers: Record<string, any> = {}) {
    try {
        const accessToken = await getAccessToken();
        return await axios.post(url, body, {headers: {...headers, Authorization: `Bearer ${accessToken}`,},});
    } catch (error: any) {
        if (error?.response?.data?.statusCode === 401) {
            if (headers['retry'] === undefined) {
                headers['retry'] = '1';
                if (loginData && loginData?.accessTokenRefresh) {
                    loginData.accessTokenRefresh();
                }
                return await axiosPost(loginData, url, body, headers);
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
 * @param loginData
 * @param url 
 * @param body 
 * @param headers
 * @returns 
 */
export async function axiosPut(loginData: AccessDataType, url: string, body: any, headers: Record<string, any> = {}) {
    try {
        const accessToken = await getAccessToken();
        return await axios.put(url, body, {headers: {...headers, Authorization: `Bearer ${accessToken}`}});
    } catch (error: any) {
        if (error?.response?.data?.statusCode === 401) {
            if (headers['retry'] === undefined) {
                headers['retry'] = '1';
                if (loginData && loginData?.accessTokenRefresh) {
                    loginData.accessTokenRefresh();
                }
                return await axiosPut(loginData, url, body, headers);
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
 * @param loginData
 * @param url 
 * @param body 
 * @param reload 
 * @param headers
 * @returns 
 */
export async function axiosPatch(loginData: AccessDataType, url: string, body: any, headers: Record<string, any> = {}) {
    try {
        const accessToken = await getAccessToken();
        return await axios.patch(url, body, {headers: {...headers, Authorization: `Bearer ${accessToken}`}});
    } catch (error: any) {
        if (error?.response?.data?.statusCode === 401) {
            if (headers['retry'] === undefined) {
                headers['retry'] = '1';
                if (loginData && loginData?.accessTokenRefresh) {
                    loginData.accessTokenRefresh();
                }
                return await axiosPatch(loginData, url, body, headers);
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
 * @param loginData
 * @param url 
 * @param body 
 * @param headers
 */
export async function axiosDelete(loginData: AccessDataType, url: string, body: any, headers: Record<string, any> = {}) {
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
                if (loginData && loginData?.accessTokenRefresh) {
                    loginData.accessTokenRefresh();
                }
                return await axiosDelete(loginData, url, body, headers);
            } else {
                throw error
            }
        } else {
            throw error;
        }
    }
}