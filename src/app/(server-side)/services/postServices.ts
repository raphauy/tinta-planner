
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

    return found
}


export async function getPostsWithDate(slug: string) {
    const found = await prisma.post.findMany({
        where: {
            client: {
                slug
            },
            date: {
                not: null
            }
        },
        orderBy: {
          id: 'desc'
        },
        include: {
            pilar: true
        }
      });

    return found
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
