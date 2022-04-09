const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { admin } = new PrismaClient();

router.get("/getAdmin", async (req, res) => {
  const getUserData = await admin.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      company: true,
      address: true,
      phone: true,
      email: true,
    },
  });
  res.status(200).send(getUserData[0]);
});

router.post("/createAdmin", async (req, res) => {
  const {
    adminFirstname,
    adminLastname,
    adminCompany,
    adminAddress,
    adminPhone,
    adminEmail,
  } = req.body;

  await admin.create({
    data: {
      firstname: adminFirstname,
      lastname: adminLastname,
      company: adminCompany,
      address: adminAddress,
      phone: adminPhone,
      email: adminEmail,
    },
  });
  res.send({ success_msg: "Felhasználó létrehozva!" });
});

router.put("/updateAdmin/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    adminFirstname,
    adminLastname,
    adminCompany,
    adminAddress,
    adminPhone,
    adminEmail,
  } = req.body;

  const doesntChange = await admin.findMany({
    where: { id },
    select: {
      firstname: true,
      lastname: true,
      company: true,
      address: true,
      phone: true,
      email: true,
    },
  });

  if (
    adminFirstname === doesntChange[0].firstname &&
    adminLastname === doesntChange[0].lastname &&
    adminCompany === doesntChange[0].company &&
    adminAddress === doesntChange[0].address &&
    adminPhone === doesntChange[0].phone &&
    adminEmail === doesntChange[0].email
  ) {
    return res.send({ error_msg: "A felhasználó nem módosult!" });
  } else {
    await admin.update({
      where: { id: id },
      data: {
        firstname: adminFirstname,
        lastname: adminLastname,
        company: adminCompany,
        address: adminAddress,
        phone: adminPhone,
        email: adminEmail,
      },
    });
    res.send({ success_msg: "Felhasználó módosítva!" });
  }
});

module.exports = router;
