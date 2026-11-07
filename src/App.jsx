import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Страница авторизации */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Защищённая страница профиля */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>

                {/* Восстановление пароля */}
                <Route 
                    path="/forgot-password"
                    element={<ForgotPasswordPage />} />

                {/* Регистрация */}
                <Route 
                    path="/register"
                    element={<RegisterPage />} />

                {/* Начальная страница */}
                <Route 
                    path="/"
                    element={<Navigate to="/login" replace />} />

                {/* Несуществующий адрес */}
                <Route 
                    path="*"
                    element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;