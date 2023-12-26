import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

import userList from './user'
import categoryList from './category'
import productList from './product'
import pictureList from './picture';
import ipList from './ip'
(async () => {
    try {
        await prisma.users.createMany({
            data: [
                ...userList
            ]
        })
        await prisma.categories.createMany({
            data: [
                ...categoryList
            ]
        })
        await prisma.products.createMany({
            data: [
                ...productList
            ]
        })
        await prisma.pictures.createMany({
            data: [
                ...pictureList
            ]
        })
        await prisma.user_ip_list.createMany({
            data: [
                ...ipList
            ]
        })
    }catch(err) {
        console.log("da vao err", err)
    }
})()