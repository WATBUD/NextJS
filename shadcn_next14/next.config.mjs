/** @type {import('next').NextConfig} */
const nextConfig = {
    //basePath: '/public',
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


