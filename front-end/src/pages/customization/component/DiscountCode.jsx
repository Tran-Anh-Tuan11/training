import { useState, useCallback } from 'react';
import { TextField, Button } from '@shopify/polaris';
import '../../../scss/pages/custom.scss'
function DiscountCode({ initialValue = '', buttonLabel = 'Label', onApply }) {
    const [discountCode, setDiscountCode] = useState(initialValue);

    const handleChange = useCallback((value) => {
        setDiscountCode(value);
    }, []);

    const handleApply = useCallback(() => {
        if (onApply) {
            onApply(discountCode); // Gọi hàm onApply với mã giảm giá
        }
    }, [discountCode, onApply]);

    return (
        <div className="discount-code">
            <TextField
                value={discountCode}
                onChange={handleChange}
                label="Discount Code"
                placeholder="Enter your discount code"
            />
            <Button variant="primary" onClick={handleApply}>
                {buttonLabel}
            </Button>
        </div>
    );
}

export default DiscountCode;
