export const asyncHandler = (fn) => {
    return (res, req, next) => {
        fn(res, req, next).catch(error => {
            return next(new Error(error, { cause: 500 }))
        })
    }
}
export const globalErrorHandling = (error, req, res, next) => {
    return res.status(error.cause || 400).json({ message: "Server Error", error, msg: error.message, stack: error.stack })
}