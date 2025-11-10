import { rewrite } from '@vercel/functions';

export default function middleware(request: Request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/auth')) {
        return rewrite(new URL('https://vercel-auth-rouge.vercel.app', request.url));
    }

    if (url.pathname.startsWith('/biz')) {
        return rewrite(new URL('https://vercel-business.vercel.app', request.url));
    }
}