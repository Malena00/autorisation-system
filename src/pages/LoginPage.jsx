import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { status, error, remember: rememberInit } = useSelector((s) => s.auth);

    const [form, setForm] = useState({
        phone: '',
        password: '',
        remember: rememberInit ?? false,
    });
}