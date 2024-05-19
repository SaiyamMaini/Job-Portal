export default class UserModel{
    constructor(_id, _email, _password, _userName){
        this.email = _email;
        this.password = _password;
        this.id = _id;
        this.userName = _userName
    }

    static getUsers(){
        return users;
    }

    static addUser(user){
        let id = users.length + 1;
        let email = user.email;
        let password = user.password;
        let userName = user.name;
        let newUser = new UserModel(id, email, password, userName);
        users.push(newUser);
        return newUser;
    }

    static isValidUser(email, password){
        const user =   users.filter((user)=>{
              return user.email === email && user.password === password;
          })
          if(user.length > 0){
              return user[0];
          }else{
              return false;
          }
      }

      static findByEmail(email){
        const user = users.filter((user)=>{
            return user.email === email;
        })

        return user[0].userName;
      }
}


var users = [];