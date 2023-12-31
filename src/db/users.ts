import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    authentication: {
        password: { type: String, required: true, select: false},
        salt: { type: String, required: true, select: false},
        sessionToken: { type: String, select: false},
    }
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = async () => {
    return await UserModel.find();
};

export const getUserByEmail = async (email: string) => {
    return await UserModel.findOne({ email });
};

export const getUserBySessionToken = async (sessionToken: string) => {
    return await UserModel.findOne({ 'authentication.sessionToken': sessionToken });
};

export const getUserById = async (id: string) => {
    return await UserModel.findById(id);
};

export const createUser = async (values: Record<string, any>) => new UserModel(values).save().then((user: any) => user.toObject());

export const deleteUserById = async (id: string) => {
    UserModel.findByIdAndDelete(id);
};

export const updateUserById = async (id: string, values: Record<string, any>) => {
    UserModel.findByIdAndUpdate(id, values);
};