module.exports = class UserDto{
    email;
    id;
    name;
    theme;
 
    constructor(model){
        this.email = model.email;
        this.id = model._id;
        this.name = model.name;
        this.theme = model.theme
    }
}