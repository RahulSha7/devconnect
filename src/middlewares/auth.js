const adminauth = (req, res, next) => {
    console.log("admin auth");
    const token = "abced";
    const verify = "abcd";
    if (token === verify) {
        next();
    } else {
        res.status(401).send("unauthorized access");
    }
};

module.exports = { adminauth };
