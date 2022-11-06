import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
	res.send("hey");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Listening at PORT ${port}`);
});
