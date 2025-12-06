import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
import Button from '../ui/Button';
import Input from '../ui/Input';
import styles from './LoginForm.module.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        'email': '',
        'password': ''
    });

    const [errors, setErrors] = useState({});
    // const dispatch = useDispatch();

    const handleChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email) {
            newErrors.email = 'No email';
        }

        if (!formData.password) {
            newErrors.password = 'No password';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        console.log('Form data:', formData);
        
        // Save userData logic here
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}> {/* Fixed className */}
            <h2>Sign In</h2>
            <Input 
                label='Email' 
                type='email' 
                value={formData.email} 
                onChange={handleChange('email')} 
                placeholder="your@email.com"
                error={errors.email}
            />
            <Input 
                label="Password" 
                type="password" 
                value={formData.password} 
                onChange={handleChange('password')} 
                placeholder="Type your password" 
                error={errors.password}
            />
            <Button type="submit">
                Enter
            </Button>
        </form>
    )
};

export default LoginForm;