/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/',
    reactStrictMode:true,
    swcMinify:true,
    async rewrites() {
        return [
        {
          source: '/resume/index',
          destination: '/resume/index.html',
        },
      ]
    }

};

export default nextConfig;


