import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import styles from './PasswordResetPage.module.css';

const PasswordResetPage = ({ onBackToLogin }) => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));

    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with actual password reset API endpoint
      const response = await fetch('http://127.0.0.1:8000/api/users/password-reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password reset instructions have been sent to your email.");
      } else {
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <svg width="39.336" height="44" viewBox="0 0 39.336 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="4.594" cy="4.594" rx="4.594" ry="4.594" transform="translate(327.923 290.661)" fill="currentColor"/>
                <ellipse cx="4.594" cy="4.594" rx="4.594" ry="4.594" transform="translate(327.923 325.472)" fill="currentColor"/>
                <ellipse cx="4.594" cy="4.594" rx="4.594" ry="4.594" transform="translate(312.85 299.364)" fill="currentColor"/>
                <ellipse cx="4.594" cy="4.594" rx="4.594" ry="4.594" transform="translate(342.997 316.769)" fill="currentColor"/>
                <ellipse cx="4.594" cy="4.594" rx="4.594" ry="4.594" transform="translate(342.997 299.364)" fill="currentColor"/>
                <ellipse cx="4.594" cy="4.594" rx="4.594" ry="4.594" transform="translate(312.85 316.769)" fill="currentColor"/>
              </svg>
            </div>
            <h1 className={styles.title}>
              Reset your password
            </h1>
            <p className={styles.subtitle}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              required
            />

            {error && <ErrorMessage error={error} />}

            {success && (
              <div className={styles.success}>
                {success}
              </div>
            )}

            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send reset link'}
            </Button>
          </form>

          <div className={styles.footer}>
            <button
              type="button"
              onClick={onBackToLogin}
              className={styles.backButton}
            >
              ← Back to sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
