const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../errors/api-errors');

class UserService {
    async registration(email, password, name) {
        const pretender = await UserModel.findOne({ email })
        if (pretender) {
            throw ApiError.BadRequestError('This email is already exist');
        }
        const hashedPassword = await bcrypt.hash(password, 3);

        const month = new Date().getMonth() + 1;
        let defaultTheme = '';
        switch (month) {
            case 12:
            case 1:
            case 2:
                defaultTheme = defaultTheme.replace('', 'winter');
                break;
            case 3:
            case 4:
            case 5:
                defaultTheme = defaultTheme.replace('', 'spring');
                break;
            case 6:
            case 7:
            case 8:
                defaultTheme = defaultTheme.replace('', 'summer');
                break;
            case 9:
            case 10:
            case 11:
                defaultTheme = defaultTheme.replace('', 'autumn');
                break;
        }

        const newUser = await UserModel.create({ email, password: hashedPassword, name, theme: defaultTheme })

        const userDto = new UserDto(newUser);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }
    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequestError('No users with this email');
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            throw ApiError.BadRequestError('Incorrect password');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const currentToken = await tokenService.findToken(refreshToken);
        if (!userData || !currentToken) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async getUserByEmail(email) {
        const userData = await UserModel.findOne({ email })
        if (!userData) {
            throw ApiError.BadRequestError('Incorrect email');
        }
        const userDto = new UserDto(userData);
        return userDto;
    }

    async changeTheme(email, theme) {
        const userData = await UserModel.findOne({ email })
        if (!userData) {
            throw ApiError.BadRequestError('Incorrect email');
        }
        userData.theme = theme;
        await userData.save();
        const userDto = new UserDto(userData);
        return userDto;
    }
}

module.exports = new UserService();