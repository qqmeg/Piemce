import styles from  './Input.module.css'

export const Input = ({
    label, 
    type = 'text', 
    value, 
    onChange,
    placeholder,
    required = false
}) => {
    return (
        <div className="{styles.contaainer}">
            {label && <label className='{styles.label}'>{label}</label>}
            <input 
            type={type}
            value = {value}
            onChange={onChange}
            placeholder={placeHolder}
            required={required}
            className='{styles.input}' 
            />
        </div>
    );
};