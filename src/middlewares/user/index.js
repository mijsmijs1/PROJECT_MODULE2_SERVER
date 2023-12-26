import userModel from "../../models/user.model";
import { jwtService } from "../../services";
export default {
    tokenValidate: async (req, res, next) => {
        let tokenData = jwtService.decodeToken(req.params.token || req.headers.token);
        let {data} = await userModel.findUser(tokenData.userName);

        if(!data) {
            return res.status(500).json({
                message: "Token is not valid!"
            })
        }

        if(!tokenData) {
            return res.status(500).json({
                message: "Token is not valid!"
            })
        }

        if(data.updateAt != tokenData.updateAt) {
            return res.status(500).json({
                message: "Token is not valid!"
            })
        }

        req.tokenData = data;
        next()
    },
    tokenAdminValidate: async (req, res, next) => {
        let tokenData = jwtService.decodeToken(req.headers.token);
        let {data} = await userModel.findUser(tokenData.userName);

        if(!data) {
            return res.status(500).json({
                message: "Token is not valid!"
            })
        }

        if(data.role != "admin") {
            return res.status(500).json({
                message: "Token is not valid!"
            })
        }

        if(!tokenData) {
            return res.status(500).json({
                message: "Token is not valid!"
            })
        }

        if(data.updateAt != tokenData.updateAt) {
            return res.status(500).json({
                message: "Token is not valid!"
            })
        }

        req.tokenData = data;
        next()
    }
}