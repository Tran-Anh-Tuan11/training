import { Router } from 'express';
import { TranslationController } from '../translation/translation.controller';
import { AppDataSource } from '../database/data-source';
import { TranslationService } from '../translation/translation.service';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
const entityManager = AppDataSource.manager;

const translationService = new TranslationService(entityManager);
const translationController = new TranslationController(translationService);

// get trans
router.get('/', authenticateToken, translationController.getAllTranslations.bind(translationController));

// get trans by locale 
router.get('/:locale', authenticateToken, translationController.getTranslation.bind(translationController));

// post trans
router.post('/', authenticateToken, translationController.addTranslation.bind(translationController));

// delete trans ??? có nên xoá mềm
router.delete('/:locale', authenticateToken, translationController.deleteTranslation.bind(translationController));

// update trans 
router.put('/update', authenticateToken, translationController.updateTranslation.bind(translationController));

export default router;
