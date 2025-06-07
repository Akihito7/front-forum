'use server'

import { cookies } from "next/headers"

interface GetUserResponse {
  id: string;
  name: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date | null
}

export async function getUser(): Promise<GetUserResponse | undefined> {

  const cookieStore = await cookies();

  const token = cookieStore.get('@token')?.value;

  if (!token) return;
  
  const response = await fetch('http://localhost:4010/user/me', {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  if (response.status != 200) return;

  return response.json();
}