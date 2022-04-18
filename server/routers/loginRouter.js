const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { account } = new PrismaClient();
const bcrypt = require("bcrypt");

router.get("/getLogin/:id", async (req, res) => {
  const { id } = req.params;

  const user = await account.findUnique({
    where: { id: id },
    select: {
      id: true,
      username: true,
    },
  });
  res.send(user);
});

router.post("/createLogin", async (req, res) => {
  let { username, password } = req.body;

  const userExists = await account.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      password: true,
    },
  });

  if (userExists !== null) {
    if (userExists || (await bcrypt.compare(password, userExists.password))) {
      res.send({ success_msg: "Felhasználó létezik!", user: userExists });
    } else {
      return res.send({ error_msg: "Hibás felhasználónév vagy jelszó!" });
    }
  } else {
    if ((username && password) === "admin") {
      password = "admin";
      const encryptedPassword = await bcrypt.hash(password, 10);

      await account.create({
        data: {
          username: "admin",
          password: encryptedPassword,
        },
        select: {
          id: true,
        },
      });
    } else {
      console.log("nem jó adat!");
    }
    return;
  }
});

router.put("/updateLogin/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let { username, password } = req.body;

  if (username && password) {
    await account.update({
      where: { id: id },
      data: { username, password },
    });
    res.send({ success_msg: "Adatok módosítva!" });
  }
});

module.exports = router;
