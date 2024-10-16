import React, { useEffect } from 'react';
import Custom from './pages/customization';
import { useDispatch } from 'react-redux';
import { setShopInfo } from './redux/shopSlice';
import "@shopify/polaris/build/esm/styles.css";
import { checkAndCreateShop, getShop } from './api/shopApi';

function App() {
    useEffect(() => {
        const initializeShop = async () => {
            try {
                await checkAndCreateShop(); // Gọi hàm kiểm tra và tạo shop
            } catch (error) {
                console.error("Error initializing shop:", error);
            }
        };

        initializeShop();
    }, []);

    const dispatch = useDispatch();
    useEffect(() => {
        const initializeShop = async () => {
            try {
                const shopInfo = await getShop();
                dispatch(setShopInfo({
                    shopifyDomain: shopInfo.shopify_domain,
                    shopOwner: shopInfo.shop_owner
                }));

                await checkAndCreateShop(); // Gọi hàm kiểm tra và tạo shop
            } catch (error) {
                console.error("Error initializing shop:", error);
            }
        };

        initializeShop();
    }, [dispatch]);

    return (
        <div>
            <Custom /> {/* Phần hiển thị chính */}
        </div>
    );
}

export default App;
