import { prisma } from "../app/(server-side)/db";
import fs from 'fs';
import getAllWsets from "./wsetService";

export async function start() {
  const allWsets = await getAllWsets()
  console.log('allWsets', allWsets)

  // Leer el archivo JSON
  const data = fs.readFileSync('wset.json', 'utf8')

  // Parsear el JSON
  const institutes = JSON.parse(data)

  console.log(institutes.length, `institutes`)
  
  // Recorrer el JSON
  institutes.forEach(async (institute: any) => {
    await prisma.wset.create({
      data: {
        institute: institute.institute,
        location: institute.location,
        email: institute.email,
        phone: institute.phone,
        website: institute.website,
      },
    })
  })
  console.log('done');
  
  const allWsetsFinal = await getAllWsets()
  console.log('allWsetsFinal', allWsetsFinal)

}

async function main() {
  start()
}

main()