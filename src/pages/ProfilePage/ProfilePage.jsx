import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../features/auth/authSlice';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { name, phone, avatar } = useSelector(
        (state) => state.auth
    );

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
    };

    return (
        <main className="profile-page">
            <section className="profile-card">
                <div className="profile-icon">👤</div>
                <h1>Личный кабинет</h1>
                
                {avatar && (
                    <img className="profile-avatar" src={avatar} alt="Аватар пользователя" />
                )}

                <p>Имя: {name}</p>
                <p>Телефон: {phone}</p>

                <button type="button" className="submit-button" onClick={handleLogout}>Выйти</button>
            </section>
        </main>
    );
}