import bcrypt from 'bcrypt';

export const hashPassword =  async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
}

export const passwordValidation = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
}