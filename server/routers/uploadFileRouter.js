const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { upload_images } = new PrismaClient();
const multer = require("multer");
const images = multer({ dest: "uploads/images/" });
const { rename } = require("fs");

router.post("/createFileUpload", images.single("avatar"), async (req, res) => {
  if (!req.file) {
    return console.log({ error_message: "Nincs kép kiválasztva!" });
  }

  let fileType = req.file.mimetype.split("/")[1];

  if (fileType === "svg+xml") {
    fileType = fileType.split("+")[0];
  }

  let newFileName = req.file.filename + "." + fileType;
  const { alt } = req.body;

  rename(`images/${req.file.filename}`, `images/${newFileName}`, (err) => {
    if (err) throw err;
    console.log("Sikeres kép név csere!");
  });

  await upload_images.create({
    data: {
      img_name: newFileName,
      img_alt: alt,
    },
  });
  res.json({
    success_message: "Sikeres képfeltöltés!",
  });
});

module.exports = router;
