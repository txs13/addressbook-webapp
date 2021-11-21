import { CustomAPIError } from "../error/custom-error.js"

const errorHandlerMiddlWare = (err,req,res,next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg:'something went wrong, please try again'})
}

export default errorHandlerMiddlWare