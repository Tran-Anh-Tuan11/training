import React, { useState, useEffect } from 'react';
import { Page, Card, TextField } from '@shopify/polaris';
import { useParams, useNavigate } from 'react-router-dom';
import { getTranslationByLocale, updateTranslation } from '../../api/translationApi';

const EditLanguage = () => {
    const { language } = useParams();  // lấy locale từ URL
    const navigate = useNavigate();

    const [discountCode, setDiscountCode] = useState('');
    const [buttonText, setButtonText] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('shopify_token');
                const translation = await getTranslationByLocale(language, token);
                setDiscountCode(translation?.data?.translate?.placeholder_text || '');
                setButtonText(translation?.data?.translate?.button_text || '');
            } catch (error) {
                console.error('Error fetching translation:', error);
            }
        };
        fetchData();
    }, [language]);

    // reset 
    const handleReset = () => {
        setDiscountCode('Enter discount code');
        setButtonText('Save');
    };

    // save trans 
    const handleSave = async () => {
        const updatedTranslation = {
            locale: language,
            translate: {
                placeholder_text: discountCode,
                button_text: buttonText,
            },
        };

        try {
            const token = localStorage.getItem('shopify_token');
            await updateTranslation(updatedTranslation, token);  // API để update
            console.log('Saved:', updatedTranslation);
            navigate(-1);
        } catch (error) {
            console.error('Error saving translation:', error);
        }
    };

    return (
        <Page title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                    onClick={() => navigate(-1)}
                    style={{ cursor: 'pointer', color: '#007bff', marginRight: '16px' }}
                >
                    Go Back
                </span>
                {`Edit ${language}`}
            </div>
        }>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h1>{`Edit ${language}`}</h1>
                <span
                    onClick={handleSave}
                    style={{ cursor: 'pointer', color: '#007bff' }}
                >
                    Save
                </span>
            </div>
            <Card title="Text" sectioned>
                <h2 style={{ margin: '0 0 16px 0' }}>Edit and Translation</h2>
                <span
                    onClick={handleReset}
                    style={{ cursor: 'pointer', color: '#007bff', marginBottom: '16px', display: 'block' }}
                >
                    Reset
                </span>
                <TextField
                    label="Discount Box"
                    value={discountCode}
                    onChange={(value) => setDiscountCode(value)}
                    placeholder="Discount Code"
                />
                <TextField
                    label="Button Text"
                    value={buttonText}
                    onChange={(value) => setButtonText(value)}
                    placeholder="Button Text"
                />
            </Card>
        </Page>
    );
};

export default EditLanguage;
