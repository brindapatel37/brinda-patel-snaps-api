import express from "express";
const router = express.Router();
import fs from "fs";
import crypto from "crypto";

function readPhotos() {
  const photosData = fs.readFileSync("./data/photos.json");
  const parsedData = JSON.parse(photosData);
  return parsedData;
}

//ROUTES
router.get("/", (req, res) => {
  const photos = readPhotos();
  res.json(photos);
  console.log(photos);
});

router.get("/:id", (req, res) => {
  const photos = readPhotos();
  const singlePhoto = photos.find((photo) => photo.id === req.params.id);

  if (singlePhoto) {
    res.json(singlePhoto);
    console.log(singlePhoto);
  } else {
    res.status(404).json({ error: "Photo not found" });
  }
});

router.get("/:id/comments", (req, res) => {
  const photos = readPhotos();
  const singlePhoto = photos.find((photo) => photo.id === req.params.id);
  const comments = singlePhoto.comments;

  if (singlePhoto) {
    res.json(comments);
    console.log(comments);
  } else {
    res.status(404).json({ error: "Photo not found" });
  }
});

router.post("/:id/comments", (req, res) => {
  const newComment = {
    id: crypto.randomUUID(),
    name: req.body.name,
    comment: req.body.comment,
    timestamp: Date.now(),
  };

  const photos = readPhotos();
  const singlePhoto = photos.find((photo) => photo.id === req.params.id);

  if (singlePhoto) {
    singlePhoto.comments.push(newComment);
    fs.writeFileSync("./data/photos.json", JSON.stringify(photos));
    res.status(201).json(newComment);
    console.log(newComment);
  } else {
    res.status(404).json({ error: "Comment not posted" });
  }
});

export default router;
