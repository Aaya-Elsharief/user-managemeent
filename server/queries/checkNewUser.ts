import { User, Admin } from "../models";

const checkUser = async (role: string, username: string, email: string) => {
  try {
    let nameCheck;
    let emailCheck;

    if (role === 'user') {
      nameCheck = await User.find({ username }).count();
      emailCheck = await User.find({ email }).count();
    } else {
      nameCheck = await Admin.find({ username }).count();
      emailCheck = await Admin.find({ email }).count();

    }

    return Promise.resolve({ nameCheck, emailCheck });

  } catch (error) {
    return Promise.reject(error);
  }

}


export default checkUser;