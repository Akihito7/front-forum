import { api } from "@/services/axios";

interface updatePasswordProps {
  password: string;
  newPassword: string
}
export async function updatePassword({ password, newPassword }: updatePasswordProps) {
  const response = await api.patch("/user/update-password", {
    password, newPassword
  })
  return response.data;
}