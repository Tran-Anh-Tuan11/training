// shop.routes.ts
import { Router } from 'express';

import { AppDataSource } from '../database/data-source';
import { authenticateToken } from '../middleware/auth.middleware';
import { ShopController } from '../shop/shop.controller';

const router = Router();
const entityManager = AppDataSource.manager;
const shopController = new ShopController(entityManager);

router.post('/', shopController.createShop.bind(shopController));
router.get('/', authenticateToken, shopController.getShop.bind(shopController));

export default router;
