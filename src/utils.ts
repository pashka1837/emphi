const baseUrl = import.meta.env.VITE_BASE_URL;
const tkn = import.meta.env.VITE_KLUCH;

const proxy = import.meta.env.VITE_WITH_PROXY;

export const wait = async (t: number) =>
  new Promise((res, _) => setTimeout(() => res(null), t));

export function parseLeadData(
  lead: LeadType,
  contact: ContactType | undefined
) {
  const contactName = contact?.name || "Не найден";
  const contactPhone =
    contact?.custom_fields_values[0]?.values[0]?.value || "Не найден";

  return {
    id: lead.id,
    title: lead.name,
    budget: lead.price,
    contactName,
    contactPhone,
  };
}

export async function fetchConstruct(path: string) {
  return await fetch(`${proxy}${baseUrl}${path}`, {
    headers: {
      Authorization: `Bearer ${tkn}`,
    },
  });
}

export function getStatusColor(dueDate: number) {
  const today = Date.now();
  const diff = (dueDate - today) / (1000 * 60 * 60 * 24);
  if (isNaN(diff) || diff < 0) return "red";
  if (diff >= 1) return "green";
  return "yellow";
}
