
import { Post } from "@prisma/client";
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

export async function getPostsBySlugAndPilarId(slug: string, pilarId: number) {
    // max results 10
    const found = await prisma.post.findMany({
        where: {
            client: {
                slug
            },
            pilar: {
                id: pilarId
            }
        },
        orderBy: {
          date: 'desc'
        },
        include: {
            pilar: true
        },
        take: 15
      });

    return found
}

export async function getAllPosts() {
    const found = await prisma.post.findMany({
        orderBy: {
          id: 'desc'
        },
        include: {
            pilar: true,
            client: true
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

export async function updatePostStatus(id: string, status: string): Promise<Post | null> {  
    console.log('updatePostStatus', id, status)
    
    const updated= await prisma.post.update({
        where: {
            id
        },
        data: {
            status
        }
    })

    return updated
}


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getLastPostOfPilar(idParam: number): Promise<Post | null> {
    const id= parseInt(idParam.toString())
    
    const found = await prisma.post.findFirst({
        where: {
            pilar: {
                id
            },
            status: {
                not: 'draft'
            }
        },
        orderBy: {
            date: 'desc'
        },
        include: {
            pilar: true
        }
    });

    return found
}