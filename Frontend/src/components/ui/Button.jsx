import styles from './Button.module.css'

const Button = ({
    type = 'button',
    onClick,
    children,
    className = '',
    disabled = false,
    variant = 'primary'
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.button} ${styles[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;