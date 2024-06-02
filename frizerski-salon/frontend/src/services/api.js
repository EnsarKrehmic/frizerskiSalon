import axios from 'axios';

// host za backend
const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchData = () => {
    return api.get('/api/data');
};

// Funkcija za login
export const login = (email, password) => {
    return api.post('/login', { email, password });
};

// Funkcija za registraciju
export const register = (firstName, lastName, nickname, email, password) => {
    return api.post('/register', { firstName, lastName, nickname, email, password });
};

// Funkcija za slanje kontakt poruke
export const sendContactMessage = (name, email, message) => {
    return api.post('/api/contact', { name, email, message });
};

// Funkcija za dobijanje informacija o trenutnom korisniku
export const getCurrentUser = () => {
    return api.get('/api/user');
};

// Funkcija za odjavu
export const logout = () => {
    return api.get('/logout');
};

// Funkcija za dobijanje svih korisnika
export const getUsers = () => {
    return api.get('/api/get-users');
};

// Funkcija za ažuriranje korisnika od strane admina
export const updateUser = (id, firstName, lastName, nickname, email, password) => {
    return api.put(`/admin/update/${id}`, { firstName, lastName, nickname, email, password });
};

// Funkcija za deaktivaciju korisnika od strane admina
export const deactivateUser = (id) => {
    return api.put(`/admin/deactivate/${id}`);
};

// Funkcija za aktivaciju korisnika od strane admina
export const activateUser = (id) => {
    return api.put(`/admin/activate/${id}`);
};

// Funkcija za dodavanje radnika od strane admina
export const addWorker = (name, description, type) => {
    return api.post('/admin/add-worker', { name, description, type });
};

// Funkcija za dobijanje svih radnika
export const getWorkers = () => {
    return api.get('/api/get-workers');
};

// Funkcija za ažuriranje radnika od strane admina
export const updateWorker = (id, name, description, type) => {
    return api.put(`/admin/update-worker/${id}`, { name, description, type });
};

// Funkcija za brisanje radnika od strane admina
export const deleteWorker = (id) => {
    return api.delete(`/admin/delete-worker/${id}`);
};

// Funkcija za dobijanje radnika po ID-u
export const getWorkerById = (id) => {
    return api.get(`/get-worker/${id}`);
};

// Funkcija za dodavanje pitanja za radnika
export const addQuestion = (id, content, user_id) => {
    return api.post(`/add-question/${id}`, { content, user_id });
};

// Funkcija za dobijanje pitanja za radnika
export const getWorkerQuestions = (id) => {
    return api.get(`/worker-questions/${id}`);
};

// Funkcija za brisanje pitanja od strane admina
export const deleteQuestion = (id) => {
    return api.delete(`/admin/delete-question/${id}`);
};

// Funkcija za registraciju radnika od strane korisnika
export const registerWorker = (id, startDate, endDate, user_id) => {
    return api.post(`/worker-register/${id}`, { startDate, endDate, user_id });
};

// Funkcija za dobijanje registracija radnika za određenog korisnika
export const getWorkerRegisters = (id) => {
    return api.get(`/api/get-worker-registers/${id}`);
};