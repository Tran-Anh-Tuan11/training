import { ColorPicker } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';

// Hàm chuyển đổi HSL sang RGBA chuẩn hóa
const hslToRgba = (hsl) => {
    const { hue, saturation, brightness, alpha } = hsl;

    const c = (1 - Math.abs(2 * brightness - 1)) * saturation;
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = brightness - c / 2;

    let r = 0, g = 0, b = 0;
    if (0 <= hue && hue < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= hue && hue < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= hue && hue < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= hue && hue < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= hue && hue < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= hue && hue < 360) {
        r = c; g = 0; b = x;
    }

    // Chuyển đổi RGB thành giá trị từ 0 đến 255
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    // Log giá trị RGBA sau khi chuyển đổi
    const rgbaValue = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    return rgbaValue;
};

function CustomColorPicker({ label, field, value, handleChange }) {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [currentColor, setCurrentColor] = useState(value); // Giữ giá trị HSL để hiển thị chính xác trong ColorPicker

    const toggleColorPicker = useCallback(() => {
        setShowColorPicker((prev) => !prev);
    }, []);

    const handleClickOutside = useCallback((event) => {
        const target = event.target;
        if (showColorPicker && !target.closest('.color-picker-wrapper')) {
            setShowColorPicker(false);
        }
    }, [showColorPicker]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    // update color and call handleChange
    const handleColorChange = useCallback((newColor) => {
        setCurrentColor(newColor);

        // convert hsl to rgba
        const rgbaColor = hslToRgba(newColor);
        handleChange(field, rgbaColor);  // Trả về giá trị RGBA cuối cùng
    }, [field, handleChange]);

    // convert hsl to rgba
    const colorStyle = hslToRgba(currentColor);

    return (
        <div className="color-picker-wrapper" style={{ display: 'flex', alignItems: 'center', position: 'relative', marginBottom: '10px' }}>
            <div
                onClick={toggleColorPicker}
                style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: colorStyle,  // dùng rbga
                    cursor: 'pointer',
                    marginRight: '10px',
                    border: '1px solid #ccc',
                }}
            />
            <span>{label}</span>
            {showColorPicker && (
                <div style={{ position: 'absolute', zIndex: 1000 }}>
                    <ColorPicker
                        onChange={handleColorChange}
                        color={currentColor}
                    />
                </div>
            )}
        </div>
    );
}

export default CustomColorPicker;
