import express from "express";
const router = express.Router();
import fs from "fs";

function getTags() {
  const tagsData = fs.readFileSync("./data/tags.json");
  const parsedData = JSON.parse(tagsData);
  return parsedData;
}

//ROUTES
router.get("/", (req, res) => {
  res.json(getTags());
  console.log(getTags());
});

export default router;
