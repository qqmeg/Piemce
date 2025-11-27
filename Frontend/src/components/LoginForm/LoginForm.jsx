import { useState } from "react";
import { useDispatch } from 'react-redux'
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import styles from 'LoginForm.module.css';

export const LoginForm = () => {
    const [formData, setFormData] = useState({
        'email': '',
        'password': ''
    });

    const [errors, setErrors] = useState({});

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
    if (!formData.email) {
        newErrors.email = 'No email';
    }

    if (!formData.password) {
        newErrors.email = 'No password'
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const userData = await login(data).unwrap();

    // Сохранение userData
  };

  return (
    <form onSubmit={handleSubmit}
    className="{styles.form}"
    >
        <h2>Sign In</h2>
        <Input label='Email' type='email' value={formData.email} onChange={handleChange('email')} placeholder="your@email.com" />
        <Input label="Password" type="password" value={formData.password} onChange={handleChange('password')} placeholder="Type your password" />
        <Button type="submit">Enter</Button>
    </form>
  )
}

