import { logout } from '@/actions/auth';

// Layout for all the authentication pages.

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication'
};

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header id="auth-header">
        <p>{'Welcome back to Next Auth!'}</p>
        <form action={logout}>
          <button>{'Logout'}</button>
        </form>
      </header>
      {children}
    </>
  );
}
