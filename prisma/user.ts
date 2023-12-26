import { UserRole } from "@prisma/client";

export default  [
    {
        userName: "admin",
        email: "tieucamieu@gmail.com",
        emailConfirm: true,
        password: "$2b$10$MxOCvRasftHXk7WzbJvhEu9V.2T8NhzjZVBW8d1sxHMzQiT5J07v2",
        role: UserRole.admin,
        avatar: "https://www.shutterstock.com/image-vector/admin-account-user-avatar-25-260nw-2335684007.jpg",
        createAt: String(Date.now()),
        updateAt: String(Date.now()),
    }
]