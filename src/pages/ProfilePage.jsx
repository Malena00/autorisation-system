import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../features/auth/authSlice';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const phone = useSelector((state) => state.auth.phone);
    const rememberMe = useSelector((state) => state.auth.rememberMe);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
    };

    return (
        <main className="profile-page">
            <section className="profile-card">
                <div className="profile-icon">👤</div>
                <h1>Личный кабинет</h1>
                <p className="profile-description">
                    Вы успешно авторизовались!
                </p>

                <div className="profile-info">
                    <p>
                        <strong>Телефон:</strong> {phone}
                    </p>
                    <p>
                        <strong>Статус:</strong> Авторизован
                    </p>
                    <p>
                        <strong>Запомнить меня:</strong>{' '}
                        {rememberMe ? 'Да' : 'Нет'}
                    </p>
                </div>
                <button type="button" className="submit-button" onClick={handleLogout}>Выйти</button>
            </section>
        </main>
    );
}