import dayjs from "dayjs";
import "dayjs/locale/es";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("es"); // Para que diga "hace 3 horas", "hace 1 día", etc.

export const formatRelativeDate = (dateString) => {
  return dayjs(dateString).fromNow();
};
