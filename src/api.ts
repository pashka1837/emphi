import { fetchConstruct, parseLeadData } from "./utils";

export async function fetchLeadData(page: number) {
  try {
    const leadsRes = await fetchConstruct(
      `/leads?limit=2&with=contacts&page=${page}`
    );

    if (!leadsRes.ok || leadsRes.statusText === "No Content") return null;
    const leadsData = await leadsRes.json();

    if (!leadsData) return null;

    const leads = leadsData._embedded?.leads as LeadType[];

    const contactsPromise = leads.map(async (l) => {
      const contactId = l._embedded?.contacts[0]?.id;
      if (!contactId) return null;
      return await fetchConstruct(`/contacts/${contactId}`);
    });

    const contactsRes = await Promise.all(contactsPromise);

    const contacts = await Promise.all(
      contactsRes.map(async (res) => {
        if (!res || !res.ok || res.statusText === "No Content") return null;
        return await res.json();
      })
    );

    return leads.map((l, i) => parseLeadData(l, contacts[i]));
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

export async function fetchLeadDetails(leadId: string) {
  try {
    const leadsRes = await fetchConstruct(`/leads/${leadId}`);

    if (!leadsRes.ok || leadsRes.statusText === "No Content") return null;
    const leadsData = await leadsRes.json();

    if (!leadsData) return null;

    return leadsData as LeadType;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

export async function mockDealDetails(dealId: string) {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          id: dealId,
          title: `Сделка ${dealId}`,
          date: new Date().toISOString(),
          taskDate: new Date().toISOString(),
        }),
      1000
    )
  );
}

export async function mockDeals(dealId: string): Promise<TableLeadDataType[]> {
  const id = Number(dealId);
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            id,
            title: `Сделка ${dealId}`,
            budget: 1223,
            contactName: "xxx",
            contactPhone: "xxx",
          },
          {
            id: id + 10,
            title: `Сделка ${id + 1}`,
            budget: 1223,
            contactName: "xxx",
            contactPhone: "xxx",
          },
        ]),
      1000
    )
  );
}
