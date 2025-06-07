import { api } from "@/services/axios";


interface LoginProps {
  email: string;
  password: string;
}

interface Data {
  acessToken: string
}

export async function login({ email, password }: LoginProps): Promise<string> {
  const response = await api.post("/user/login", {
    email,
    password
  });
  const { acessToken }: Data = response.data;
  return acessToken;
}