// middleware.ts
import { rewrite } from '@vercel/functions';

export default function middleware(request: Request) {
    const url = new URL(request.url);
    const { pathname, search } = url;

    // 认证服务路由 - 保留 /auth 前缀
    if (pathname.startsWith('/auth')) {
        const targetUrl = new URL('https://vercel-auth-rouge.vercel.app');
        targetUrl.pathname = pathname;  // 保持 /auth/xxx 路径
        targetUrl.search = search;

        return rewrite(targetUrl);
    }

    // 业务服务路由 - 保留 /biz 前缀
    if (pathname.startsWith('/biz')) {
        const targetUrl = new URL('https://vercel-business.vercel.app');
        targetUrl.pathname = pathname;  // 保持 /biz/xxx 路径
        targetUrl.search = search;

        return rewrite(targetUrl);
    }
}