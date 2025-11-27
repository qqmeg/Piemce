import styles from './Input.module.css';

const Input = ({ 
    label, 
    type = 'text', 
    value, 
    onChange,
    placeholder,
    required = false 
}) => {
    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <input 
                type={type}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={styles.input} 
            />
        </div>
    );
};

export default Input;