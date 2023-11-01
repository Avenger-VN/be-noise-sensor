const express = require('express');
const userController = require("../controller/userController")


let router = express.Router();

let initWebRoutes = (app) => {
    
    router.post('/create-user', userController.handleCreateUser);
    router.get('/get-all-user', userController.handleGetAllUser);

    return app.use("/api/v1",router)
}

module.exports = initWebRoutes;