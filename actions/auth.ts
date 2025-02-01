'use server';
import { createUser, getUserByEmail } from '@/lib/user';
import { hashUserPassword, verifyPassword } from '@/lib/hash';
import { redirect } from 'next/navigation';
import { SqliteError } from 'better-sqlite3';
import { createAuthSession, destroyAuthSession } from '@/lib/auth';

export async function userSignup(
  _prevFormData: { errors: string[] },
  formData: FormData
) {
  let errors: string[] = [];
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // validate the email and password
  if (!email || !email.includes('@')) {
    errors.push('Please provide a valid email address.');
  }
  if (!password || password.length < 8) {
    errors.push('Please provide a password with at least 8 characters.');
  }
  if (errors.length > 0) {
    return { errors };
  }

  try {
    const userId = createUser(email, hashUserPassword(password));
    await createAuthSession(String(userId));
    redirect('/training');
  } catch (error) {
    if (
      error instanceof SqliteError &&
      error?.code === 'SQLITE_CONSTRAINT_UNIQUE'
    ) {
      errors.push('It seems like an account with this email already exists.');
      return { errors };
    }

    throw error;
  }
}

export async function userLogin(
  _prevFormData: { errors: string[] },
  formData: FormData
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return { errors: ['User not found'] };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return { errors: ['Invalid password'] };
  }

  await createAuthSession(String(existingUser.id));
  redirect('/training');
}

export async function auth(
  mode: string,
  _prevState: { errors: string[] },
  formData: FormData
) {
  if (mode === 'login') {
    return userLogin(_prevState, formData);
  } else {
    return userSignup(_prevState, formData);
  }
}

export async function logout() {
  // remove the session from the database
  // redirect to the login page
  await destroyAuthSession();
  redirect('/');
}
