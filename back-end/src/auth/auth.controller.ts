//@ts-nocheck
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// tạo token 
export const createShopifyDomainToken = (req: Request, res: Response): void => {
    const { shopify_domain } = req.body;

    //  check shopify_domain trong body
    if (!shopify_domain) {
        return res.status(400).json({ message: 'Missing shopify_domain' });
    }

    const currentTime = Math.floor(Date.now() / 1000); // time now 

    // Tạo token với shopify_domain và current_time
    const token = jwt.sign(
        { shopify_domain, current_time: currentTime },
        process.env.SECRET_KEY as string,
        { expiresIn: '1h' }
    );

    return res.json({ token: `Bearer ${token}` });
};


// tạo non-token 
export const createNonShopifyDomainToken = async (req: Request, res: Response): Promise<void> => {
    const currentTime = Math.floor(Date.now() / 1000); // time now 

    const token = jwt.sign(
        { current_time: currentTime },
        process.env.SECRET_KEY as string,
        { expiresIn: '1h' }
    );

    res.json({ token: `Bearer ${token}` });
};
