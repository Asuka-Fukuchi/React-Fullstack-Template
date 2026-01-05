import bcrypt from 'bcrypt';

import { User } from "../models/user.model";

// register
export async function createUserService
    (firstName: string,
        lastName: string,
        email: string,
        password: string,
        dob?: Date
    ){
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        dob,
        isAdmin: false
    });
    return user;
}

// login
export async function getUserByEmail(email: string) {
    const user = await User.findOne({ email }).select("+password");
    return user;
}

// auth me
export async function getAuthUserService(userId: string) {
    const user = await User.findById(userId).select("-password").lean();
    return user;
}