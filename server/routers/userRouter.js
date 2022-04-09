const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { user_config } = new PrismaClient();
const multer = require("multer");
const images = multer({ dest: "uploads/images/profile-img/" });
const { rename, unlink } = require("fs");
const { readdir } = require("fs/promises");

router.get("/getUser", async (req, res) => {
  const getUserData = await user_config.findMany({
    select: {
      id: true,
      name: true,
      desc: true,
      img_alt: true,
      img_name: true,
    },
  });
  res.status(200).send(getUserData[0]);
});

router.post("/createUser", images.single("profileImg"), async (req, res) => {
  const { name, desc, alt } = req.body;

  if (!req.file) {
    return console.log({ error_message: "Nincs kép kiválasztva!" });
  }
  if (!name && !desc && !alt) {
    try {
      const files = await readdir("uploads/images/profile-img/");
      for (const file of files) {
        unlink(`uploads/images/profile-img/${file}`, (err) => {
          if (err) throw err;
          console.log("kép törölve az uploads mappából!");
        });
      }
    } catch (err) {
      console.error(err);
    }
    return res.send({ error_message: "Az egyik mező kitöltése kötelező!" });
  } else {
    let fileType = req.file.mimetype.split("/")[1];

    if (fileType === "svg+xml") {
      fileType = fileType.split("+")[0];
    }

    let newFileName = req.file.filename + "." + fileType;

    rename(
      `uploads/images/profile-img/${req.file.filename}`,
      `uploads/images/profile-img/${newFileName}`,
      (err) => {
        if (err) throw err;
        console.log("Sikeres kép név csere!");
      }
    );

    await user_config.create({
      data: {
        name,
        desc,
        img_alt: alt,
        img_name: newFileName,
      },
    });

    res.send({ success_msg: "Felhasználó létrehozva!" });
  }
});

router.put("/updateUser/:id", images.single("profileImg"), async (req, res) => {
  const id = parseInt(req.params.id);
  let { name, desc, alt } = req.body;

  const doesntChange = await user_config.findMany({
    where: { id },
    select: {
      name: true,
      desc: true,
      // img_name: true,
      // img_alt: true,
    },
  });

  if (name === doesntChange[0].name && desc === doesntChange[0].desc) {
    return res.send({ error_msg: "A felhasználó nem módosult!" });
  } else {
    if (req.file !== undefined) {
      let fileType = req.file.mimetype.split("/")[1];

      if (fileType === "svg+xml") {
        fileType = fileType.split("+")[0];
      }

      let newFileName = req.file.filename + "." + fileType;

      rename(
        `uploads/images/profile-img/${req.file.filename}`,
        `uploads/images/profile-img/${newFileName}`,
        async (err) => {
          if (err) throw err;

          await user_config.update({
            where: { id: id },
            data: { img_name: newFileName },
          });
        }
      );
    }

    await user_config.update({
      where: { id: id },
      data: { name, desc, img_alt: alt },
    });
    res.send({ success_msg: "Felhasználó módosítva!" });
  }
});

router.put("/deleteUser/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const profileImgName = await user_config.findUnique({
    where: { id: id },
    select: {
      img_name: true,
    },
  });

  unlink(`uploads/images/profile-img/${profileImgName.img_name}`, (err) => {
    if (err) throw err;
    console.log("kép törölve az uploads mappából!");
  });

  await user_config.update({
    where: { id: id },
    data: { img_name: "", img_alt: "" },
  });
  res.send({ success_msg: "Kép törölve!" });
});

module.exports = router;
