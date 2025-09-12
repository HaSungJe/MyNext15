'use client';
import { useEffect } from "react";

declare global {
    interface Window {
        kakao: any
    }
}

type KakaoMapProps = {
    width?: string | number;
    height?: string | number;
    lat: number;
    lon: number;
    text: string;
    textLink: string;
    zoomLevel?: number;
    markerWidth?: number | string;
}

export default function KakaoMap( {width, height, lat, lon, text, textLink, zoomLevel, markerWidth}: KakaoMapProps ) {
    width = width ? width : 'auto';
    height = height ? height : 'auto';
    zoomLevel = zoomLevel ? zoomLevel : 3;
    markerWidth = markerWidth ? markerWidth : 'auto';

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_DAUM_MAP_API_KEY}&autoload=false`;
        script.async = true;
        document.head.appendChild(script);
    
        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.querySelector(`div[data-type=kakaoMap][data-value=kakaoMap_${text}]`); // 지도를 표시할 div 
                const mapOption = { 
                    center: new window.kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
                    level: zoomLevel // 지도의 확대 레벨
                };
            
                const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
                
                // 마커가 표시될 위치입니다 
                const markerPosition  = new window.kakao.maps.LatLng(lat, lon); 
                
                // 마커를 생성합니다
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                });
                
                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map);

                const iwContent = `
                    <div style="text-align: center; padding: 3px; width: ${markerWidth}">
                        <a href="${textLink}" target="_blank">${text}</a>
                    </div>
                `;
                const iwPosition = new window.kakao.maps.LatLng(lat, lon);

                // 인포윈도우를 생성합니다
                const infowindow = new window.kakao.maps.InfoWindow({
                    position : iwPosition, 
                    content : iwContent 
                });

                infowindow.open(map, marker); 
            });
        }
    }, []);

    return (
        <div data-type={`kakaoMap`} data-value={`kakaoMap_${text}`} style={{width: width, height: height}}></div> 
    )
}