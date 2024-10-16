//@ts-nocheck
import { Request, Response } from 'express';
import { ShopService } from './shop.service';
import { EntityManager } from 'typeorm';

export class ShopController {
    private shopService: ShopService;

    constructor(entityManager: EntityManager) {
        this.shopService = new ShopService(entityManager);
    }

    // Tạo shop mới
    async createShop(req: Request, res: Response): Promise<void> {
        const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header

        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        try {
            // Lấy thông tin từ body
            const { shopify_domain, shop_owner } = req.body;

            // Tạo shop mới bằng service
            const shop = await this.shopService.createShop({ shopify_domain, shop_owner });
            res.status(201).json(shop);  // Trả về thông tin shop đã tạo
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while creating the shop.' });
        }
    }

    // Lấy thông tin shop
    async getShop(req: Request, res: Response): Promise<void> {
        const { shopify_domain } = req.user as { shopify_domain: string }; // Lấy từ token đã xác thực

        if (!shopify_domain) {
            return res.status(400).json({ message: 'shopify_domain is missing from the token' });
        }

        try {
            const shop = await this.shopService.getShop(shopify_domain);
            if (!shop) {
                return res.status(404).json({ message: 'Shop not found' });
            }
            res.status(200).json(shop);  // Trả về thông tin shop
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while fetching the shop.' });
        }
    }
}
