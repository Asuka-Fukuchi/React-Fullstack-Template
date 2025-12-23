import { User } from "../models/user.model";

// Update User by ID
export async function updateUserService(userId: string, updateData: any) {
    const updateUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        {
            new: true,
            runValidators: true
        });
    return updateUser;
}

// Delete user by id
export async function deleteUserService(userId: string) {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
}

// Admin
export async function getUsers() {
    const user = await User.find().select("-password");
    return user;
}