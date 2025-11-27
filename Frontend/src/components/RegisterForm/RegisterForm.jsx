import { useState } from "react";
import Button from '../ui/Button';
import Input from '../ui/Input';

const RegisterForm = () => {
    const [userData, setUserData] = useState({
        'email': '',
        'bio': '',
        'passw': '',
        'username': ''
    });

    const handleChange = (field) => (e) => {
        setUserData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            console.log("Success", data);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <Input 
                label='Email' 
                type='email' 
                value={userData.email} 
                onChange={handleChange('email')}
            />
            <Input 
                label='Password' 
                type='password' 
                value={userData.passw} 
                onChange={handleChange('passw')}
            />
            <Input 
                label='Username' 
                type='text' 
                value={userData.username} 
                onChange={handleChange('username')}
            />
            <Input 
                label='Bio' 
                type='text' 
                value={userData.bio} 
                onChange={handleChange('bio')}
            />
            <Button type="submit">Register</Button>
        </form>
    )   
}

export default RegisterForm;