import express from "express";
import cors from "cors";
import "dotenv/config";
import tagRoutes from "./routes/tags.js";
import photosRoutes from "./routes/photos.js";

const { PORT, BACKEND_URL } = process.env;

const app = express();
app.use(cors());

app.use(express.json());

app.use("/static", express.static("public"));

console.log(PORT);
console.log(BACKEND_URL);

app.use("/tags", tagRoutes);
app.use("/photos", photosRoutes);

app.listen(PORT, () => {
  console.log(`app is listening on PORT ${PORT}`);
});
