import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import {
    phoneSubmitted,
    codeVerified,
    setRecoveryError,
    resetRecovery,
} from '../features/recovery/recoverySlice';

import { passwordUpdated } from '../features/auth/authSlice';

const CORRECT_PHONE = '+7 999 999-99-99';
const SMS_CODE = '5555';

export default function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { step, phone, error } = useSelector((state) => state.recovery);

    const [phoneInput, setPhoneInput] = useState('');
    const [smsCode, setSmsCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // 1. Проверяем телефон
    const handlePhoneSubmit = (event) => {
        event.preventDefault();

        dispatch(setRecoveryError(''));

        const normalizedPhone = phoneInput.trim();

        if (normalizedPhone !== CORRECT_PHONE) {
            dispatch(setRecoveryError('Пользователь с таким номером телефона не найден.'));
            return;
        }
        dispatch(phoneSubmitted(normalizedPhone));
    };
    // 2. Проверяем код из СМС
    const handleCodeSubmit = (event) => {
        event.preventDefault();

        dispatch(setRecoveryError(''));

        if (smsCode !== SMS_CODE) {
            dispatch(setRecoveryError('Неверный код подтверждения.'));
            return;
        }
        dispatch(codeVerified());
    };
    // 3. Устанавливаем новый пароль
    const handlePasswordSubmit = (event) => {
        event.preventDefault();

        dispatch(setRecoveryError(''));

        if (newPassword.length < 8) {
            dispatch(setRecoveryError('Пароль должен содержать минимум 8 символов.'));
            return;
        }
        dispatch(passwordUpdated(newPassword));
        dispatch(resetRecovery());

        navigate('/login', { replace: true });
    };
    // Возвращаемся к пункту 1
    const handleBack = () => {
        dispatch(resetRecovery());
        setPhoneInput('');
        setSmsCode('');
        setNewPassword('');
        setConfirmPassword('');
    };
    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1>Восстановление пароля</h1>
                <p className="auth-description">
                    {step === 1 && 'Укажите номер телефона, указанный при регистрации.'}
                    {step === 2 && `Введите код подтверждения, отправленный на ${phone}.`}
                    {step === 3 && 'Придумайте новый пароль для входа в личный кабинет.'}
                </p>
                {/*Шаг 1*/}
                {step === 1 && (
                    <form onSubmit={handlePhoneSubmit}>
                        <div className="form-group">
                            <label htmlFor="recovery-phone">Телефон</label>
                            <input 
                                type="tel"
                                id="recovery-phone"
                                placeholder="+7 999 999-99-99"
                                autoComplete="tel"
                                value={phoneInput}
                                onChange={(event) => setPhoneInput(event.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <p className="error-message" role="alert">{error}</p>
                        )}

                        <button type="submit" className="submit-button">Получить код</button>
                    </form>
                )}

                {/* ШАГ 2*/}
                {step === 2 && (
                    <form onSubmit={handleCodeSubmit}>
                        <div className="form-group">
                            <label htmlFor="sms-code">Код из смс</label>
                            <input
                                id="sms-code"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                placeholder="Введите код из СМС"
                                value={smsCode}
                                onChange={(event) => setSmsCode(event.target.value)
                                }
                                maxLength={4}
                                required
                            />
                        </div>
                        
                        <p className="auth-description">
                            Код 5555.
                        </p>

                        {error && (
                            <p className="error-message" role="alert">{error}</p>
                        )}

                        <button type="submit" className="submit-button">Подтвердить</button>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={handleBack}
                        >
                            Изменить телефон
                        </button>
                    </form>
                )}

                {/* ШАГ 3 */}
                {step === 3 && (
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="form-group">
                            <label htmlFor="new-password">Новый пароль</label>
                            <input 
                                type="password"
                                value={newPassword}
                                id="new-password"
                                autoComplete="new-password"
                                onChange={(event) => setNewPassword(event.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password">Повторите новый пароль</label>
                            <input 
                                type="password"
                                value={confirmPassword}
                                id="confirm-password"
                                autoComplete="new-password"
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <p className="error-message" role="alert">{error}</p>
                        )}

                        <button type="submit" className="submit-button">Сохраните новый пароль</button>
                    </form>
                )}

                <div className="recovery-links">
                    <Link
                        to="/login"
                        onClick={() => dispatch(resetRecovery())}
                    >
                        Вспомнил пароль!
                    </Link>
                    <Link
                        to="/register"
                        onClick={() => dispatch(resetRecovery())}
                    >
                        Вспомнил пароль!
                    </Link>
                </div>
            </section>
        </main>
    )
};