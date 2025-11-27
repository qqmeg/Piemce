import styles from './Button.module.css'

const Button = ({
    type = 'button',
    onClick
}) => {
    return (
        <button
        type={type}
        onClick={onClick}
        className='{styles.button}'
        ></button>
    );
};

export default Button;