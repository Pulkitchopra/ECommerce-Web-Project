import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {

    try{
        const saltRounds = 9;

        const hashP = await bcrypt.hash(password, saltRounds);
        return hashP
    }catch(error){
        console.log(error);
    }
};


export const comparePassword = async (password, hashP) => {

    return bcrypt.compare(password, hashP)
}