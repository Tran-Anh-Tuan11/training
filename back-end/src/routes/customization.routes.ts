// customization.routes.ts
import { Router } from 'express';
import { CustomizationController } from '../customization/customization.controller';
import { AppDataSource } from '../database/data-source';
import { CustomizationService } from '../customization/customization.service';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
const entityManager = AppDataSource.manager;

const customizationService = new CustomizationService(entityManager);
const customizationController = new CustomizationController(customizationService);

router.put('/', authenticateToken, customizationController.updateCustomization.bind(customizationController));

export default router;
