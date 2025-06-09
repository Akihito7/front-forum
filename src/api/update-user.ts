import { api } from "@/services/axios";

interface UpdateUserProps {
  email: string;
  name: string;
  username: string;
}
export async function updateUser({ email, name, username }: UpdateUserProps) {
  const response = await api.put("/user", {
    email, name, username
  })
  return response.data;
}