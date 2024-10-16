import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ButtonGroup, Button } from '@shopify/polaris';
import { InlineGrid } from '@shopify/polaris';
import '../../scss/pages/custom.scss';
import CustomTextField from "./component/CustomTextField";
import CustomColorPicker from "./component/CustomColorPicker";
import CustomSelect from "./component/CustomSelect";
import CustomRangeSlider from "./component/CustomRangeSider";
import CustomChoiceList from "./component/CustomChoiceList";
import Translation from "../translation/translation";
import EditLanguage from "../translation/edittranslation";
import { getShop } from "../../api/shopApi";
import { updateCustomization } from "../../api/customApi";
import { useSelector } from "react-redux";

function Custom() {
    const [config, setConfig] = useState({
        input_width: '',
        input_height: '',
        input_border: 'solid',
        input_border_radius: '',
        input_background_color: '',
        button_variant: 'primary',
        border_width: '',
        border_color: '',
        button_width: '',
        button_height: '',
        button_border: 'solid',
        button_background_color: '',
        button_text_color: '',
        direction: 'horizontal',
        button_border_color: '',
        css: '',
    });


    useEffect(() => {
        const fetchShopConfig = async () => {
            try {

                const token = localStorage.getItem('shopify_token');

                const data = await getShop(token);

                if (data && data.customization) {
                    const custom = data.customization;

                    setConfig(prevConfig => ({
                        ...prevConfig,
                        input_width: custom.input_width || '',
                        input_height: custom.input_height || '',
                        input_border: custom.input_border || 'solid',
                        input_border_radius: custom.input_border_radius || '',
                        input_background_color: custom.input_background_color || '',
                        button_variant: custom.button_variant || 'primary',
                        border_width: custom.border_width || '',
                        border_color: custom.border_color || '',
                        button_width: custom.button_width || '',
                        button_height: custom.button_height || '',
                        button_border: custom.button_border || 'solid',
                        button_background_color: custom.button_background_color || '',
                        button_text_color: custom.button_text_color || '',
                        direction: custom.direction || 'horizontal',
                        button_border_color: custom.button_border_color || '',
                        css: custom.css || '',
                    }));
                }
            } catch (error) {
                console.error('Error fetching shop config:', error);
            }
        };

        fetchShopConfig();
    }, []);

    const handleSave = async () => {
        try {

            const token = localStorage.getItem('shopify_token');

            const response = await updateCustomization(config, token);

            if (response.status === 200) {
                console.log('Customization updated successfully');
                window.location.reload();
            } else {
                console.error('Failed to update customization:', response.message);
            }
        } catch (error) {
            console.error('Error updating customization:', error);
        }

    };

    const shopifyDomain = useSelector(state => state.shop.shopifyDomain);
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div className="custom-pages">
                        <div>
                            {shopifyDomain}
                        </div>
                        <div className="button-container mgb-10">
                            <ButtonGroup>
                                <Button variant="primary" onClick={handleSave}> Save</Button>
                            </ButtonGroup>
                        </div>
                        <InlineGrid columns={['oneThird', 'twoThirds']}>
                            <OneThirdComponent config={config} setConfig={setConfig} />
                            <TwoThirdComponent config={config} />
                        </InlineGrid>
                    </div>
                } />
                <Route path="/translation" element={<Translation />} />
                <Route path="/transaction/edit/:language" element={<EditLanguage />} />

            </Routes>
        </Router>
    );
}


const OneThirdComponent = ({ config, setConfig }) => {
    const boxBorder = [
        { label: 'Dotted', value: 'dotted' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Solid', value: 'solid' },
        { label: 'Double', value: 'double' },
        { label: 'Groove', value: 'groove' },
        { label: 'Ridge', value: 'ridge' },
        { label: 'Inset', value: 'inset' },
        { label: 'Outset', value: 'outset' },
        { label: 'None', value: 'none' },
        { label: 'Hidden', value: 'hidden' },
    ];

    const buttonType = [
        { label: 'Plain', value: 'plain' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Tertiary', value: 'tertiary' },
        { label: 'Monochrome Plain', value: 'monochromePlain' },
    ];

    const layoutOptions = [
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' },
    ];

    const handleChange = (field, value) => {
        setConfig(prevConfig => {
            const updatedConfig = { ...prevConfig, [field]: value };
            return updatedConfig;
        });
    };
    return (
        <div className="component-one">
            <ToggleInfo title="Discount box size">
                <div className="row mgb-10" >
                    <CustomTextField
                        label="Box width"
                        field="input_width"
                        handleChange={handleChange}
                        rows={1}
                    />
                    <CustomTextField
                        label="Box height"
                        field="input_height"
                        handleChange={handleChange}
                        rows={1}
                    />

                </div>
            </ToggleInfo>

            <ToggleInfo title="Discount box border">
                <CustomColorPicker
                    label="Border Color"
                    field="border_color"
                    value={config.border_color}
                    handleChange={handleChange}
                />

                <CustomSelect
                    label="Border style"
                    options={boxBorder}
                    initialValue={config.input_border}
                    onChange={(newValue) => handleChange('input_border', newValue)}
                />

                {/* <CustomRangeSlider label="Border radius" value={config.input_border_radius} onChange={(newvalue) => handleChange('input_border_radius', newvalue)} /> */}
                <CustomRangeSlider
                    label="Border radius"
                    initialValue={config.input_border_radius}
                    handleChange={handleChange}
                    field="input_border_radius"
                />
            </ToggleInfo>

            <ToggleInfo title="Discount box color">
                <CustomColorPicker
                    label="Discount box color"
                    field="input_background_color"
                    value={config.input_background_color}
                    handleChange={handleChange}
                />
            </ToggleInfo>

            <ToggleInfo title="Button">
                <CustomSelect
                    label="Button type"
                    options={buttonType}
                    initialValue={config.button_variant}
                    onChange={(newValue) => handleChange('button_variant', newValue)}
                />
                <div className="row mgb-10">
                    <CustomTextField
                        label="Button width"
                        field="button_width"
                        handleChange={handleChange}
                        rows={1}
                    />
                    <CustomTextField
                        label="Button height"
                        field="button_height"
                        handleChange={handleChange}
                        rows={1}
                    />
                </div>
                <CustomColorPicker
                    label="Button Color"
                    field="button_background_color"
                    value={config.button_background_color}
                    handleChange={handleChange}
                />
                <CustomColorPicker
                    label="Text color"
                    field="button_text_color"
                    value={config.button_text_color}
                    handleChange={handleChange}
                />
                <CustomSelect
                    label="Border style"
                    options={boxBorder}
                    initialValue={config.button_border}
                    onChange={(newValue) => handleChange('button_border', newValue)}
                />
                <CustomRangeSlider
                    label="Border width"
                    initialValue={config.border_width}
                    handleChange={handleChange}
                    field="border_width"
                />
                <CustomColorPicker
                    label="Border Color"
                    field="button_border_color"
                    value={config.button_border_color}
                    handleChange={handleChange}
                />
            </ToggleInfo>

            <ToggleInfo title="Layout">
                <CustomChoiceList choices={layoutOptions} selected={config.direction} onChange={(value) => handleChange('direction', value)} />
            </ToggleInfo>

            <ToggleInfo title="Custom CSS">
                <CustomTextField
                    field="css"
                    handleChange={handleChange}
                    rows={4}
                />
            </ToggleInfo>
        </div>
    );
};

// Cập nhật TwoThirdComponent
const TwoThirdComponent = ({ config }) => {
    const discountCodeClass = {
        width: `${config.input_width || 200}px`,
        height: `${config.input_height || 40}px`,
        backgroundColor: config.input_background_color,
        borderColor: config.border_color,
        borderStyle: config.input_border,
        borderRadius: `${config.input_border_radius}px`,
        borderWidth: `${config.border_width}px`,
        color: config.button_text_color,
    };

    const buttonClass = {
        backgroundColor: config.button_background_color || 'blue',
        color: config.button_text_color || 'black',
        border: `${config.border_width}px ${config.button_border} ${config.button_border_color}`,
        width: `${config.button_width || 100}px`,
        height: `${config.button_height || 40}px`,
    };

    return (
        <div className="component-two">
            <div className="container">
                <div className="header-two mgb-10"></div>
                <div className="cart">
                    <div className="cart-container">
                        <h1 className="cart-title">Your Cart</h1>
                        <div className="order">
                            <div className="order-details">
                                <strong>Order 1</strong>
                                <p>Item: Product A</p>
                                <p>Quantity: 1</p>
                                <p>Price: $10.00</p>
                            </div>
                        </div>
                        <div className="order">
                            <div className="order-details">
                                <strong>Order 2</strong>
                                <p>Item: Product B</p>
                                <p>Quantity: 2</p>
                                <p>Price: $20.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="row discount-code">
                        <input
                            className="custom-text-field"
                            style={discountCodeClass}  // Áp dụng style từ config
                        />
                        <button
                            style={
                                buttonClass
                            }  // Áp dụng style từ config
                        >
                            Label
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ToggleInfo = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleInfo = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className="toggle">
            <div className="header-toggle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{title}</p>
                <button onClick={toggleInfo} style={{ cursor: 'pointer' }}>
                    {isOpen ? '🔼 ' : '🔽'}
                </button>
            </div>
            {isOpen && (
                <div style={{ marginTop: '10px' }}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Custom;