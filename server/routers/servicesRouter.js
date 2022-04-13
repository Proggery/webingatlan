const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { services } = new PrismaClient();
const multer = require("multer");
const images = multer({ dest: "uploads/images/services/" });
const { rename, unlink } = require("fs");
const { readdir } = require("fs/promises");

router.get("/getServices", async (req, res) => {
  const getData = await services.findMany({
    select: {
      id: true,
      title: true,
      box_title: true,
      text: true,
      img_name: true,
      img_alt: true,
      icon_class: true,
    },
  });
  res.status(200).send(getData);
});

router.post(
  "/createServices",
  images.single("servicesImg"),
  async (req, res) => {
    const {
      servicesTitle,
      servicesBoxTitle,
      servicesText,
      servicesImageAlt,
      servicesIconClass,
    } = req.body;

    if (
      !servicesTitle &&
      !servicesBoxTitle &&
      !servicesText &&
      !servicesImageAlt &&
      !servicesIconClass &&
      !req.file
    ) {
      return res.send({ error_message: "nincs adat kiválasztva!" });
    } else {
      let fileType = req.file.mimetype.split("/")[1];

      if (fileType === "svg+xml") {
        fileType = fileType.split("+")[0];
      }

      let newFileName = req.file.filename + "." + fileType;

      rename(
        `uploads/images/services/${req.file.filename}`,
        `uploads/images/services/${newFileName}`,
        (err) => {
          if (err) throw err;
          console.log("Sikeres kép név csere!");
        }
      );

      await services.create({
        data: {
          title: servicesTitle,
          box_title: servicesBoxTitle,
          text: servicesText,
          img_name: newFileName,
          img_alt: servicesImageAlt,
          icon_class: servicesIconClass,
        },
      });

      res.send({ success_msg: "Szolgáltatás létrehozva!" });
    }
  }
);

router.put(
  "/updateServices/:id",
  images.single("servicesImg"),
  async (req, res) => {
    const id = parseInt(req.params.id);
    const {
      servicesTitle,
      servicesBoxTitle,
      servicesText,
      servicesImageAlt,
      servicesIconClass,
    } = req.body;

    if (req.file !== undefined) {
      let fileType = req.file.mimetype.split("/")[1];

      if (fileType === "svg+xml") {
        fileType = fileType.split("+")[0];
      }

      let newFileName = req.file.filename + "." + fileType;

      rename(
        `uploads/images/services/${req.file.filename}`,
        `uploads/images/services/${newFileName}`,
        async (err) => {
          if (err) throw err;

          await services.update({
            where: { id: id },
            data: { img_name: newFileName },
          });
        }
      );
    }

    if (
      servicesTitle === "undefined" &&
      servicesBoxTitle === "undefined" &&
      servicesText === "undefined" &&
      servicesImageAlt === "undefined" &&
      servicesIconClass === "undefined"
    ) {
      return res.send({ error_msg: "A services nem módosult!" });
    } else {
      if (servicesTitle !== "undefined") {
        await services.update({
          where: { id: id },
          data: { title: servicesTitle },
        });
      }
      if (servicesBoxTitle !== "undefined") {
        await services.update({
          where: { id: id },
          data: { title: servicesBoxTitle },
        });
      }
      if (servicesText !== "undefined") {
        await services.update({
          where: { id: id },
          data: { title: servicesText },
        });
      }
      if (servicesImageAlt !== "undefined") {
        await services.update({
          where: { id: id },
          data: { img_alt: servicesImageAlt },
        });
      }
      if (servicesIconClass !== "undefined") {
        await services.update({
          where: { id: id },
          data: { title: servicesIconClass },
        });
      }
      res.send({ success_msg: "Services módosítva!" });
    }
  }
);

router.put("/deleteServicesImg/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const servicesImgName = await services.findUnique({
    where: { id: id },
    select: {
      img_name: true,
    },
  });

  unlink(`uploads/images/services/${servicesImgName.img_name}`, (err) => {
    if (err) throw err;
    console.log("kép törölve az uploads mappából!");
  });

  await services.update({
    where: { id: id },
    data: { img_name: "", img_alt: "" },
  });
  res.send({ success_msg: "Kép törölve!" });
});

module.exports = router;
