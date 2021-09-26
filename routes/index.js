module.exports = (app) => {
    app.use("/", require("./auth"));
    app.use("/", require("./group"));
    app.use("/", require("./post"));
    app.use("/", require("./user"));
};