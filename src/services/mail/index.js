import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'

let productData = {
    name: "PHUQUY",
    link: "http://127.0.0.1:5173",
    copyright: `Copyright © 2023 PhuQuy. All rights reserved.`
};

export const template = {
    newAccount: (user, link, locales, product = productData) => {
        try {
            var mailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    name: product.name,
                    link: product.link,
                    copyright: product.copyright
                }
            });
            let templateVI = mailGenerator.generate({
                body: {
                    name: user.userName,
                    intro: `Xin chào ${user.userName}! Chúng tôi rất vui vì bạn đã đăng ký tham gia cộng đồng của chúng tôi!`,
                    action: {
                        instructions: `Để xác thực tài khoản vui lòng bấm vào liên kết bên dưới`,
                        button: {
                            color: '#22BC66',
                            text: 'Xác thực email',
                            link
                        }
                    },
                    outro: 'Nếu bạn cần sự trợ giúp, hãy phản hồi tại email này.',
                    // greeting: '',
                    signature: `Trân trọng`
                }
            })
            let templateEN = mailGenerator.generate({
                body: {
                    name: user.userName,
                    intro: `Hello ${user.userName}! We are very happy that you have registered to join our community!`,
                    action: {
                        instructions: `To verify your account, please click on the link below`,
                        button: {
                            color: '#22BC66',
                            text: 'Verify email',
                            link
                        }
                    },
                    outro: 'If you need any help, please reply to this email.',
                    signature: `Best regards`
                }
            })
            
            switch (locales) {
                case "vi":
                    return templateVI
                case "en":
                    return templateEN
                default :
                    return templateEN
            }

        } catch (err) {
            return null
        }
    }
}

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

async function sendMail(to, subject, html, from = process.env.MAIL_USERNAME) {
    try {
        var mailOptions = {
            from,
            to,
            subject,
            html
        };
        await transporter.sendMail(mailOptions);
        return true
    } catch (err) {
        return false
    }
}

export default {
    sendMail,
    template
}