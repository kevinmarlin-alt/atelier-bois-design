import { prisma } from "../lib/prisma";
import bcryptjs from "bcryptjs";

async function main() {

    const password = await bcryptjs.hash("Admin3322!", 10);

    const admin = await prisma.appUser.upsert({
        where: { email: "admin@atelier-bois-design.fr" },
        update: {},
        create: {
            firstname: "John", 
            lastname: "Doe",
            email: "admin@atelier-bois-design.fr",
            password: password
        }
    });

    const categories = await prisma.category.createMany({
        data: [
            { name: "Cuisine sur mesure" },
            { name: "Dressing" },
            { name: "Bibliothèque" },
            { name: "Mobilier professionnel" },
            { name: "Agencement intérieur" }
        ]
    })


    console.log({ 
        admin, 
        categories
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });