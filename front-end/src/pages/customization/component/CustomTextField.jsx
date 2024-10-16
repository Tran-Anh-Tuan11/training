import { TextField } from "@shopify/polaris";
import { useCallback, useState } from "react";

function CustomTextField({ label, rows, field, handleChange }) {
    const [value, setValue] = useState('');

    const onChange = useCallback(
        (newValue) => {
            console.log(`${field} changed to:`, newValue);
            setValue(newValue);
            handleChange(field, newValue);
        },
        [handleChange, field],
    );

    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            autoComplete="off"
            multiline={rows}
        />
    );
}

export default CustomTextField;
