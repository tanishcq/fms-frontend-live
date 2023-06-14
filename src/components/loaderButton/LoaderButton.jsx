import LoadingCircle from '../../assets/images/loadingCircle.svg';

const LoaderButton = ({ isLoading, display, ...otherButtonProps }) => {
    return (
        <button
            disabled={isLoading}
            type="submit"
            id="load-btn"
            {...otherButtonProps}
        >
            {isLoading ? (
                <span
                    style={{
                        'margin-left': '0px',
                        'font-weight': '500',
                        'font-family': 'Poppins',
                    }}
                >
                    Loading
                    <img
                        className="loader"
                        style={{
                            display: 'inline-block',
                            'margin-left': '10px',
                        }}
                        src={LoadingCircle}
                        alt="loading circle"
                    />
                </span>
            ) : (
                <span
                    style={{
                        'margin-left': '0px',
                        'font-weight': '500',
                        'font-family': 'Poppins',
                    }}
                >
                    {display}
                </span>
            )}
        </button>
    );
};

export default LoaderButton;
