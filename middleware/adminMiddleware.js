const adminMiddleware = (req, res, next) => {

    const admin = req.user.role;

    if(admin !== "admin"){
        return res.status(403).json({ error: "Only admin access" });
    }else{
        next();
    }
}

module.exports = adminMiddleware;