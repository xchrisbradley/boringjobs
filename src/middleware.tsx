import { getSession, withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import { getAccount } from '@/actions';

export default withMiddlewareAuthRequired(async function handler(req) {
  const res = NextResponse.next();
  const ctx = await getSession(req, res);

  if (!ctx) {
    return NextResponse.redirect('/api/auth/login');
  }

  const { user } = ctx;

  // Hack to get the account, assume the user verifying with WRLD ID is the owner of the account until
  // we have a logic to link the account with the user from app.
  const account = await getAccount(`0x${process.env.PRIVATE_KEY}`);
  user['account'] = account;

  res.cookies.set('hl', user.language);
  return res;
});

