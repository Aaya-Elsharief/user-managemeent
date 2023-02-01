import User from "../models";

const checkUser = async(username:string, email:string) =>{
    try{
        const usernameCheck  = await User.find({username}).count();
        const emailCheck  = await User.find({email}).count();

        return Promise.resolve({emailCheck,usernameCheck} );
      
    } catch (error) {
      return Promise.reject(error);
    }

}


export default checkUser;