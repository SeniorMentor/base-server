module.exports = {
    unauthorizedRoute: (res) => {
        return res.status(401).json({
            message: "Unauthorized Route"
        })
    },
    invalidToken: (res) => {
        return res.status(401).json({
            message: "Invalid Token Login Again"
        })
    }
}