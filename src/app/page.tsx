"use client";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Profile(user) {
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
});