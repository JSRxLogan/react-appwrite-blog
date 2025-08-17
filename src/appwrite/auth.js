import confi from "../confi/confi";
import {Client,Account,ID} from "appwrite"

class Authservices{
   Client = new Client();
   Account;

   constructor()
   {
    this.Client
    .setEndpoint(confi.appwriteUrl ) // Your API Endpoint
    .setProject(confi.appwriteProjectId); // Your project ID

    this.Account = new Account(this.Client)
   };

   async createAccount({email,password,name})
   {
    try {

        const userAccount = await this.Account.create(ID.unique(),email,password,name)

        if(userAccount)
        {
           return this.login({email,password})
        }

        else{
            console.log("Error , account couldnt be created[Empty] ")
            return userAccount;
        }
        
    } catch (error) {
        console.log("Create account error ::",error)
        throw error
    }
   };

   async login({email,password})
   {
    try {

        const userLogin = await this.Account.createEmailPasswordSession(email,password)

        if(userLogin)
        {
            return userLogin
        }

        else{
            console.log("error account couldnt be loggedin[empty details]")
            return userLogin
        }
        
    } catch (error) {
        console.log("Login Error ",error)
        throw error
    }
   };

   async getCurrentUser()
   {
    try {
        console.log("Getting current user")
        return this.Account.get()
    } catch (error) {
        console.log("Error in getting current user :: ",error)
        if (error.code === 401) {
            window.location.reload(); // Force reset
        }
        throw error
    }

    return null
   };

   async logOut()
   {
    try {
        return this.Account.deleteSessions()
    } catch (error) {
        console.log("Error in loggin out :: ",error)
        throw error
    }
   };

   isLoggedIn() {
    return !!this.getCurrentUser(); // return Boolean(this.getCurrentUser)
  }
}

const authservices = new Authservices();

export default authservices