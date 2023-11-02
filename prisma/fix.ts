import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Fixing...")

  await setAdminToRapha()
  console.log("Admin set to Rapha")
  
  await fixAgencyIdOnUsers()

  await fixPostsStatus()
  console.log("Posts status fixed")

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

async function fixPostsStatus() {
  await prisma.post.updateMany({
    where: {
      date: {
        not: null
      }
    },
    data: {
      status: "Aprobado"
    }
  })
  await prisma.post.updateMany({
    where: {
      date: null
    },
    data: {
      status: "Draft"
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
