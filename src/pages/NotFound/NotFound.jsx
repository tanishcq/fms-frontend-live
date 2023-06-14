import './NotFound.css';

function NotFound() {
    return (
        <div className="error-page">
            <div className="content">
                <img
                    src="https://static.thenounproject.com/png/209393-200.png"
                    alt=""
                />
                <h2>404</h2>
                <h4>Opps! Page not found</h4>
                <p>
                    Sorry, the page you&apos;re looking for doesn&apos;t exist.
                </p>
            </div>
        </div>
    );
}

export default NotFound;
