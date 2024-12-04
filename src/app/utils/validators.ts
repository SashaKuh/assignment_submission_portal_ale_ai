export const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
};

export const validateURL = (url: string): boolean => {
        try {
                new URL(url);
                return true;
        } catch {
                return false;
        }
};