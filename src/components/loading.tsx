import { ClipLoader } from 'react-spinners';

/**
 * 로딩 페이지
 * @returns 
 */

type LoadingProps = {
    size?: number;
    height?: number;
}

export default function Loading({ size = 150, height = 100 }: LoadingProps) {
  if( `${process.env.NEXT_PUBLIC_LOADING}` === '1') {
    return (
      <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: `${height}vh`,backgroundColor: 'rgba(0, 0, 0, 0.05)',flexDirection: 'column',}}>
        <ClipLoader size={size} color="#15B06F" loading />
      </div>
    );
  }
}