import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // output: "standalone",
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: process.env.NEXT_IMAGE_PORT,
                pathname: "/**",
            },
            {
                protocol: 'http',
                hostname: process.env.NEXT_IMAGE_HOSTNAME,
                port: process.env.NEXT_IMAGE_PORT,
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "s3.ap-northeast-2.amazonaws.com",
                port: "",
                pathname: "/**",
            }
        ],
    },
    basePath: process.env.NEXT_PUBLIC_LOCAL_SERVER_PREFIX,
    async rewrites() {
        // 내부 경로를 login-after로 통일
        const internalRewrite = [
            {
                source: '/webview/:path*',
                destination: '/webview/:path*'
            },
            {
                source: '/:path*',
                destination: '/login-after/:path*',
            },
        ];

        return [...internalRewrite];
    }
};

export default nextConfig;
