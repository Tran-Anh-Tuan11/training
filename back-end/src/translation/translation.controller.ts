//@ts-nocheck
import { Request, Response } from 'express';
import { TranslationService } from './translation.service';

export class TranslationController {
    private translationService: TranslationService;

    constructor(translationService: TranslationService) {
        this.translationService = translationService;
    }
    async getAllTranslations(req: Request, res: Response): Promise<void> {
        const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header

        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        try {
            const { shopify_domain } = req.user as { shopify_domain: string };  // Lấy từ token đã xác thực

            if (!shopify_domain) {
                return res.status(400).json({ message: 'shopify_domain is missing from the token' });
            }

            const translations = await this.translationService.getAllTranslations(shopify_domain);

            if (!translations || translations.length === 0) {
                return res.status(404).json({ message: 'No translations found for the shop' });
            }

            res.status(200).json(translations);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while retrieving translations.', error: error.message });
        }
    }

    // Lấy bản dịch theo locale
    async getTranslation(req: Request, res: Response): Promise<void> {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        try {
            const { shopify_domain } = req.user as { shopify_domain: string };

            if (!shopify_domain) {
                return res.status(400).json({ message: 'shopify_domain is missing from the token' });
            }

            const { locale } = req.params; //  locale từ params
            const translation = await this.translationService.getTranslationByLocale(shopify_domain, locale);

            if (!translation) {
                return res.status(404).json({ message: 'Translation not found for the given locale' });
            }

            res.status(200).json(translation);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while retrieving the translation.', error: error.message });
        }
    }
    // Thêm bản dịch mới
    async addTranslation(req: Request, res: Response): Promise<void> {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        try {
            const { shopify_domain } = req.user as { shopify_domain: string };
            if (!shopify_domain) {
                return res.status(400).json({ message: 'shopify_domain is missing from the token' });
            }

            const { locale, translate } = req.body;
            const newTranslation = await this.translationService.addTranslation(shopify_domain, locale, translate);
            res.status(201).json(newTranslation);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while adding translation.', error: error.message });
        }
    }

    // delete translation
    async deleteTranslation(req: Request, res: Response): Promise<void> {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        try {
            const { locale } = req.params;

            if (!locale) {
                return res.status(400).json({ message: 'Locale is missing' });
            }

            const deletedTranslation = await this.translationService.deleteTranslation(locale);

            if (!deletedTranslation) {
                return res.status(404).json({ message: 'Translation not found for the given locale' });
            }

            res.status(200).json({ message: `Translation for locale '${locale}' has been deleted.` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while deleting translation.', error: error.message });
        }
    }

    // update translation
    async updateTranslation(req: Request, res: Response): Promise<void> {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        try {
            const { locale, translate } = req.body;

            if (!locale || !translate) {
                return res.status(400).json({ message: 'Locale or translation data is missing' });
            }

            const updatedTranslation = await this.translationService.updateTranslation(locale, translate);

            if (!updatedTranslation) {
                return res.status(404).json({ message: 'Translation not found for the given locale' });
            }

            res.status(200).json(updatedTranslation);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while updating translation.', error: error.message });
        }
    }
}
