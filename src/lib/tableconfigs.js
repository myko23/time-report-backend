import Airtable from "airtable";
Airtable.configure({
	endpointUrl: "https://api.airtable.com",
	apiKey: "keybXaJ6FqG73ehZW",
});
const base = Airtable.base("appxPVLOPcImQ4NDV");

export const tableClients = base("Clients");
export const tableReports = base("TimeReports");
