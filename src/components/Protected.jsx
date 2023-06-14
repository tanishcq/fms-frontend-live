import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected({ component }) {
    const Component = component;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);
    return (
        <div>
            <Component />
        </div>
    );
}

export default Protected;
