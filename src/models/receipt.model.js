import { PrismaClient, ReceiptStatus } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    findMany: async (userId) => {
        try {
            let receipts = await prisma.receipts.findMany({
                where: {
                    userId: userId
                },
                include: {
                    detail: {
                        include: {
                            product: true
                        }
                    }
                }
            })

            return {
                status: true,
                message: "ok",
                data: receipts
            }
        }catch(err) {
            return {
                status: false,
                message: "failed",
                data: null
            }
        }
    },
    addToCart: async (userId, item) => {
        try {
            let cartExisted = await prisma.receipts.findMany({
                where: {
                    status: ReceiptStatus.shopping,
                    userId: userId
                },
                include: {
                    detail: {
                        include: {
                            product: true
                        }
                    }
                }
            })

            if(cartExisted.length != 0) {
                /* đã có giỏ hàng */
                let cart = cartExisted[0];
                let itemExsited = cart.detail.find(itemFind => itemFind.productId == item.productId)
                if(itemExsited) {
                    /* Đã tồn tại trong giỏ hàng */
                    await prisma.receipt_details.update({
                        where: {
                            id: itemExsited.id
                        },
                        data: {
                            ...item,
                            quantity: itemExsited.quantity += item.quantity
                        }
                    })
                }else {
                    /* Chưa tồn tại trong giỏ hàng */
                    await prisma.receipt_details.create({
                        data: {
                            ...item,
                            receiptId: cart.id
                        }
                    })
                }
                let nowCart = await prisma.receipts.findUnique({
                    where: {
                        id: cart.id
                    },
                    include: {
                        detail: {
                            include: {
                                product: true
                            }
                        }
                    }
                })

                return {
                    status: true,
                    message: "add to cart ok (old cart new item)",
                    data: nowCart
                } 
            }else {
                /* chưa có giỏ hàng */
                let newCart = await prisma.receipts.create({
                    data: {
                        userId,
                        createAt: String(Date.now()),
                        updateAt: String(Date.now()),
                        detail: {
                            create: [
                                item
                            ]
                        }
                    },
                    include: {
                        detail: {
                            include: {
                                product: true
                            }
                        }
                    }
                })
                return {
                    status: true,
                    message: "add to cart ok (new cart)",
                    data: newCart
                }
            }
        }catch(err) {
            console.log("err",err )
            return {
                status: false,
                message: "failed",
                data: null
            }
        }
    },
    deleteItem: async (itemId) => {
        try {
            await prisma.receipt_details.delete({
                where: {
                    id: Number(itemId)
                }
            })
            return {
                status: true,
                message: "ok",
                data: null
            }
        }catch(err) {
            return {
                status: false,
                message: "failed",
                data: null
            }
        }
    },
    updateItem: async (itemId, quantity) => {
        try {
            await prisma.receipt_details.update({
                where: {
                    id: Number(itemId)
                },
                data: {
                    quantity
                }
            })
            return {
                status: true,
                message: "ok",
                data: null
            }
        }catch(err) {
            return {
                status: false,
                message: "failed",
                data: null
            }
        }
    },
    pay: async (receiptId, data) => {
        try {
            let receipt = await prisma.receipts.update({
                where: {
                    id: Number(receiptId)
                },
                data: {
                    ...data,
                    pending: String(Date.now()),
                    updateAt: String(Date.now()),
                    status: 'pending'
                },
                include: {
                    detail: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            return {
                status: true,
                message: "ok",
                data: receipt
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