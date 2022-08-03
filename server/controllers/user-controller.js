const userService = require("../services/user-service");
const {validationResult} = require('express-validator');
const ApiError = require("../errors/api-errors");

class UserController {
    async getUsers(req, res, next){
        try {
            const users = await userService.getUsers();
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async getUserByEmail(req, res, next){
        try {
            const {email} = req.params;
            const user = await userService.getUserByEmail(email);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async changeTheme(req, res, next){
        try {
            const {email, theme} = req.body;
            const user = await userService.changeTheme(email, theme);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
    
    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    
    async login(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    
    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const token =  await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
    
    async registration(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequestError('Validation error', errors.array()))
            }
            const {email, password, name} = req.body;
            const userData = await userService.registration(email, password, name);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();