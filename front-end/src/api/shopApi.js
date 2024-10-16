import api from './api';

// non-token 
const fetchNonShopifyToken = async () => {
    try {
        const response = await api.post('/auth/non-shopify-token');
        return response.data.token; // Giả sử token được trả về trong field `token`
    } catch (error) {
        console.error('Error fetching Non-shopify token:', error);
        throw error;
    }
};

// shopify-token 
export const fetchShopifyToken = async (shopifyDomain) => {
    try {
        const response = await api.post('/auth/shopify-token', { shopify_domain: shopifyDomain });
        return response.data.token; // Giả sử token được trả về trong field `token`
    } catch (error) {
        console.error('Error fetching Shopify token:', error);
        throw error;
    }
};

// check and save shop 
export const createShop = async (shopifyDomain, shopOwner, token) => {
    try {
        const response = await api.post('/shop', {
            shopify_domain: shopifyDomain,
            shop_owner: shopOwner
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Non-shopify token
            },
        });

        return response;
    } catch (error) {
        console.error('Error creating shop:', error);

        if (error.response && error.response.status === 500) {
            return { status: 500, message: 'Shop already exists' };
        }

        throw error;
    }
};


export const checkAndCreateShop = async () => {
    const shopifyDomain = 'abc.myshopify.com';
    const shopOwner = 'Tuan Tran';

    try {
        const nonShopifyToken = await fetchNonShopifyToken();

        const response = await createShop(shopifyDomain, shopOwner, nonShopifyToken);

        if (response.status === 200) {
            const shopifyToken = await fetchShopifyToken(shopifyDomain);

            localStorage.setItem('shopify_token', shopifyToken);
            localStorage.setItem('shopify_domain', shopifyDomain);
            localStorage.setItem('shop_owner', shopOwner);
        } else if (response.status === 500) {
            const shopifyToken = await fetchShopifyToken(shopifyDomain);

            localStorage.setItem('shopify_token', shopifyToken);
            localStorage.setItem('shopify_domain', shopifyDomain);
            localStorage.setItem('shop_owner', shopOwner);
        }

    } catch (error) {
        console.error('Error checking or creating shop:', error);
    }
};

export const getShop = async () => {
    try {

        const token = localStorage.getItem('shopify_token');

        if (!token) {
            throw new Error('No token found');
        }

        const response = await api.get('/shop', {
            headers: {
                Authorization: `${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching shop:', error);

        if (error.response) {
            if (error.response.status === 401) {
                return { status: 401, message: 'Unauthorized - Invalid Token' };
            }
            if (error.response.status === 500) {
                return { status: 500, message: 'Server error' };
            }
        }

        throw error;
    }
};