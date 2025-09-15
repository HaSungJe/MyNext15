import { ClipLoader } from 'react-spinners';

type LoadingProps = {
    size?: number;
    height?: number;
}

export default function Loading({size, height}: LoadingProps) {
    if( `${process.env.NEXT_PUBLIC_LOADING}` === '1') {
        const style: Record<string, any> = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: `${height | 100}vh`,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            flexDirection: 'column' 
        };

        return (
            <div style={style}>
                <ClipLoader 
                    size={size | 150} 
                    color="#15B06F" loading 
                />
            </div>
        );
    }
}