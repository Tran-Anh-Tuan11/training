//@ts-nocheck
import { EntityManager } from 'typeorm';
import { Translation } from './translation.entity';
import { Shop } from '../shop/shop.entity';

export class TranslationService {
    private entityManager: EntityManager;

    constructor(entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    async getAllTranslations(shopify_domain: string): Promise<Translation[]> {
        return await this.entityManager.find(Translation, { where: { shop: { shopify_domain } } });
    }

    async getTranslationByLocale(shopify_domain: string, locale: string): Promise<Translation | null> {
        return await this.entityManager.findOne(Translation, { where: { shop: { shopify_domain }, locale } });
    }

    async addTranslation(shopify_domain: string, locale: string, translate: object): Promise<Translation> {
        const shop = await this.entityManager.findOne(Shop, { where: { shopify_domain } });
        if (!shop) {
            throw new Error('Shop not found');
        }

        const translation = new Translation();
        translation.locale = locale;
        translation.translate = translate;
        translation.shop = shop;

        return await this.entityManager.save(translation);
    }


    async deleteTranslation(locale: string): Promise<Translation | null> {
        const translationRepository = this.entityManager.getRepository(Translation);


        const translation = await translationRepository.findOne({ where: { locale } });

        if (!translation) {
            return null;  // Không tìm thấy translation
        }


        await translationRepository.remove(translation);

        return translation;
    }


    async updateTranslation(locale: string, translate: Record<string, any>): Promise<Translation | null> {
        const translationRepository = this.entityManager.getRepository(Translation);


        const translation = await translationRepository.findOne({ where: { locale } });

        if (!translation) {
            return null;
        }

        translation.translate = { ...translation.translate, ...translate };
        return await translationRepository.save(translation);
    }
}
