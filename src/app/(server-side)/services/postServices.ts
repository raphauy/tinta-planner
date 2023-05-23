
import { prisma } from "../db";


export async function getPostsBySlug(slug: string) {
    const found = await prisma.post.findMany({
        where: {
            client: {
                slug
            }
        },
        orderBy: {
          id: 'desc'
        },
        include: {
            pilar: true
        }
      });

    //   console.log('Taking a break...');
    //   await sleep(3000);
    //   console.log('Three seconds later'); 
    
    return found
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
