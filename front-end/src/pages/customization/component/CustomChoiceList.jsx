import { ChoiceList } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function CustomChoiceList({ title, choices, initialSelected }) {
    const [selected, setSelected] = useState(initialSelected || []);
    const handleChange = useCallback((value) => setSelected(value), []);
    return (
        <ChoiceList
            title={title}
            choices={choices}
            selected={selected}
            onChange={handleChange}
        />
    );
}

export default CustomChoiceList;
