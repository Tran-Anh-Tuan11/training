import { EntityManager } from 'typeorm';
import { Shop } from './shop.entity';
import { Customization } from '../customization/customization.entity';

export class ShopService {
    constructor(private entityManager: EntityManager) { }

    async createShop(data: { shopify_domain: string; shop_owner: string }): Promise<Shop> {
        //  post shop
        const shop = this.entityManager.create(Shop, data);

        // Lưu shop trước để có ID
        const savedShop = await this.entityManager.save(shop);

        // Tạo customization mặc định và liên kết với shop
        const customization = this.entityManager.create(Customization, {
            input_width: '200',
            input_height: '40px',
            input_border: 'solid',
            input_border_radius: '4px',
            input_background_color: '#ccc',
            button_variant: 'primary',
            border_width: '1px',
            border_color: '#ccc',
            button_width: '100',
            button_height: '40px',
            button_border: 'solid',
            button_background_color: '#fff',
            button_text_color: '#000',
            direction: 'horizontal',
            css: '', // Nếu cần
            shop: savedShop // Liên kết customization với shop đã lưu
        });

        // Lưu customization liên kết với shop
        await this.entityManager.save(customization);

        // Cập nhật lại shop với thông tin customization
        savedShop.customization = customization;
        await this.entityManager.save(savedShop);

        // Trả về shop đã lưu với customization
        return savedShop;
    }

    // Lấy thông tin shop
    async getShop(shopify_domain: string): Promise<Shop | null> {
        return await this.entityManager
            .createQueryBuilder(Shop, 'shop')
            .where('shop.shopify_domain = :shopify_domain', { shopify_domain })
            .leftJoinAndSelect('shop.customization', 'customization')  // Lấy customization kèm theo shop
            .getOne();
    }
}
