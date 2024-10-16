//@ts-nocheck
import { EntityManager } from 'typeorm';
import { Customization } from './customization.entity';

export class CustomizationService {
    constructor(private entityManager: EntityManager) { }

    // update customization
    async updateCustomization(shopify_domain: string, data: any): Promise<Customization> {
        const customization = await this.entityManager
            .createQueryBuilder(Customization, 'customization')
            .leftJoinAndSelect('customization.shop', 'shop') // Assuming 'shop' là entity liên kết
            .where('shop.shopify_domain = :shopify_domain', { shopify_domain })  // Lọc theo shopify_domain lấy từ token
            .getOne();

        if (!customization) {
            return null;  // trả về null nếu không tìm thấy customization
        }

        // update customization với dữ liệu mới
        Object.assign(customization, data);

        //save customization sau khi update
        return await this.entityManager.save(customization);
    }
}
