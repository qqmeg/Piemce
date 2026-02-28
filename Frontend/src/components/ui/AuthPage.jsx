//MAXIM, this is AI code. Should be ok, but may need to rewrite it
//the return part works as expected
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import PasswordResetPage from "./PasswordResetPage";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    if (
      field === "email" ||
      field === "password" ||
      field === "confirmPassword" ||
      field === "username"
    ) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!formData.password.trim()) {
      setError("Password is required");
      return;
    }

    if (!isLogin && !formData.username.trim()) {
      setError("Username is required");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const endpoint = isLogin
        ? "http://127.0.0.1:8000/api/users/login/"
        : "http://127.0.0.1:8000/api/users/create/";

      const submitData = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            email: formData.email,
            password: formData.password,
            username: formData.username,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();
      console.log(isLogin ? "Login Success" : "Registration Success", data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleForgotPassword = () => {
    setShowPasswordReset(true);
  };

  const handleBackToLogin = () => {
    setShowPasswordReset(false);
  };

  if (showPasswordReset) {
    return <PasswordResetPage onBackToLogin={handleBackToLogin} />;
  }

  return (
    //this code should be ok
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <svg
                width="39.336"
                height="44"
                viewBox="0 0 39.336 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="4.594"
                  cy="4.594"
                  rx="4.594"
                  ry="4.594"
                  transform="translate(327.923 290.661)"
                  fill="currentColor"
                />
                <ellipse
                  cx="4.594"
                  cy="4.594"
                  rx="4.594"
                  ry="4.594"
                  transform="translate(327.923 325.472)"
                  fill="currentColor"
                />
                <ellipse
                  cx="4.594"
                  cy="4.594"
                  rx="4.594"
                  ry="4.594"
                  transform="translate(312.85 299.364)"
                  fill="currentColor"
                />
                <ellipse
                  cx="4.594"
                  cy="4.594"
                  rx="4.594"
                  ry="4.594"
                  transform="translate(342.997 316.769)"
                  fill="currentColor"
                />
                <ellipse
                  cx="4.594"
                  cy="4.594"
                  rx="4.594"
                  ry="4.594"
                  transform="translate(342.997 299.364)"
                  fill="currentColor"
                />
                <ellipse
                  cx="4.594"
                  cy="4.594"
                  rx="4.594"
                  ry="4.594"
                  transform="translate(312.85 316.769)"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h1 className={styles.title}>
              {isLogin ? "Welcome back" : "Sign up"}
            </h1>
            {!isLogin && (
              <p className={styles.subtitle}>Begin by creating an account</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              required
            />

            {!isLogin && (
              <Input
                label="Username"
                type="text"
                value={formData.username}
                onChange={handleChange("username")}
                required
              />
            )}

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange("password")}
              required
            />

            {isLogin && (
              <div className={styles.forgotPassword}>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className={styles.forgotPasswordButton}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {!isLogin && (
              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange("confirmPassword")}
                required
              />
            )}

            <ErrorMessage error={error} />

            <Button type="submit" className={styles.submitButton}>
              {isLogin ? "Sign in" : "Continue"}
            </Button>
          </form>

          <div className={styles.footer}>
            <p className={styles.toggleText}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleMode}
                className={styles.toggleButton}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
