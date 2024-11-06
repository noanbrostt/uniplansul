// src/features/Auth/AuthSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    matricula: "",
    cpf: "",
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Ação de login - Armazena os dados de matrícula e CPF
        loginUser: (state, action) => {
            // A ação contém os dados de matricula e cpf
            state.matricula = action.payload.matricula;
            state.cpf = action.payload.cpf;
            state.loading = false; // Assumindo que o login já foi feito
            state.error = null; // Limpar erros após login
        },
        // Ação para iniciar o login (ex: quando o login é enviado)
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        // Ação de falha no login
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload; // O erro é passado na payload
        },
        // Ação de logout - Limpa os dados de autenticação
        logoutUser: (state) => {
            state.matricula = "";
            state.cpf = "";
            state.loading = false;
            state.error = null;
        },
    },
});

// Exporta as ações para serem usadas em outros arquivos
export const { loginUser, loginStart, loginFailure, logoutUser } =
    authSlice.actions;

// Exporta o reducer para ser adicionado ao store
export default authSlice.reducer;
