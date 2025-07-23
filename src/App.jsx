import React, { useState } from 'react'

// Main App component
function App() {
  // State variables for form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // State variables for error messages
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [submissionMessage, setSubmissionMessage] = useState('')

  // Inline styles for the application
  const appStyles = {
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
    boxSizing: 'border-box',
  }

  const formContainerStyles = {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  }

  const titleStyles = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: '600',
  }

  const formGroupStyles = {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  }

  const labelStyles = {
    marginBottom: '8px',
    fontWeight: '500',
    color: '#555',
    fontSize: '15px',
  }

  const inputStyles = {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  }

  const inputFocusStyles = {
    borderColor: '#007bff',
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.25)',
  }

  const errorTextStyles = {
    color: '#dc3545',
    fontSize: '13px',
    marginTop: '5px',
  }

  const submitButtonStyles = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '15px 25px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    alignSelf: 'center',
    width: '100%',
    maxWidth: '200px',
  }

  const submitButtonHoverStyles = {
    backgroundColor: '#0056b3',
    transform: 'translateY(-2px)',
  }

  const submissionMessageStyles = {
    textAlign: 'center',
    marginTop: '20px',
    padding: '15px',
    borderRadius: '8px',
    fontWeight: '500',
  }

  const successMessageStyles = {
    ...submissionMessageStyles,
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  }

  const errorMessageStyles = {
    ...submissionMessageStyles,
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  }

  /**
   * Validates the form fields.
   * @returns {boolean} True if all validations pass, false otherwise.
   */
  const validateForm = () => {
    let isValid = true

    // Reset all errors
    setNameError('')
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')
    setSubmissionMessage('')

    // Name validation
    if (!name.trim()) {
      setNameError('El nombre es obligatorio.')
      isValid = false
    }

    // Email validation
    if (!email.trim()) {
      setEmailError('El email es obligatorio.')
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('El email no es válido.')
      isValid = false
    }

    // Password validation (10 characters, uppercase, lowercase, number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/
    if (!password.trim()) {
      setPasswordError('La clave es obligatoria.')
      isValid = false
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        'La clave debe tener al menos 10 caracteres, incluyendo mayúsculas, minúsculas y números.'
      )
      isValid = false
    }

    // Confirm Password validation
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('La confirmación de clave es obligatoria.')
      isValid = false
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(
        'La clave y la confirmación de clave no coinciden.'
      )
      isValid = false
    }

    return isValid
  }

  /**
   * Handles the form submission.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent default form submission behavior

    if (validateForm()) {
      // If validation passes, simulate successful registration
      setSubmissionMessage({
        type: 'success',
        text: '¡Registro exitoso! Datos enviados correctamente.',
      })
      // Here you would typically send data to a backend API
      console.log('Formulario enviado:', { name, email, password })
      // Optionally, clear the form
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } else {
      setSubmissionMessage({
        type: 'error',
        text: 'Por favor, corrige los errores en el formulario.',
      })
    }
  }

  return (
    <div style={appStyles}>
      <div style={formContainerStyles}>
        <h2 style={titleStyles}>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={formGroupStyles}>
            <label
              htmlFor='name'
              style={labelStyles}
            >
              Nombre:
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={
                nameError
                  ? { ...inputStyles, borderColor: '#dc3545' }
                  : inputStyles
              }
              onFocus={(e) =>
                (e.target.style.borderColor = inputFocusStyles.borderColor)
              }
              onBlur={(e) =>
                (e.target.style.borderColor = nameError ? '#dc3545' : '#ddd')
              }
              // Removed 'required' attribute
            />
            {nameError && <p style={errorTextStyles}>{nameError}</p>}
          </div>

          {/* Email Field */}
          <div style={formGroupStyles}>
            <label
              htmlFor='email'
              style={labelStyles}
            >
              Email:
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={
                emailError
                  ? { ...inputStyles, borderColor: '#dc3545' }
                  : inputStyles
              }
              onFocus={(e) =>
                (e.target.style.borderColor = inputFocusStyles.borderColor)
              }
              onBlur={(e) =>
                (e.target.style.borderColor = emailError ? '#dc3545' : '#ddd')
              }
              // Removed 'required' attribute
            />
            {emailError && <p style={errorTextStyles}>{emailError}</p>}
          </div>

          {/* Password Field */}
          <div style={formGroupStyles}>
            <label
              htmlFor='password'
              style={labelStyles}
            >
              Clave:
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={
                passwordError
                  ? { ...inputStyles, borderColor: '#dc3545' }
                  : inputStyles
              }
              onFocus={(e) =>
                (e.target.style.borderColor = inputFocusStyles.borderColor)
              }
              onBlur={(e) =>
                (e.target.style.borderColor = passwordError
                  ? '#dc3545'
                  : '#ddd')
              }
              // Removed 'required' attribute
            />
            {passwordError && <p style={errorTextStyles}>{passwordError}</p>}
          </div>

          {/* Confirm Password Field */}
          <div style={formGroupStyles}>
            <label
              htmlFor='confirmPassword'
              style={labelStyles}
            >
              Confirmación de Clave:
            </label>
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={
                confirmPasswordError
                  ? { ...inputStyles, borderColor: '#dc3545' }
                  : inputStyles
              }
              onFocus={(e) =>
                (e.target.style.borderColor = inputFocusStyles.borderColor)
              }
              onBlur={(e) =>
                (e.target.style.borderColor = confirmPasswordError
                  ? '#dc3545'
                  : '#ddd')
              }
              // Removed 'required' attribute
            />
            {confirmPasswordError && (
              <p style={errorTextStyles}>{confirmPasswordError}</p>
            )}
          </div>

          {/* Submission Button */}
          <button
            type='submit'
            style={submitButtonStyles}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor =
                submitButtonHoverStyles.backgroundColor
              e.target.style.transform = submitButtonHoverStyles.transform
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor =
                submitButtonStyles.backgroundColor
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Registrarse
          </button>

          {/* Submission Message */}
          {submissionMessage && (
            <div
              style={
                submissionMessage.type === 'success'
                  ? successMessageStyles
                  : errorMessageStyles
              }
            >
              {submissionMessage.text}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default App
