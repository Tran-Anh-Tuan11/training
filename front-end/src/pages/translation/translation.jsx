import React, { useState, useEffect } from 'react';
import { Page, Card, Divider, Modal, TextField } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';
import { getAllTranslations, deleteTranslation, addTranslation } from '../../api/translationApi';

const LanguageItem = ({ language, onDelete }) => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span style={{ flexGrow: 1 }}>{language.locale}</span>
            <span
                onClick={() => navigate(`/transaction/edit/${language.locale}`)}
                style={{ cursor: 'pointer', color: '#007bff', marginRight: '8px' }}
            >
                Edit
            </span>
            {hovered && (
                <span
                    onClick={() => onDelete(language.locale)}  // Xóa theo  locale
                    style={{ cursor: 'pointer', color: 'red' }}
                >
                    Delete
                </span>
            )}
        </div>
    );
};

const TransactionComponent = () => {
    const [languages, setLanguages] = useState([]);  // Khởi tạo mảng languages rỗng
    const [modalActive, setModalActive] = useState(false);
    const [deleteModalActive, setDeleteModalActive] = useState(false); // Modal delete
    const [languageToDelete, setLanguageToDelete] = useState(null);
    const [newLanguage, setNewLanguage] = useState('');
    const [placeholderText, setPlaceholderText] = useState('');
    const [buttonText, setButtonText] = useState('');


    useEffect(() => {
        fetchTranslations();
    }, []);


    const fetchTranslations = async () => {
        try {
            const token = localStorage.getItem('shopify_token');
            const response = await getAllTranslations(token);  // Gọi API GET
            setLanguages(response.data || []);  // Cập nhật state languages
        } catch (error) {
            console.error('Error fetching translations:', error);
        }
    };


    const handleDelete = (language) => {
        setLanguageToDelete(language);  // Lưu id ngôn ngữ cần xóa
        setDeleteModalActive(true); // Mở modal delete
    };

    // delete trans 
    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('shopify_token');
            await deleteTranslation(languageToDelete, token);  // Gọi API DELETE
            setLanguages(languages.filter(lang => lang.id !== languageToDelete));  // Cập nhật lại languages
            fetchTranslations();
            setDeleteModalActive(false); // Đóng modal delete
        } catch (error) {
            console.error('Error deleting translation:', error);
        }
    };

    const cancelDelete = () => {
        setDeleteModalActive(false);
        setLanguageToDelete(null);
    };

    // add trans 
    const handleSaveNewLanguage = async () => {
        const translationData = {
            locale: newLanguage,
            translate: {
                placeholder_text: placeholderText,
                button_text: buttonText,
            }
        };

        try {
            const token = localStorage.getItem('shopify_token');
            await addTranslation(translationData, token);  // Gọi API POST
            fetchTranslations();  // Fetch lại dữ liệu sau khi thêm ngôn ngữ
            setModalActive(false);  // Đóng modal thêm ngôn ngữ
            setNewLanguage('');  // Reset các input
            setPlaceholderText('');
            setButtonText('');
        } catch (error) {
            console.error('Error adding translation:', error);
        }
    };


    const handleAddLanguage = () => {
        setModalActive(true);
    };

    return (
        <Page title="Transaction">
            <Card sectioned>
                <h2>Edit and Transaction</h2>
            </Card>
            <Card sectioned>
                <h3 style={{ margin: '0 0 16px 0' }}>Languages</h3>
                {languages.length > 0 ? (
                    languages.map((language) => (
                        <div key={language.id}>
                            <LanguageItem language={language} onDelete={handleDelete} />
                            <Divider />
                        </div>
                    ))
                ) : (
                    <p>No languages available.</p>
                )}
                <span
                    onClick={handleAddLanguage}
                    style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold' }}
                >
                    Add Language
                </span>
            </Card>


            <Modal
                open={modalActive}
                onClose={() => setModalActive(false)}
                title={`Add New Language`}
                primaryAction={{
                    content: 'Save',
                    onAction: handleSaveNewLanguage,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => setModalActive(false),
                    },
                ]}
            >
                <Modal.Section>
                    <TextField
                        label="Language Name"
                        value={newLanguage}
                        onChange={(value) => setNewLanguage(value)}
                        placeholder="Enter language name"
                    />
                    <TextField
                        label="Placeholder Text"
                        value={placeholderText}
                        onChange={(value) => setPlaceholderText(value)}
                        placeholder="Enter placeholder text"
                    />
                    <TextField
                        label="Button Text"
                        value={buttonText}
                        onChange={(value) => setButtonText(value)}
                        placeholder="Enter button text"
                    />
                </Modal.Section>
            </Modal>


            <Modal
                open={deleteModalActive}
                onClose={cancelDelete}
                title={`Delete Language`}
                primaryAction={{
                    content: 'Delete',
                    onAction: confirmDelete,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: cancelDelete,
                    },
                ]}
            >
                <Modal.Section>
                    <p>Xoá k để biết</p>
                </Modal.Section>
            </Modal>
        </Page>
    );
};

export default TransactionComponent;
