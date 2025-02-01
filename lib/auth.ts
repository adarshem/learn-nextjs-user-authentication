import { Lucia, Session } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { cookies } from 'next/headers';
import db from './db';

// Create a new adapter instance for the better sqlite3
// https://v3.lucia-auth.com/database/
const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions'
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    // name: 'lucia-session',
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
  //   getUserAttributes: (attributes) => {
  //     return {
  //       // attributes has the type of DatabaseUserAttributes
  //       username: attributes.username
  //     };
  //   }
});

// declare module 'lucia' {
//   interface Register {
//     Lucia: typeof lucia;
//     DatabaseUserAttributes: DatabaseUserAttributes;
//   }
// }

// interface DatabaseUserAttributes {
//   username: string;
// }

/**
 * Creates and stores a new authentication session for a given user and sets a session cookie in the outgoing response.
 * @param userId
 */
export async function createAuthSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  // ses cookies() from next/headers to access and modify response cookies.
  // nextjs 15 or higher you need to await cookies() to get the cookies object.
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

/**
 * Verifies the authentication session for the incoming request.
 */
export async function verifyAuth() {
  const sessionCookies = cookies().get(lucia.sessionCookieName);
  if (!sessionCookies) {
    return {
      user: null,
      session: null
    };
  }

  const sessionId = sessionCookies.value;
  if (!sessionId) {
    return {
      user: null,
      session: null
    };
  }

  const result = await lucia.validateSession(sessionId);

  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result?.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return result;
}

export async function destroyAuthSession() {
  const { session } = await verifyAuth();

  if (!session) {
    return {
      error: 'No session found'
    };
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
