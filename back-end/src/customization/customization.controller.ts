//@ts-nocheck
import { Request, Response } from 'express';
import { CustomizationService } from './customization.service';

export class CustomizationController {
    private customizationService: CustomizationService;

    constructor(customizationService: CustomizationService) {
        this.customizationService = customizationService;
    }

    // cập nhật customization
    async updateCustomization(req: Request, res: Response): Promise<void> {
        const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header

        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }
        try {
            const { shopify_domain } = req.user as { shopify_domain: string };  // Lấy từ token đã xác thực

            if (!shopify_domain) {
                return res.status(400).json({ message: 'shopify_domain is missing from the token' });
            }

            const customizationData = req.body;
            const updatedCustomization = await this.customizationService.updateCustomization(shopify_domain, customizationData);

            if (!updatedCustomization) {
                return res.status(404).json({ message: 'Customization not found for the shop' });
            }

            res.status(200).json(updatedCustomization);  // trả về customization đã cập nhật
        } catch (error) {
            console.error(error);  // Log 
            res.status(500).json({ message: 'An error occurred while updating customization.', error: error.message });
        }
    }
}
