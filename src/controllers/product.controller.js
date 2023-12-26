import productModel from "../models/product.model"
export default {
    create: async (req, res) => {
        try {
            let {newProduct, pictures} = req.body;
            let {status, message, data} = await productModel.create(newProduct, pictures);
            return res.status(status ? 200 : 500).json({
                message,
                data
            })
        }catch(err) {
            return res.status(500).json({
                message: "failed"
            })
        }
    },
    findMany: async (req, res) => {
        try {
            let {status, message, data} = await productModel.findMany();
            return res.status(status ? 200 : 500).json({
                message,
                data
            })
        }catch(err) {
            return res.status(500).json({
                message: "failed"
            })
        }
    }
}