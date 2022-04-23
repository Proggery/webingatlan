const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { portfolio, portfolioCategory } = new PrismaClient();
const multer = require("multer");
const images = multer({ dest: "uploads/images/portfolio/" });
const { rename, unlink } = require("fs");
const { readdir } = require("fs/promises");

router.get("/getPortfolio", async (req, res) => {
  const getData = await portfolio.findMany({
    select: {
      id: true,
      title: true,
      text: true,
      icon_class: true,
      img_name: true,
      img_alt: true,
      category_name: true,
      category_ID: true,
    },
  });
  res.status(200).send(getData);
});
router.get("/getCategory/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let category;
  
  if (id) {
    category = await portfolio.findMany({
      where: {
        category_ID: id,
      },
      select: {
        title: true,
        text: true,
        img_name: true,
        img_alt: true,
      },
    });
  }

  const categoryMenuItems = await portfolio.findMany({
    distinct: ["category_name"],
    select: {
      category_name: true,
      category_ID: true
    },
    orderBy: {
      date: "asc",
    },
  });

  res.status(200).send({ category, categoryMenuItems });
});

router.post(
  "/createPortfolio",
  images.single("portfolioImg"),
  async (req, res) => {
    let {
      portfolioTitle,
      portfolioText,
      portfolioImageAlt,
      portfolioIconClass,
      portfolioCategoryName,
      portfolioCategoryID,
    } = req.body;

    if (
      !portfolioTitle &&
      !portfolioText &&
      !portfolioImageAlt &&
      !portfolioIconClass &&
      !req.file
    ) {
      return res.send({ error_message: "nincs adat kiválasztva!" });
    } else {
      let newFileName;

      if (req.file) {
        let fileType = req.file.mimetype.split("/")[1];

        if (fileType === "svg+xml") {
          fileType = fileType.split("+")[0];
        }

        newFileName = req.file.filename + "." + fileType;

        rename(
          `uploads/images/portfolio/${req.file.filename}`,
          `uploads/images/portfolio/${newFileName}`,
          (err) => {
            if (err) throw err;
            console.log("Sikeres kép név csere!");
          }
        );
      }

      portfolioCategoryID = parseInt(portfolioCategoryID);

      if (portfolioCategoryName !== undefined) {
        await portfolio.create({
          data: {
            title: portfolioTitle,
            text: portfolioText,
            icon_class: portfolioIconClass,
            img_name: newFileName,
            img_alt: portfolioImageAlt,
            category_ID: portfolioCategoryID,
            category_name: portfolioCategoryName,
          },
        });
      } else {
        await portfolio.create({
          data: {
            title: portfolioTitle,
            text: portfolioText,
            icon_class: portfolioIconClass,
            img_name: newFileName,
            img_alt: portfolioImageAlt,
          },
        });
      }
      res.send({ success_msg: "Szolgáltatás létrehozva!" });
    }
  }
);

router.put(
  "/updatePortfolio/:id",
  images.single("portfolioImg"),
  async (req, res) => {
    const id = req.params.id;

    console.log(id);
    console.log(req.body);

    let {
      portfolioTitle,
      portfolioText,
      portfolioImageAlt,
      portfolioIconClass,
      portfolioCategoryName,
      portfolioCategoryID,
    } = req.body;

    if (req.file !== undefined) {
      let fileType = req.file.mimetype.split("/")[1];

      if (fileType === "svg+xml") {
        fileType = fileType.split("+")[0];
      }

      let newFileName = req.file.filename + "." + fileType;

      rename(
        `uploads/images/portfolio/${req.file.filename}`,
        `uploads/images/portfolio/${newFileName}`,
        async (err) => {
          if (err) throw err;

          await portfolio.update({
            where: { id: id },
            data: { img_name: newFileName },
          });
        }
      );
    }

    if (
      portfolioTitle === "undefined" &&
      portfolioText === "undefined" &&
      portfolioImageAlt === "undefined" &&
      portfolioIconClass === "undefined" &&
      portfolioCategoryName === "undefined" &&
      portfolioCategoryID === "undefined"
    ) {
      return res.send({ error_msg: "A portfolio nem módosult!" });
    } else {
      if (portfolioTitle !== "undefined") {
        await portfolio.update({
          where: { id: id },
          data: { title: portfolioTitle },
        });
      }
      if (portfolioText !== "undefined") {
        await portfolio.update({
          where: { id: id },
          data: { title: portfolioText },
        });
      }
      if (portfolioImageAlt !== "undefined") {
        await portfolio.update({
          where: { id: id },
          data: { img_alt: portfolioImageAlt },
        });
      }
      if (portfolioIconClass !== "undefined") {
        await portfolio.update({
          where: { id: id },
          data: { title: portfolioIconClass },
        });
      }

      portfolioCategoryID = parseInt(portfolioCategoryID);

      console.log(portfolioCategoryID);
      if (portfolioCategoryName !== "undefined") {
        await portfolio.update({
          where: { id: id },
          data: { category_name: portfolioCategoryName },
        });
      }

      if (portfolioCategoryID !== NaN) {
        await portfolio.update({
          where: { id: id },
          data: { category_ID: portfolioCategoryID },
        });
      }

      res.send({ success_msg: "Portfolio módosítva!" });
    }
  }
);

router.put("/deletePortfolioImg/:id", async (req, res) => {
  const id = req.params.id;

  const portfolioImgName = await portfolio.findUnique({
    where: { id: id },
    select: {
      img_name: true,
    },
  });

  unlink(`uploads/images/portfolio/${portfolioImgName.img_name}`, (err) => {
    if (err) throw err;
    console.log("kép törölve az uploads mappából!");
  });

  await portfolio.update({
    where: { id: id },
    data: { img_name: "", img_alt: "", category_name: "", category_ID: 0 },
  });
  res.send({ success_msg: "Kép törölve!" });
});

module.exports = router;
