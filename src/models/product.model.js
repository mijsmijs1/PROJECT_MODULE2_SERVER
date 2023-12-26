import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    create: async (newProduct, picture) => {
        try {
            let product = await prisma.products.create({
                data: {
                    ...newProduct,
                    pictures: {
                        create: [
                            ...picture
                        ]
                    }
                },
                include: {
                    pictures: true,
                    category: true
                }
            })

            return {
                status: true,
                message: "ok",
                data: product
            }
        }catch(err) {
            return {
                status: false,
                message: "failed",
                data: null
            }
        }
    },
    findMany: async () => {
        try {
            let products = await prisma.products.findMany({
                include: {
                    pictures: true,
                    category: true
                }
            })

            return {
                status: true,
                message: "ok",
                data: products
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