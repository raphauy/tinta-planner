import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Fixing...")

  await setAdminToRapha()
  console.log("Admin set to Rapha")
  
  await fixAgencyIdOnUsers()

  console.log("Done!")
}

async function fixAgencyIdOnUsers() {

  const agencyId= 1
  await prisma.user.updateMany({
    where: {
      agencyId: null
    },
    data: {
      agencyId
    }
  })
  
}

async function setAdminToRapha() {
  const admin = await prisma.user.findUnique({
    where: {
      email: "rapha.uy@rapha.uy",
    },
  })
  if (!admin) {
    throw new Error("Admin not found")
  }
  // update with admin role
  await prisma.user.update({
    where: {
      id: admin.id,
    },
    data: {
      role: "admin",
    },
  })
  
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
