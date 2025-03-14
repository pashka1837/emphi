import "./style.css";
import { renderLeads } from "./deals.ts";

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
document.addEventListener("DOMContentLoaded", async () => {
  // setInterval(async () => await getDeals(), 2000);
  await renderLeads();
});
