import bcrypt from "bcrypt";

const EncryptPasswordAsync = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};

const ComparePasswords = async (plainTextPass: string, encryptedPass: string) => {
    return await bcrypt.compare(plainTextPass, encryptedPass);
};

export { EncryptPasswordAsync, ComparePasswords };