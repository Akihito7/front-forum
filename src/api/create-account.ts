import { api } from "@/services/axios";

interface CreateAccountProps {
  email: string;
  fullName: string;
  username: string;
  password: string;
}

export async function createAccount({ email, fullName, username, password }: CreateAccountProps) {
  const response = await api.post('/user/create', {
    email,
    name: fullName,
    username,
    password
  })
  return response.data
} 