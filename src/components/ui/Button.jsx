import styles from './Button.module.css'

export const Button = ({
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