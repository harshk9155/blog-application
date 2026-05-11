import { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    // ✅ Start with null (important)
    const [account, setAccount] = useState(null);

    // ✅ Add loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = sessionStorage.getItem('user');

        if (user) {
            setAccount(JSON.parse(user));
        }

        setLoading(false); // ✅ now valid
    }, []);

    return (
        <DataContext.Provider value={{
            account,
            setAccount,
            loading
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;