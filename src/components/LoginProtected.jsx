import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginProtected({ component }) {
    const Component = component;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, []);
    return (
        <div>
            <Component />
        </div>
    );
}

export default LoginProtected;
