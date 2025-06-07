'use server'

import { cookies } from "next/headers"


interface SetCookieProps {
  key: string;
  value: string
}
export async function setCookie({ key, value }: SetCookieProps) {
  const cookieStore = await cookies();
  cookieStore.set(key, value)
}

export async function getCookie(key: string) {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
}