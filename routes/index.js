module.exports = (app) => {
    app.use("/", require("./auth"));
    app.use("/", require("./group"));
    app.use("/", require("./post"));
    app.use("/", require("./user"));
    app.use("/", require("./event"));
    app.use("/public", require("./public"));
    app.use("/analytics", require("./analytics"));
};