import api from "./api";

// add trans
export const addTranslation = async (translationData, token) => {
    try {
        const response = await api.post('/translation', translationData, {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error adding translation:', error);
        throw error;
    }
};

// delete trans 
export const deleteTranslation = async (locale, token) => {
    try {
        const response = await api.delete(`/translation/${locale}`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error deleting translation:', error);
        throw error;
    }
};

// update trans 
export const updateTranslation = async (translationData, token) => {
    try {
        const response = await api.put('/translation/update', translationData, {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error updating translation:', error);
        throw error;
    }
};

// get all trans 
export const getAllTranslations = async (token) => {

    try {
        const response = await api.get('/translation', {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error getting all translations:', error);
        throw error;
    }
};

// get trans by locale
export const getTranslationByLocale = async (locale, token) => {
    try {
        const response = await api.get(`/translation/${locale}`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error getting translation by locale:', error);
        throw error;
    }
};
