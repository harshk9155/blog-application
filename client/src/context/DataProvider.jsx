import { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    // ✅ Start with null — never pre-populate with another user's data
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ✅ On app load, restore session only if a valid token exists
        const user = sessionStorage.getItem('user');
        const accessToken = sessionStorage.getItem('accessToken');

        if (user && accessToken) {
            try {
                // ✅ Safe parse — if corrupted sessionStorage, just clear it
                setAccount(JSON.parse(user));
            } catch {
                sessionStorage.clear();
            }
        }

        setLoading(false);
    }, []);

    // ✅ Custom setAccount that also clears session when logging out (setAccount(null))
    const handleSetAccount = (newAccount) => {
        if (!newAccount) {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
        }
        setAccount(newAccount);
    };

    return (
        <DataContext.Provider value={{
            account,
            setAccount: handleSetAccount,
            loading
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
