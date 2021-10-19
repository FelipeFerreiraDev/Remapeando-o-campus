import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface UserProps {
    id: string;
    email: string;
    password?: string;
}

export default {
    async authenticate(request: Request, response: Response) {
        const repository = getRepository(User);
        const { email, password } = request.body;
        
        const user: UserProps | any = await repository.findOne({
            where: {email}
        })

        if(!user) {
            return response.status(401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) {
            return response.status(401)
        }

        const token = jwt.sign({ id: user.id }, 'handsonRemapeandoCampus2021CC', {
            expiresIn: '1d'
        });

        delete user.password;

        return response.json({
            user, token
        })

        
    }    
}