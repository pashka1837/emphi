import { getStatusColor } from "./utils";

export function loaderEl() {
  return `<td colspan="5">
            <div
              class="spinner-border spinner-border-sm text-primary"
              role="status"
            ></div>
          </td>`;
}

export function leadRowEl(lead: TableLeadDataType) {
  return `<td>${lead.id}</td>
    <td>${lead.title}</td>
    <td>${lead.budget}</td>
    <td>${lead.contactName}</td>
    <td>${lead.contactPhone}</td>`;
}

export function leadCardEl(detail: LeadType | null) {
  if (!detail) return errorEl("Инфрмация по сделке не найдена");

  return `<td colspan="5">
                 <strong>ID:</strong> ${detail.id}<br>
                 <strong>Название:</strong> ${detail.name}<br>
                 <strong>Дата:</strong> ${new Date(
                   detail.created_at * 1000
                 ).toLocaleDateString("ru-RU")}<br>
                <strong>Статус:</strong> ${statusEl(
                  detail.closest_task_at * 1000
                )}
             </td>`;
}

export function errorEl(msg: string) {
  return `<td colspan="5"><strong>${msg}</strong></td>`;
}

function statusEl(statusDate: number) {
  const statusCircle = `<svg height="10" width="10">
            <circle cx="5" cy="5" r="5" fill="${getStatusColor(
              statusDate
            )}"></circle>
          </svg>`;
  return statusCircle;
}
