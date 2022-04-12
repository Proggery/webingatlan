const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { about, aboutListing } = new PrismaClient();
const multer = require("multer");
const images = multer({ dest: "uploads/images/about/" });
const { rename, unlink } = require("fs");
const { readdir } = require("fs/promises");

router.get("/getAbout", async (req, res) => {
  const getData = await about.findMany({
    select: {
      id: true,
      title: true,
      subtitle: true,
      text: true,
      text2: true,
      img_name: true,
      img_alt: true,
    },
  });
  res.status(200).send(getData[0]);
});

router.post("/createAbout", images.single("aboutImg"), async (req, res) => {
  const {
    aboutTitle,
    aboutSubTitle,
    aboutText,
    aboutText2,
    aboutImageAlt,
    listingItem,
  } = req.body;

  if (
    !aboutTitle &&
    !aboutSubTitle &&
    !aboutText &&
    !aboutText2 &&
    !aboutImageAlt &&
    !listingItem &&
    !req.file
  ) {
    return res.send({ error_message: "nincs adat kiválasztva!" });
  } else {
    let newFileName = "";

    if (req.file) {
      let fileType = req.file.mimetype.split("/")[1];

      if (fileType === "svg+xml") {
        fileType = fileType.split("+")[0];
      }

      newFileName = req.file.filename + "." + fileType;

      rename(
        `uploads/images/about/${req.file.filename}`,
        `uploads/images/about/${newFileName}`,
        (err) => {
          if (err) throw err;
          console.log("Sikeres kép név csere!");
        }
      );
    }

    await about.create({
      data: {
        title: aboutTitle,
        subtitle: aboutSubTitle,
        text: aboutText,
        text2: aboutText2,
        img_name: newFileName,
        img_alt: aboutImageAlt,
      },
    });

    await aboutListing.create({
      data: {
        title: listingItem,
      },
    });

    res.send({ success_msg: "Felhasználó létrehozva!" });
  }
});

router.put("/updateAbout/:id", images.single("aboutImg"), async (req, res) => {
  const id = parseInt(req.params.id);
  const { aboutTitle, aboutSubTitle, aboutText, aboutText2, aboutImageAlt } =
    req.body;

    console.log(aboutText2)

  if (req.file !== undefined) {
    let fileType = req.file.mimetype.split("/")[1];

    if (fileType === "svg+xml") {
      fileType = fileType.split("+")[0];
    }

    let newFileName = req.file.filename + "." + fileType;

    rename(
      `uploads/images/about/${req.file.filename}`,
      `uploads/images/about/${newFileName}`,
      async (err) => {
        if (err) throw err;

        await about.update({
          where: { id: id },
          data: { img_name: newFileName },
        });
      }
    );
  }

  if (
    aboutTitle === "undefined" &&
    aboutSubTitle === "undefined" &&
    aboutText === "undefined" &&
    aboutText2 === "undefined" &&
    aboutImageAlt === "undefined" &&
    listingItem === "undefined"
  ) {
    return res.send({ error_msg: "A slider nem módosult!" });
  } else {
    if (aboutTitle !== "undefined") {
      await about.update({
        where: { id: id },
        data: { title: aboutTitle },
      });
    }
    if (aboutSubTitle !== "undefined") {
      await about.update({
        where: { id: id },
        data: { subtitle: aboutSubTitle },
      });
    }
    if (aboutText !== "undefined") {
      await about.update({
        where: { id: id },
        data: { text: aboutText },
      });
    }
    if (aboutText2 !== "undefined") {
      await about.update({
        where: { id: id },
        data: { text2: aboutText2 },
      });
    }
    if (aboutImageAlt !== "undefined") {
      await about.update({
        where: { id: id },
        data: { img_alt: aboutImageAlt },
      });
    }
    res.send({ success_msg: "Rólunk módosítva!" });
  }
});

router.put("/updateListing/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { listingItem } = req.body;

  if (listingItem === "undefined") {
    return res.send({ error_msg: "A slider nem módosult!" });
  } else {
    if (listingItem !== "undefined") {
      await aboutListing.update({
        where: { id: id },
        data: { title: listingItem },
      });
    }
    res.send({ success_msg: "Listaelem módosítva!" });
  }
});

router.put("/deleteAboutImg/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const sliderImgName = await about.findUnique({
    where: { id: id },
    select: {
      img_name: true,
    },
  });

  unlink(`uploads/images/about/${sliderImgName.img_name}`, (err) => {
    if (err) throw err;
    console.log("kép törölve az uploads mappából!");
  });

  await about.update({
    where: { id: id },
    data: { img_name: "" },
  });
  res.send({ success_msg: "Kép törölve!" });
});

router.get("/getListing", async (req, res) => {
  const getData = await aboutListing.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  res.status(200).send(getData);
});

router.post("/createListing", async (req, res) => {
  const { listingItem } = req.body;

  await aboutListing.create({
    data: {
      title: listingItem,
    },
  });

  res.send({ success_msg: "Felhasználó létrehozva!" });
});

router.delete("/deleteListing/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  await aboutListing.delete({
    where: {
      id: id,
    },
  });

  res.send({ success_msg: "Listaelem törölve!" });
});

module.exports = router;
