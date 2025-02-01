'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { auth } from '@/actions/auth';

export default function AuthForm({ mode }: { mode: string }) {
  const [formState, formAction] = useFormState(auth.bind(null, mode), {
    errors: []
  });

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState?.errors?.length > 0 && (
        <ul id="form-errors">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
      </p>
      <p>
        {mode === 'login' && (
          <Link href="/?mode=signup">Create a new account.</Link>
        )}
        {mode === 'signup' && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}
