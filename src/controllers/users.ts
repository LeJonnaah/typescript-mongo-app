import express from 'express';

import { deleteUserById, getUserById, getUsers } from 'db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUsers();

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const user = await deleteUserById(id);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { username } = req.body;
        const { id } = req.params;

        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const user = await getUserById(id);

        user.username = username;

        await user.save();

        return res.status(200).json(user).end();
    } catch (error) {
        return res.status(500).json(error); 
    }
}