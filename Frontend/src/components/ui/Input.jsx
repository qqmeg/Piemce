import { useState } from 'react';
import styles from './Input.module.css';

const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.length > 0;
    const shouldFloatLabel = isFocused || hasValue;

    return (
        <div className={styles.container}>
            <div className={`${styles.inputWrapper} ${shouldFloatLabel ? styles.focused : ''}`}>
                {label && (
                    <label className={`${styles.label} ${shouldFloatLabel ? styles.floated : ''}`}>
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    value={value || ''}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    required={required}
                    className={styles.input}
                />
            </div>
        </div>
    );
};

export default Input;