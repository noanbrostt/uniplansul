// src/components/Auth/LoginForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputMask from "react-input-mask";
import {
    loginStart,
    loginUser,
    loginFailure,
} from "../../features/Auth/AuthSlice"; // Ações do Redux
import { useNavigate } from 'react-router-dom'; // Importando o hook para navegação
import "./LoginForm.css"; // Importa o arquivo CSS

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Definindo o hook para navegação
    const { loading, error } = useSelector((state) => state.auth);

    const [credentials, setCredentials] = useState({ matricula: "", cpf: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^\d{6}$/.test(credentials.matricula)) {
            alert("A matrícula deve ter exatamente 6 números.");
            return;
        }
        if (!/^\d{11}$/.test(credentials.cpf.replace(/[^\d]/g, ""))) {
            alert("O CPF deve ter exatamente 11 dígitos.");
            return;
        }

        try {
            dispatch(loginStart());
            dispatch(loginUser(credentials));

            // Após o login bem-sucedido, redireciona para a página do vídeo
            navigate("/video"); // Redirecionamento
        } catch (err) {
            dispatch(loginFailure("Erro ao fazer login, tente novamente."));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div>
                <label>Matrícula</label>
                <InputMask
                    mask="999999"
                    maskChar=""
                    name="matricula"
                    value={credentials.matricula}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>CPF</label>
                <InputMask
                    mask="999.999.999-99"
                    maskChar=""
                    name="cpf"
                    value={credentials.cpf}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                Login
            </button>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
};

export default LoginForm;
