// src/components/Auth/Login.jsx
import React, { useEffect } from 'react';
import LoginForm from "./LoginForm";
import "./Login.css"; // Importa o arquivo CSS

const Login = () => {
    useEffect(() => {
        // Limpar o localStorage quando a tela de login for acessada
        localStorage.clear(); // Remove todos os itens armazenados no localStorage

        // Se quiser limpar apenas itens específicos
        // localStorage.removeItem("videoTime");
        // localStorage.removeItem("maxWatchedTime");

        // Ou ainda pode limpar algo específico, como:
        // localStorage.setItem("videoTime", "0");
        // localStorage.setItem("maxWatchedTime", "0");
    }, []);

    return (
        <div className="login-page">
            <LoginForm />
        </div>
    );
};

export default Login;
