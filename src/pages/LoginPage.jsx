import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loginSuccess } from '../features/auth/authSlice';

const CORRECT_PHONE = '+7 999 999-99-99';
const CORRECT_PASSWORD = '1234567890';

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        const normalizedPhone = phone.trim().replace(/\s+/g, ' ');

        if (normalizedPhone === CORRECT_PHONE && password === CORRECT_PASSWORD) {
            dispatch(loginSuccess({
                phone: normalizedPhone,
                rememberMe,
                })
            );

            navigate('/profile', { replace: true });
            return;
        }

        setError('Неверный телефон или пароль.');
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1>Авторизация</h1>
                <p className="auth-description">Введите данные для входа в личный кабинет</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон</label>
                        <input 
                            type="tel" 
                            id="phone"
                            placeholder="+7 999 999-99-99"
                            autoComplete="tel"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input 
                            type="password"
                            id="password"
                            placeholder="Введите пароль"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-options">
                        <label className="remember-label">
                            <input 
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(event) => setRememberMe(event.target.checked)}
                            />
                            Запомнить меня
                        </label>
                        <Link to="/forgot-password">
                            Забыли пароль?
                        </Link>
                    </div>
                    {error && (
                        <p className="error-message" role="alert">
                            {error}
                        </p>
                    )}
                    <button type="submit" className="submit-button">Войти</button>
                </form>

                <p className="register-text">
                    Нет аккаунта? <Link to="/register">Регистрация</Link>
                </p>
            </section>
        </main>
    );
}