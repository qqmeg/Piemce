import styles from './ErrorMessage.module.css';

// Reusable error message component that matches the design system
const ErrorMessage = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <div className={`${styles.error} ${className}`}>
      {error}
    </div>
  );
};

export default ErrorMessage;
