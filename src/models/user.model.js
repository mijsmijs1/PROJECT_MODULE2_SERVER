import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    register: async function(newUser, ip, deviceName) {
        try {
            let user = await prisma.users.create({
                data: {
                    ...newUser,
                    avatar: newUser.avatar ? newUser.avatar : process.env.AVATAR_DEFAULT,
                    createAt: String(Date.now() * Math.random()),
                    updateAt: String(Date.now() * Math.random()),
                    user_ip_list: {
                        create: [
                          {
                            ip,
                            deviceName,
                            createAt: String(Date.now())
                          }
                        ],
                    },
                  
                }
            })

            return {
                status: true,
                message: "registerOk",
                data: user
            }

        }catch(err) {
            let message = null;
            if(err?.meta?.target == "email") {
                message = "emailExisted";
            }

            if(err?.meta?.target == "users_userName_key") {
                message = "userNameExisted";
            }
            return {
                status: false,
                message: message ? message : "modelError",
                data: null
            }
        }
    },
    update: async function(userId,dataUpdate) {
        try {
            let user = await prisma.users.update({
                where: {
                    id: Number(userId)
                },
                data: dataUpdate
            })

            return {
                status: true,
                message: "updateOk",
                data: user
            }

        }catch(err) {
            let message = null;
            return {
                status: false,
                message: message ? message : "modelError",
                data: null
            }
        }
    },
    findUser: async function(usernameOrEmail) {
        try {
            let user = await prisma.users.findFirst({
                where: {
                    OR: [{ email: usernameOrEmail }, { userName: usernameOrEmail }],
                },
                include: {
                    user_ip_list: true
                }
            })

            return {
                status: true,
                data: user
            }

        }catch(err) {
            let message = null;
            return {
                status: false,
                message: message ? message : "modelError",
                data: null
            }
        }
    }
}