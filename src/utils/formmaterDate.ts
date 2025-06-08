import { format } from "date-fns";

export function formatterDate(date: Date, template: string = 'MM/dd/yyyy') {
  return format(date, template);
} 