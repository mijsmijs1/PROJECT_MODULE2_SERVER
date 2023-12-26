import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    findMany: async () => {
        try {
            let categories = await prisma.categories.findMany()

            return {
                status: true,
                message: "ok",
                data: categories
            }
        }catch(err) {
            return {
                status: false,
                message: "failed",
                data: null
            }
        }
    }
}