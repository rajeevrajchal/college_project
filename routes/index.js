module.exports = (app) => {
    app.use('/schedule', require("./scheduleRoute"))
    app.get('/', (req, res) => {
        res.send('This is college projects')
    })
}
