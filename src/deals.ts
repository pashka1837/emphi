import { fetchLeadData, fetchLeadDetails } from "./api";
import { errorEl, leadCardEl, leadRowEl, loaderEl } from "./ui-comp";
import { wait } from "./utils";

let leadsDataAr: TableLeadDataType[] = [];

export async function renderLeads() {
  const tableBody = document.getElementById("dealsTable")!;
  await getLeads(tableBody);
  return;
}

async function getLeads(tableBody: HTMLElement) {
  const tableLoader = document.getElementById("tableLoader")!;
  let page = 1;

  while (true) {
    if (page > 6) break;
    tableLoader.style.display = "table-footer-group";

    const leads = await fetchLeadData(page);

    if (!leads) break;

    const newDealElAr = leads.map(createTableRow);

    leadsDataAr.splice(-1, 0, ...leads);
    tableBody.append(...newDealElAr);
    tableLoader.style.display = "none";
    page++;
    await wait(1000);
  }
  tableLoader.style.display = "none";

  if (!tableBody.children.length)
    tableBody.innerHTML = errorEl("Сделки не найдены");
}

function createTableRow(lead: TableLeadDataType) {
  const newDealEl = document.createElement("tr");

  newDealEl.setAttribute("role", "button");
  newDealEl.setAttribute("data-lead-id", `${lead.id}`);
  newDealEl.style.cursor = "pointer";

  newDealEl.innerHTML = leadRowEl(lead);

  newDealEl.addEventListener("click", handleLeadClick);
  return newDealEl;
}

async function handleLeadClick(this: HTMLTableRowElement) {
  const curRow = this;
  const leadId = curRow.getAttribute("data-lead-id")!;
  const isOpen = curRow.classList.contains("show");

  if (isOpen) return closeCard(curRow, leadId);

  const closeElAr = [...document.querySelectorAll(".show")];
  closeElAr.forEach((el) => closeCard(el));
  await openCard(curRow, leadId);

  return;
}

function closeCard(el: HTMLTableRowElement | Element, argleadId?: string) {
  el.classList.remove("show");
  let leadId = argleadId || el.getAttribute("data-lead-id");
  const leadData = leadsDataAr.find((d) => d.id === Number(leadId));
  if (leadData) el.innerHTML = leadRowEl(leadData);
  return;
}

async function openCard(curRow: HTMLTableRowElement, leadId: string) {
  curRow.classList.add("show");
  curRow.innerHTML = loaderEl();

  const detail = await fetchLeadDetails(leadId);

  curRow.innerHTML = leadCardEl(detail);
  return;
}
