'use server';
import { createUser } from '@/lib/user';
import { hashUserPassword } from '@/lib/hash';
import { redirect } from 'next/navigation';
import { SqliteError } from 'better-sqlite3';

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

  redirect('/training');
}
