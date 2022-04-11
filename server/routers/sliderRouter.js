const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { slider } = new PrismaClient();
const multer = require("multer");
const images = multer({ dest: "uploads/images/slider/" });
const { rename, unlink } = require("fs");
const { readdir } = require("fs/promises");

router.get("/getSlider", async (req, res) => {
  const getData = await slider.findMany({
    select: {
      id: true,
      title: true,
      img_name: true,
      img_alt: true,
    },
  });
  res.status(200).send(getData);
});

router.post("/createSlider", images.single("sliderImg"), async (req, res) => {
  const { sliderTitle, sliderImageAlt } = req.body;


  if (!sliderTitle && !sliderImageAlt && !req.file) {
    return res.send({ error_message: "nincs adat kiválasztva!" });
  } else {
    let fileType = req.file.mimetype.split("/")[1];

    if (fileType === "svg+xml") {
      fileType = fileType.split("+")[0];
    }

    let newFileName = req.file.filename + "." + fileType;

    rename(
      `uploads/images/slider/${req.file.filename}`,
      `uploads/images/slider/${newFileName}`,
      (err) => {
        if (err) throw err;
        console.log("Sikeres kép név csere!");
      }
    );

    await slider.create({
      data: {
        title: sliderTitle,
        img_name: newFileName,
        img_alt: sliderImageAlt,
      },
    });

    res.send({ success_msg: "Felhasználó létrehozva!" });
  }
});

router.put(
  "/updateSlider/:id",
  images.single("sliderImg"),
  async (req, res) => {
    const id = parseInt(req.params.id);
    const { sliderTitle, sliderImageAlt } = req.body;

    const doesntChange = await slider.findMany({
      where: { id },
      select: {
        title: true,
        img_name: true,
        img_alt: true,
      },
    });

    if (req.file !== undefined) {
      let fileType = req.file.mimetype.split("/")[1];

      if (fileType === "svg+xml") {
        fileType = fileType.split("+")[0];
      }

      let newFileName = req.file.filename + "." + fileType;

      rename(
        `uploads/images/slider/${req.file.filename}`,
        `uploads/images/slider/${newFileName}`,
        async (err) => {
          if (err) throw err;

          await slider.update({
            where: { id: id },
            data: { img_name: newFileName },
          });
        }
      );
    }

    if (sliderTitle === "undefined" && sliderImageAlt === "undefined") {
      return res.send({ error_msg: "A slider nem módosult!" });
    } else {
      if (sliderTitle !== "undefined") {
        await slider.update({
          where: { id: id },
          data: { title: sliderTitle },
        });
      }
      if (sliderImageAlt !== "undefined") {
        await slider.update({
          where: { id: id },
          data: { img_alt: sliderImageAlt },
        });
      }
      res.send({ success_msg: "Slider módosítva!" });
    }
  }
);

router.put("/deleteSliderImg/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const sliderImgName = await slider.findUnique({
    where: { id: id },
    select: {
      img_name: true,
    },
  });

  unlink(`uploads/images/slider/${sliderImgName.img_name}`, (err) => {
    if (err) throw err;
    console.log("kép törölve az uploads mappából!");
  });

  await slider.update({
    where: { id: id },
    data: { img_name: "", img_alt: "" },
  });
  res.send({ success_msg: "Kép törölve!" });
});

module.exports = router;
