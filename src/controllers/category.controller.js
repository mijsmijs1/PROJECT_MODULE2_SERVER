import categoryModel from "../models/category.model";
export default {
    findMany: async (req, res) => {
        try {
            let {status, message, data} = await categoryModel.findMany();
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