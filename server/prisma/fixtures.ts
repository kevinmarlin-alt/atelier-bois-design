import { prisma } from "../lib/prisma";

async function main() {
    const kitchen = await prisma.project.create({
      data: {
          title: "Cuisine en chêne massif",
          description: "Commodo incididunt exercitation labore ut ad laboris minim enim minim magna et irure elit. Sint aliquip eiusmod nulla ex fugiat cupidatat ipsum nulla. Deserunt aliquip qui deserunt nostrud magna eu enim anim occaecat. Mollit ex cupidatat commodo anim qui quis consequat reprehenderit dolor laboris commodo non do. Laborum sint eu duis minim eu aliqua excepteur ipsum proident Lorem enim consectetur fugiat. Eiusmod velit adipisicing ad amet incididunt enim. Ut commodo tempor ut aliquip enim. Occaecat ex ullamco eu non minim dolore do ullamco ipsum ad dolore duis labore. Lorem ipsum ea sunt pariatur adipisicing quis anim fugiat.",
          slug: "cuisine-chene-massif",
          categoryId: 1,
          status: "published"
        }
      })
    const dressing = await prisma.project.create({
      data: {
          title: "Dessing modulaire",
          description: "Ipsum excepteur ex laboris magna. Elit culpa officia officia dolore aliquip ea voluptate est exercitation. Amet minim eiusmod proident amet ut officia et. Enim enim nulla veniam eiusmod aute consectetur reprehenderit Lorem. Labore ullamco nulla deserunt tempor qui. Amet enim commodo laboris consectetur ullamco do elit occaecat. Quis et id cupidatat pariatur pariatur sint ipsum occaecat officia dolore in. Adipisicing anim elit enim veniam adipisicing ex veniam. Cillum occaecat dolor dolore consequat in culpa enim eu esse Lorem. Occaecat pariatur quis sunt anim sit aliquip in nulla fugiat commodo consectetur. Quis eu Lorem ea voluptate eiusmod labore ipsum officia veniam nisi esse labore anim ad. Do eu anim adipisicing incididunt adipisicing labore ipsum Lorem eiusmod id magna excepteur. Excepteur amet veniam sint cupidatat dolor duis eiusmod eu esse. Lorem incididunt deserunt dolor qui elit non ullamco commodo nisi. Sit consequat ea esse esse cupidatat enim tempor ipsum ullamco. Cupidatat fugiat anim excepteur reprehenderit occaecat nisi. Adipisicing sint fugiat dolor adipisicing qui aliqua veniam. Anim ea deserunt non ea minim adipisicing elit tempor nisi et anim.",
          slug: "dessing-modulaire",
          categoryId: 2,
          status: "published"
        }
      })
        
      

    const testimonials = await prisma.testimonial.createMany({
      data: [
        {
          title: "Superbe réalisation de cuisine",
          content: "Proident amet voluptate laboris ullamco dolore do Lorem. Enim adipisicing quis deserunt laborum ipsum dolore laboris est proident. Eiusmod aute qui nisi et cillum pariatur fugiat consectetur ut mollit sunt magna minim. Sit deserunt veniam deserunt dolore in qui eu qui fugiat ex sint. Eiusmod cupidatat elit Lorem officia sunt elit ea. Mollit cupidatat dolor sunt laborum ex dolore in minim. Officia deserunt dolor officia eiusmod officia.",
          author: "John Doe",
          projectId: kitchen.id,
          status: "published"
        },
        {
          title: "Superbe réalisation de dessing",
          content: "Proident amet voluptate laboris ullamco dolore do Lorem. Enim adipisicing quis deserunt laborum ipsum dolore laboris est proident. Eiusmod aute qui nisi et cillum pariatur fugiat consectetur ut mollit sunt magna minim. Sit deserunt veniam deserunt dolore in qui eu qui fugiat ex sint. Eiusmod cupidatat elit Lorem officia sunt elit ea. Mollit cupidatat dolor sunt laborum ex dolore in minim. Officia deserunt dolor officia eiusmod officia.",
          author: "John Doe",
          projectId: dressing.id,
          status: "published"
        }
      ]
    })
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