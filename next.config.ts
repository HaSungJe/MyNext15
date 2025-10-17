import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // output: "standalone",
    reactStrictMode: true,
    trailingSlash: true,
    experimental: {
        reactCompiler: true
    },
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
    // async rewrites() {
    //     const internalRewrite = [
    //         {
    //             source: `/:path((?! tap|login|test ).*)`,
    //             destination: '/login-after/:path*',
    //         }
    //     ];

    //     return [...internalRewrite];
    // }
};

export default nextConfig;
