// Cập nhật customization

import api from "./api";

export const updateCustomization = async (customizationData, token) => {
    try {

        const token = localStorage.getItem('shopify_token');
        const response = await api.put('/customization', customizationData, {
            headers: {
                Authorization: `${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error('Error updating customization:', error);

        //
        if (error.response && error.response.status === 404) {
            return { status: 404, message: 'Customization not found' };  // Lỗi không tìm thấy customization
        } else if (error.response && error.response.status === 500) {
            return { status: 500, message: 'Server error during customization update' }; // Lỗi server
        }

        throw error;
    }
};
