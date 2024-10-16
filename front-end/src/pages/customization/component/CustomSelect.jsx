import { Select } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function CustomSelect({ label, options, initialValue, onChange }) {
    const [selected, setSelected] = useState(initialValue || options[0].value);

    const handleSelectChange = useCallback(
        (value) => {
            setSelected(value);  // Cập nhật giá trị selected
            if (onChange) {
                onChange(value); // Gọi onChange từ component cha nếu có
            }
        },
        [onChange],
    );

    return (
        <div style={{ marginBottom: '10px' }}>
            <Select
                label={label}
                options={options}
                onChange={handleSelectChange}
                value={selected}
            />
        </div>
    );
}

export default CustomSelect;
