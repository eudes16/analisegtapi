import { TCreateToken } from "./ports/TJwtToken";

const jwt = require('jsonwebtoken');

const generateToken: TCreateToken = async (payload: any, secret: string, expiresIn: string = "1d") => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "1d",
    });

    return token;
}


export default generateToken