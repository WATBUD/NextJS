/** @type {import('next').NextConfig} */
const nextConfig = {
    //basePath: '/public',
    reactStrictMode:false,//會執行兩次render
    swcMinify:true,
    compiler: {
        //removeConsole: process.env.NODE_ENV === "production",
        removeConsole: true,

    },
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


