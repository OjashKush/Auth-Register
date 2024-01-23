const url = 'http://127.0.0.1:5000/';

const apiClient = () => {
    const registerUser = async (userData) => {
        try {
            const response = await fetch(`${url}register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: "cors",
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    };

    const loginUser = async (userData) => {
        try {
            const response = await fetch(`${url}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    };

    return {
        registerUser,
        loginUser,
    };
};

export default apiClient;