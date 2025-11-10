// middleware.ts
import { next } from '@vercel/edge';

export default function middleware(request: Request) {
    const url = new URL(request.url);

    // 处理 /auth 路径
    if (url.pathname.startsWith('/auth')) {
        const newUrl = new URL('https://vercel-auth-rouge.vercel.app');
        newUrl.pathname = url.pathname; // 保留原始路径
        newUrl.search = url.search; // 保留查询参数

        return Response.redirect(newUrl.toString());
    }

    // 处理 /biz 路径
    if (url.pathname.startsWith('/biz')) {
        const newUrl = new URL('https://vercel-business.vercel.app');
        newUrl.pathname = url.pathname; // 保留原始路径
        newUrl.search = url.search; // 保留查询参数

        return Response.redirect(newUrl.toString());
    }

    // 其他请求继续
    return next();
}

export const config = {
    matcher: ['/auth/:path*', '/biz/:path*']
};