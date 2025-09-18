export const sendResponse = (res, success, status, message, result) => {
    res.status(json({
        status: status,
        success: success,
        message: message,
        data: result
    }))
}