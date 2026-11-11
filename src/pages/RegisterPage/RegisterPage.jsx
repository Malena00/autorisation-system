import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { registerSuccess } from '../../features/auth/authSlice';
import './RegisterPage.scss';

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [errors, setErrors] = useState({});

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setErrors((prev) => ({
                ...prev,
                avatar: 'Выберите файл изображения.',
            }));
            return;
        }

        if(file.size > 2 * 1024 * 1024) {
            setErrors((prev) => ({
                ...prev,
                avatar: 'Размер изображения не должен превышать 2 МБ.',
            }));
            return;
        }

        setErrors((prev) => ({ ...prev, avatar:''}));

        const reader = new FileReader();

        reader.onloadend = () => {
            setAvatar(reader.result);
            setAvatarPreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Введите имя.';
        } 
        else if (name.trim().length < 2) {
            newErrors.name = 'Имя должно содержать минимум 2 символа.'
        }

        const normalizedPhone = phone.replace(/[^\d+]/g, '');

        if (!normalizedPhone) {
            newErrors.phone = 'Введите номер телефона.';
        } 
        else if (!/^\+?\d{10,15}$/.test(normalizedPhone)) {
            newErrors.phone = 'Введите корректный номер телефона.';
        }

        if (!password) {
            newErrors.password = 'Введите пароль.';
        }
        else if (password.length < 8) {
            newErrors.password = 'Пароль должен содержать минимум 8 символов.';
        }

        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Форма отправлена.')

        const validationErrors = validateForm();

        setErrors((prev) => ({
            ...prev,
            ...validationErrors,
        }));

        if (Object.values(errors).some(Boolean)) {
            return;
        }

        if (Object.keys(validationErrors).length > 0) {
            console.log('Ошибки формы:', validationErrors)
            // setErrors(validationErrors);
            return;
        }

        if (errors.avatar) {
            console.log('Ошибка аватара:', errors.avatar);
            return;
        }

        dispatch(
            registerSuccess({
                name: name.trim(),
                phone: phone.replace(/[^\d+]/g, ''),
                password,
                avatar,
            })
        );

        console.log('Регистрация успешна.')

        navigate('/profile', { replace: true });
    };

    return (
        <main className="register-page">
            <section className="register-card">
                <h1>Регистрация</h1>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="name">Имя</label>
                        <input 
                            type="text"
                            value={name}
                            id="name"
                            onChange={(event) => {
                                setName(event.target.value);
                                setErrors((prev) => ({ ...prev, name: ''}));
                            }}
                            placeholder="Введите имя"
                        />

                        {errors.name && (
                            <p className="error-message">{errors.name}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Телефон</label>
                        <input 
                            type="tel"
                            value={phone}
                            id="phone"
                            onChange={(event) => {
                                setPhone(event.target.value);
                                setErrors((prev) => ({ ...prev, phone: ''}));
                            }}
                            placeholder="+7 999 999-99-99"
                        />

                        {errors.name && (
                            <p className="error-message">{errors.phone}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input 
                            type="password"
                            value={password}
                            id="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setErrors((prev) => ({ ...prev, password: ''}));
                            }}
                            placeholder="Минимум 8 символов"
                        />

                        {errors.name && (
                            <p className="error-message">{errors.password}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="avatar">Аватар</label>
                        <input 
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />

                        {avatarPreview && (
                            <img className="avatar-preview" src={avatarPreview} alt="Предпросмотр аватара" />
                        )}

                        {errors.name && (
                            <p className="error-message">{errors.avatar}</p>
                        )}
                    </div>

                    <button className="submit-button" type="submit">
                        Зарегистрироваться
                    </button>
                </form>

                <p className="register-login-link">
                    Уже есть аккаунт? <Link to="/login">Авторизация</Link>
                </p>
            </section>
        </main>
    );
}

export default RegisterPage;