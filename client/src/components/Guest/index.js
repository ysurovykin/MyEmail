import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../index";
import './guest.css'
function Guest() {

    const [isLogin, setIsLogin] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [emailLog, setEmailLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [nameReg, setNameReg] = useState('');

    const [isEmailLogHover, setIsEmailLogHover] = useState(false)
    const [isEmailRegHover, setIsEmailRegHover] = useState(false)
    const [isPasswordRegHover, setIsPasswordRegHover] = useState(false)
    const [isNameRegHover, setIsNameRegHover] = useState(false)

    const [isCorrectPasswordLog, setIsCorrectPasswordLog] = useState(true);
    const [isCorrectEmailLog, setIsCorrectEmailLog] = useState(true);
    const [isCorrectEmailReg, setIsCorrectEmailReg] = useState(false);

    const { register, formState: { errors, isValid }, clearErrors } = useForm({ mode: "onBlur" });

    const { userStore } = useContext(UserContext)

    function onHoverError(errorObj) {
        switch (errorObj.target.id) {
            case 'log-email-tag': setIsEmailLogHover(true);
                break;
            case 'reg-email-tag': setIsEmailRegHover(true);
                break;
            case 'reg-password-tag': setIsPasswordRegHover(true);
                break;
            case 'reg-name-tag': setIsNameRegHover(true);
                break;
        }
    };
    function onOutHoverError(errorObj) {
        switch (errorObj.target.id) {
            case 'log-email-tag': setIsEmailLogHover(false);
                break;
            case 'reg-email-tag': setIsEmailRegHover(false);
                break;
            case 'reg-password-tag': setIsPasswordRegHover(false);
                break;
            case 'reg-name-tag': setIsNameRegHover(false);
                break;
        }
    };

    const onClickLogin = () => {
        setIsLogin(!isLogin);
        setIsSignup(false);
        setNameReg('');
        setEmailReg('');
        setPasswordReg('');
        setIsCorrectEmailReg(true);
        clearErrors('reg')
    };
    const onClickSignup = () => {
        setIsSignup(!isSignup);
        setIsLogin(false);
        setEmailLog('');
        setPasswordLog('');
        setIsCorrectEmailLog(true);
        setIsCorrectPasswordLog(true);
    };

    async function checkEmailLog(event) {
        try {
            event.preventDefault();
            await userStore.getUserByEmail(emailLog);
            setIsCorrectEmailLog(!userStore.isFreeEmail);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleLogin(event) {
        try {
            event.preventDefault();
            await userStore.login(emailLog, passwordLog);
            setIsCorrectPasswordLog(false)
        } catch (error) {
            console.log(error);
            setIsCorrectPasswordLog(false)
        }
    }

    async function handleRegistration(event) {
        try {
            event.preventDefault();
            await userStore.registration(emailReg, passwordReg, nameReg);
            setIsCorrectEmailReg(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="log-sign-menu-wrapper">
            <div className="login-form-wrapper" style={isLogin ? { left: '23%' } : { left: '37%' }}>
                <form className="login-form" onSubmit={handleLogin}>
                    <h2
                        onMouseOver={onHoverError}
                        onMouseOut={onOutHoverError}
                        className={!isCorrectEmailLog
                            ? "error"
                            : null
                        }
                        id={'log-email-tag'}>Email adress:
                    </h2>
                    <input
                        placeholder="email@myemail.com"
                        required
                        value={(!isCorrectEmailLog && isEmailLogHover) ? "Incorrect email" : emailLog}
                        onBlur={checkEmailLog}
                        onChange={(event) => setEmailLog(event.target.value)}
                    />
                    <h2
                        onMouseOver={onHoverError}
                        onMouseOut={onOutHoverError}
                        className={!isCorrectPasswordLog
                            ? "error"
                            : null
                        }
                        id={'log-password-tag'}>Password:</h2>
                    <input
                        type={'password'}
                        placeholder="Password"
                        required
                        value={passwordLog}
                        onChange={(event) => setPasswordLog(event.target.value)}
                    />
                    {!isCorrectPasswordLog && <p className="incorrect-log">Incorrect passsword</p>}
                    <button type="submit" disabled={!isCorrectEmailLog || !passwordLog.length} className="login-btn">Confirm</button>
                </form>
                <div className="login-arrow" onClick={onClickLogin}>Log In</div>
            </div>

            <div className="signup-form-wrapper" style={isSignup ? { left: '51%' } : { left: '37%' }}>
                <form className="signup-form">
                    <h2
                        onMouseOver={onHoverError}
                        onMouseOut={onOutHoverError}
                        className={errors['reg']?.name
                            ? "error"
                            : null
                        }
                        id={'reg-name-tag'}>Name:</h2>
                    <input
                        placeholder="Name"
                        required
                        value={(errors['reg']?.name && isNameRegHover) ? errors['reg']?.name?.message || 'Error' : nameReg}
                        {...register('reg.name', { required: "Enter name" })}
                        onChange={(event) => setNameReg(event.target.value)}
                    />
                    <h2
                        onMouseOver={onHoverError}
                        onMouseOut={onOutHoverError}
                        className={(errors['reg']?.email || !isCorrectEmailReg)
                            ? "error"
                            : null
                        }
                        id={'reg-email-tag'}>Email adress:</h2>
                    <input
                        placeholder="email@myemail.com"
                        required
                        value={(errors['reg']?.email && isEmailRegHover)
                            ? errors['reg']?.email?.message || 'Error'
                            : (!isCorrectEmailReg && isEmailRegHover)
                                ? "Email already exist"
                                : emailReg}
                        {...register('reg.email', { required: "Enter email", pattern: { value: /\S+@myemail+\.com+/, message: "Incorrect email" } })}
                        onChange={(event) => setEmailReg(event.target.value)}
                    />
                    <h2
                        onMouseOver={onHoverError}
                        onMouseOut={onOutHoverError}
                        className={errors['reg']?.password
                            ? "error"
                            : null
                        }
                        id={'reg-password-tag'}>Password:</h2>
                    <input
                        type={(errors['reg']?.password && isPasswordRegHover) ? 'text' : 'password'}
                        placeholder="Password"
                        required
                        value={(errors['reg']?.password && isPasswordRegHover) ? errors['reg']?.password?.message || 'Error' : passwordReg}
                        {...register('reg.password', { required: "Enter password", minLength: { value: 4, message: "Too short passsword" } })}
                        onChange={(event) => setPasswordReg(event.target.value)}
                    />
                    <button type="submit" disabled={!isValid} onClick={handleRegistration} className="signup-btn">Confirm</button>
                </form>
                <div className="signup-arrow" onClick={onClickSignup}>Sign Up</div>
            </div>
            <div className="menu-wrapper">
                <div className="log-sign-menu">
                    <h1>MyEMail</h1>
                </div>
            </div>
        </div>
    )
}

export default Guest;