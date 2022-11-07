import express from "express";
import cors from "cors";
import { tableClients, tableReports } from "./lib/tableconfigs.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/timereports", async (req, res) => {
	try {
		const response = await tableReports.select().all();

		const newTimeReports = response.map((item) => {
			item.fields.id = item["id"];
			return item.fields;
		});

		res.send(newTimeReports);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

app.get("/timereports/:date", async (req, res) => {
	const datePicked = req.params.date;

	try {
		const response = await tableReports
			.select({ filterByFormula: `date=${`"${datePicked}"`}` })
			.all();

		const newTimeReports = response.map((item) => {
			item.fields.id = item["id"];
			return item.fields;
		});

		res.send(newTimeReports);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

app.post("/timereports", async (req, res) => {
	const newReport = req.body;

	await tableReports.create(
		[
			{
				fields: newReport,
			},
		],
		function (err, records) {
			if (err) {
				console.error(err);
				return;
			}
		}
	);

	res.send("Reports Added");
});

app.put("/timereports/:id", async (req, res) => {
	const newReports = req.body;
	const newReportId = req.params.id;

	tableReports.update(
		[
			{
				id: newReportId,
				fields: newReports,
			},
		],
		function (err, records) {
			if (err) {
				console.error(err);
				return;
			}
			records.forEach(function (record) {
				console.log(record.get("id"));
			});
		}
	);

	res.send("Records Updated");
});

app.delete("/timereports/:id", async (req, res) => {
	const newReportId = req.params.id;

	await tableReports.destroy([newReportId], function (err, deletedRecords) {
		if (err) {
			console.error(err);
			return;
		}
	});

	res.send("Report Deleted");
});

app.get("/clients", async (req, res) => {
	const response = await tableClients.select().all();
	const newClients = response.map((item) => {
		item.fields.id = item["id"];
		return item.fields;
	});
	res.send(newClients);
});

app.post("/clients", async (req, res) => {
	const newClient = req.body;
	await tableClients.create(
		[
			{
				fields: req.body,
			},
		],
		function (err, records) {
			if (err) {
				console.error(err);
				return;
			}
		}
	);

	const response = await tableClients.select().all();
	const newClients = response.map((item) => {
		item.fields.id = item["id"];
		return item.fields;
	});
	res.send(newClients);
});

app.delete("/clients/:id", async (req, res) => {
	const newClientId = req.params.id;

	await tableClients.destroy([newClientId], function (err, deletedRecords) {
		if (err) {
			console.error(err);
			return;
		}
	});

	const response = await tableClients.select().firstPage();
	const newClients = response.map((item) => {
		item.fields.id = item["id"];
		return item.fields;
	});
	res.send(newClients);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Listening at PORT ${port}`);
});
