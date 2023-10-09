import express from 'express';
import { getUserByEmail, createUser } from 'db/users';
import { random, authentication } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;
        
        if (!email || !password || !username) {
            return res.status(400).json({ error: 'Invalid body' });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = random();

        const user = await createUser({ 
            email, 
            password: authentication(salt, password), 
            username, 
            salt 
        });

        res.status(200).json({ user }).end();

    } catch (error) {
        res.status(500).json({ error });
    }
}