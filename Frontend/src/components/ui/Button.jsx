import styles from './Button.module.css'

const Button = (props) => {
    const {type, onClick, children} = props;

    return (
        <button
        type={type}
        onClick={onClick}
        className='{styles.button}'
        >{children}</button>
    );
};

export default Button;