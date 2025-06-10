import { api } from "@/services/axios";

export type Tip = {
  id: string
  title: string;
  content: string;
  link: string;
  used: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getCurrentTip(): Promise<Tip> {
  const response = await api.get('/tip/current');
  return response.data
}