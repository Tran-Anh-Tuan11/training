import { Router } from 'express';
import { createNonShopifyDomainToken, createShopifyDomainToken } from '../auth/auth.controller';

const router = Router();

// shopify-token
router.post('/shopify-token', createShopifyDomainToken);

// non-shopify-token
router.post('/non-shopify-token', createNonShopifyDomainToken);

export default router;
