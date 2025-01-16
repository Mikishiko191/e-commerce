import Header from '@/components/shared/header';
// import Link from 'next/link';
import Footer from '@/components/shared/footer';

// const links = [
//   { href: '/admin/overview', title: 'Overview' },
//   { href: '/admin/products', title: 'Products' },
//   { href: '/admin/orders', title: 'Orders' },
//   { href: '/admin/users', title: 'Users' },
// ];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <header>
        <nav>
          <ul>
            {links.map(({ href, title }) => (
              <li key={href}>
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header> */}
      <Header />
      {children}
      <Footer />
    </>
  );
}

// TODO: In the feature let's protect using middleware
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req });
//   if (!token?.user?.role || token.user.role !== 'admin') {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
//   return NextResponse.next();
// }

// Only match admin routes
// export const config = {
//   matcher: ['/admin/:path*'],
// };
