import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from 'db/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['session-token'];

        if (!sessionToken) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        const user = await getUserBySessionToken(sessionToken);

        if (!user) {
            return res.status(401).send({ error: 'Not authenticated' });
        }
        
        merge(req, { identity: user });
    } catch (error) {
        return res.status(401).send({ error: 'Not authenticated' });
    }