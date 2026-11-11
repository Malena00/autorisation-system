import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginSuccess } from '../../features/auth/authSlice';
import './LoginPage.scss';

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const { phone: registeredPhone, password: currentPassword } = useSelector((state) => state.auth);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        if (phone.trim().replace(/\s+/g, ' ') === registeredPhone && password === currentPassword) {
            dispatch(loginSuccess({
                phone: registeredPhone,
                rememberMe,
                })
            );

            navigate('/profile');
        }
        else {
            setError('Неверный телефон или пароль.')
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
                    </div>
                    
                    <Link to="/forgot-password">
                        Забыли пароль?
                    </Link>

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