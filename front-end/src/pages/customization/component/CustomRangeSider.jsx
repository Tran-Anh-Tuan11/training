import { RangeSlider } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';

function CustomRangeSlider({ label, initialValue, handleChange, field }) {
    const [rangeValue, setRangeValue] = useState(initialValue || 0);

    useEffect(() => {
        if (initialValue !== rangeValue) {
            setRangeValue(initialValue);
        }
    }, [initialValue]);

    const handleRangeSliderChange = useCallback(
        (value) => {
            setRangeValue(value);  // Cập nhật giá trị rangeValue
            // Nếu handleChange được truyền vào, gọi nó để cập nhật config
            if (handleChange) {
                handleChange(field, value);  // Gọi handleChange với field để cập nhật đúng trường trong config
            }
        },
        [handleChange, field]
    );

    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ flexGrow: 1 }}>
                <RangeSlider
                    label={label}
                    value={rangeValue}
                    onChange={handleRangeSliderChange}  // Gọi hàm thay đổi giá trị
                    output
                    min={0}
                    max={5}
                    step={0.1}
                />
            </div>
            <span style={{ marginLeft: '10px' }}>{rangeValue}px</span>
        </div>
    );
}

export default CustomRangeSlider;
