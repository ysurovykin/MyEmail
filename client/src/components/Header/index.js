import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailContext, UserContext } from "../../index";
import ThemeCircle from "../ThemeCircle";
import './header.css'

function Header({ searchChange, currentSearch, clearSearch, setMode, emailMode, uploadEmails }) {

    const [isSettings, setIsSettings] = useState(false);
    const [isAccount, setIsAccount] = useState(false);
    const [isWriteMail, setIsWriteMail] = useState(false);

    const [isCorrectRecipientEmail, setIsCorrectRecipientEmail] = useState(true);

    const [isInboxes, setIsInboxes] = useState(false);
    const [isOutboxes, setIsOutboxes] = useState(false);
    const [isImportants, setisImportants] = useState(false);

    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');

    const { userStore } = useContext(UserContext)
    const { emailStore } = useContext(EmailContext)

    const [colorTheme, setColorTheme] = useState(userStore.user.theme)

    let navigate = useNavigate();

    useEffect(() => {
        async function changing(){
            await userStore.changeTheme(userStore.user.email, colorTheme);
            userStore.setColorTheme(colorTheme)
        }
        changing()
    }, [colorTheme])

    useEffect(() => {
        switch (localStorage.getItem('mode')) {
            case 'inboxes': setIsInboxes(true);
                break;
            case 'outboxes': setIsOutboxes(true);
                break;
            case 'importans': setisImportants(true);
                break;
        }
    }, [localStorage.getItem('mode')])


    const handleSearch = (event) => {
        searchChange(event.target.value);
    }
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }
    const handleTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleResipientEmail = (event) => {
        setRecipientEmail(event.target.value);
    }
    const handleClear = () => {
        setDescription('');
        setTitle('');
        setRecipientEmail('');
        setIsCorrectRecipientEmail(true);
    }
    function handleBackToEmails() {
        emailStore.setLoading(true);
        navigate("../", { replace: true });
    }

    const onClickSettings = () => {
        setIsSettings(!isSettings);
        setIsAccount(false);
        setIsWriteMail(false);
    };
    const onClickAccount = () => {
        setIsAccount(!isAccount);
        setIsSettings(false);
        setIsWriteMail(false);
    };
    const onClickPen = () => {
        handleClear();
        setIsWriteMail(!isWriteMail);
        setIsAccount(false);
        setIsSettings(false);
    };

    async function checkRecipientEmail(event) {
        try {
            event.preventDefault();
            await userStore.getUserByEmail(recipientEmail);
            setIsCorrectRecipientEmail(!userStore.isFreeEmail);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleLogout(e) {
        try {
            e.preventDefault();
            await userStore.logout()
            navigate("../", { replace: true });
        } catch (error) {
            console.log(error);
        }
    }
    async function handleSendEmail(e) {
        try {
            e.preventDefault();
            await emailStore.sendEmail(description, title, recipientEmail, userStore.user.id);
            handleClear();
            setIsWriteMail(false);
            setIsCorrectRecipientEmail(true);
            uploadEmails();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleInboxes(e) {
        try {
            e.preventDefault();
            setMode('inboxes');
            localStorage.setItem('mode', 'inboxes');
            emailStore.setLoading(true);
            navigate("../", { replace: true });
            setIsInboxes(true);
            setIsOutboxes(false);
            setisImportants(false);
        } catch (error) {
            console.log(error);
        }
    }
    async function handleOutboxes(e) {
        try {
            e.preventDefault();
            setMode('outboxes');
            localStorage.setItem('mode', 'outboxes');
            emailStore.setLoading(true);
            navigate("../", { replace: true });
            setIsInboxes(false);
            setIsOutboxes(true);
            setisImportants(false);
        } catch (error) {
            console.log(error);
        }

    }
    async function handleImportans(e) {
        try {
            e.preventDefault();
            setMode('importans');
            localStorage.setItem('mode', 'importans');
            emailStore.setLoading(true);
            navigate("../", { replace: true });
            setIsInboxes(false);
            setIsOutboxes(false);
            setisImportants(true);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <header>
            <div className="header-left" >
                <p>MyEMail</p>
            </div>
            {emailMode
                ? <button className={`header-back-btn  ${userStore.user.theme}`} onClick={handleBackToEmails}>To emails</button>
                : <>
                    <div className={`header-midl ${userStore.user.theme}`}>
                        <input placeholder="Search:" onChange={handleSearch} value={currentSearch}></input>
                        {currentSearch ? <img width={32} height={32} style={{ cursor: "pointer" }} onClick={clearSearch} src="/img/close.png" alt="search"></img> : <img width={32} height={32} src="/img/search.png" alt="search"></img>}
                    </div>
                    <div className="header-right">
                        <ul>
                            <button className="img-wrapper" style={isWriteMail ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null}><img width={32} height={32} onClick={onClickPen} src="/img/pen.png" alt="account"></img></button>
                            <button className="img-wrapper" style={isSettings ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null}><img width={32} height={32} onClick={onClickSettings} src="/img/settings.png" alt="settings"></img></button>
                            <button className="img-wrapper" style={isAccount ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null}><img width={32} height={32} onClick={onClickAccount} src="/img/account32x32.png" alt="account"></img></button>
                        </ul>
                        {isSettings ? <>
                            <div className={`setting-window ${userStore.user.theme}`}>
                                <button className="img-wrapper" style={isInboxes ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null}><img width={32} height={32} onClick={handleInboxes} src="/img/allEmails.png" alt="settings"></img></button>
                                <button className="img-wrapper" style={isOutboxes ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null}><img width={32} height={32} onClick={handleOutboxes} src="/img/emailSend.png" alt="settings"></img></button>
                                <button className="img-wrapper" style={isImportants ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null}><img width={32} height={32} onClick={handleImportans} src="/img/star.png" alt="settings"></img></button>
                            </div></> : null
                        }
                        {isWriteMail ? <>
                            <form className={`write-mail-window ${userStore.user.theme}`}>
                                <div className="write-mail-recipient">
                                    <h2 className={!isCorrectRecipientEmail
                                        ? "error"
                                        : null}>Recipient: {!isCorrectRecipientEmail ? "(User does not exist)" : null}</h2>
                                    <textarea
                                        required
                                        onChange={handleResipientEmail}
                                        value={recipientEmail}
                                        onBlur={checkRecipientEmail}
                                        rows={1}
                                        cols={60}
                                    />
                                </div>
                                <div className="write-mail-title">
                                    <h2>Title:</h2>
                                    <textarea
                                        required
                                        onChange={handleTitle}
                                        value={title}
                                        rows={1}
                                        cols={60}
                                        maxLength={45}
                                    />
                                </div>
                                <div className="write-mail-text">
                                    <h2>Description:</h2>
                                    <textarea
                                        required
                                        onChange={handleDescription}
                                        value={description}
                                        rows={8}
                                        cols={60}
                                    />
                                </div>
                                <div className="write-mail-buttons">
                                    <button onClick={handleClear}>Clear</button>
                                    <button onClick={handleSendEmail} disabled={!isCorrectRecipientEmail || !title || !description}>Send</button>
                                </div>
                            </form></> : null
                        }
                        {isAccount ? <>
                            <div className={`account-window ${userStore.user.theme}`}>
                                <div className="personal-info">
                                    <img width={64} height={64} src="/img/account64x64.png" alt="settings"></img>
                                    <h1>{userStore.user.name}</h1>
                                </div>
                                <div>
                                    <h1>Choose theme</h1>
                                    <div className="theme-cicrcle-wrapper">
                                        {userStore.themes.map((theme) => (
                                            <ThemeCircle
                                                key={theme}
                                                theme={theme}
                                                choosenColorTheme={colorTheme}
                                                setColorTheme={setColorTheme}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button className="exit-btn" onClick={handleLogout}>Exit</button>
                            </div></> : null
                        }
                    </div>
                </>
            }
        </header>
    );
}
export default Header;