import receiptModel from "../models/receipt.model";
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment
const qs = require('qs')
const config = {
    appid: process.env.ZALO_APP_ID,
    key1: process.env.ZALO_KEY1,
    key2: process.env.ZALO_KEY2
};

export default {
    findMany: async (req, res) => {
        try {
            let { status, message, data } = await receiptModel.findMany(Number(req.tokenData.id));
            return res.status(status ? 200 : 500).json({
                message,
                data
            })
        } catch (err) {
            return res.status(500).json({
                message: "failed"
            })
        }
    },
    addToCart: async (req, res) => {
        try {
            let { status, message, data } = await receiptModel.addToCart(Number(req.tokenData.id), req.body);
            return res.status(status ? 200 : 500).json({
                message,
                data
            })
        } catch (err) {
            return res.status(500).json({
                message: "failed"
            })
        }
    },
    deleteItem: async (req, res) => {
        try {
            let { status, message } = await receiptModel.deleteItem(Number(req.params.itemId));
            return res.status(status ? 200 : 500).json({
                message
            })
        } catch (err) {
            return res.status(500).json({
                message: "failed"
            })
        }
    },
    updateItem: async (req, res) => {
        try {
            let { status, message } = await receiptModel.updateItem(Number(req.body.itemId), Number(req.body.quantity));
            return res.status(status ? 200 : 500).json({
                message
            })
        } catch (err) {
            return res.status(500).json({
                message: "failed"
            })
        }
    },
    pay: async (req, res) => {
        try {
            let { status, message, data } = await receiptModel.pay(Number(req.params.receiptId), req.body);
            return res.status(status ? 200 : 500).json({
                message,
                data
            })
        } catch (err) {
            return res.status(500).json({
                message: "failed"
            })
        }
    },
    zaloCreateReceipt: async (req, res) => {
        try {
            const embeddata = {
                merchantinfo: ""
            };

            const order = {
                appid: config.appid,
                apptransid: `${moment().format('YYMMDD')}_${Math.ceil(Date.now() * Math.random())}_${req.body.receiptId}`,
                appuser: req.body.userName,
                apptime: Date.now(),
                item: JSON.stringify(""),
                embeddata: JSON.stringify(embeddata),
                amount: Number(req.body.total),
                description: "Thanh toán đơn hàng cho Ya Miêu",
                bankcode: "zalopayapp",
            };

            const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
            order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

            let result = await axios.post(process.env.CREATE_RECEIPT_API, null, { params: order })
            if (result.data.returncode == 1) {
                return res.status(200).json({
                    qrCodeUrl: result.data.orderurl,
                    orderId: order.apptransid
                })
            } else {
                throw "Zalo Error"
            }
        } catch (err) {
            console.log("err", err)
        }
    },
    zaloCheck: async (req, res) => {
        try {
            let postData = {
                appid: config.appid,
                apptransid: req.params.zaloReceiptId
            }
            let data = postData.appid + "|" + postData.apptransid + "|" + config.key1; // appid|apptransid|key1
            postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

            let postConfig = {
                method: 'post',
                url: process.env.ZALO_CHECK_API,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify(postData)
            };

            let result = await axios(postConfig)
            if (result.data.returncode != 1) {
                throw "err"
            }

            return res.status(200).json({
                status: true
            })


        } catch (err) {
            return res.status(200).json({
                status: false
            })
        }
    }
}