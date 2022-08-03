import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailContext, UserContext } from '../..';
import './currentEmail.css'

function CurrentEmail({ email }) {

    const { emailStore } = useContext(EmailContext)
    const { userStore } = useContext(UserContext)

    let navigate = useNavigate();

    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [emailImportant, setEmailImportant] = useState();
    const emailDateSend = new Date(email.dateSend);
    const emailDateEdit = new Date(email.dateEdited);
    const emailReadDate = new Date(email.dateRead);

    useEffect(() => {
        setTitle(email.title);
        setSenderEmail(email.senderEmail);
        setEmailImportant(email.isImportant);
        { localStorage.getItem('mode') === 'outboxes' && setDescription(email.description) }
    }, [email.isImportant, email.title])

    const onClickImportant = async () => {
        await emailStore.setIsImportantEmail(email._id);
        setEmailImportant(!emailImportant);
    }

    const onClickDelete = async () => {
        await emailStore.deleteEmail(email._id);
        emailStore.setLoading(true);
        navigate("../", { replace: true });
    }

    const handleDescription = (event) => {
        setDescription(event.target.value);
    }
    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleClear = () => {
        if (localStorage.getItem('mode') === 'outboxes') {
            setDescription(email.description);
            setTitle(email.title);
        }
        else {
            setDescription('');
            setTitle(email.title);
        }
    }

    async function handleSendEmail(e) {
        try {
            e.preventDefault();
            await emailStore.sendEmail(description, title, email.senderEmail, userStore.user.id);
            handleClear();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleEditEmail(e) {
        try {
            e.preventDefault();
            await emailStore.editEmail(description, title, email._id);
            emailStore.setLoading(true);
            navigate("../", { replace: true });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="content-wrapper">
            <div className="content-wrapper__email-data">
                <div className={`email-info  ${userStore.user.theme}`}>
                    <h2>Title: <span>{email.title}</span></h2>
                    {localStorage.getItem('mode') === 'outboxes'
                        ? <h2>Status: <span>{email.isRead
                            ? `Read (${emailReadDate.toLocaleDateString()} at ${emailReadDate.toLocaleTimeString()})`
                            : "Unread"}</span>
                        </h2>
                        : <h2>Sender: <span>{email.senderName} {'<'}{email.senderEmail}{'>'}</span></h2>
                    }
                    <h3>Description:</h3>
                    <textarea disabled={true} value={email.description}></textarea>
                    <div className='email-info__date'>
                        {localStorage.getItem('mode') === 'outboxes'
                            ? <button className="bin-wrapper" onClick={onClickDelete}>
                                <img src={'/img/bin.png'} alt={'binImg'} />
                            </button>
                            : <button className="star-wrapper" onClick={onClickImportant}>
                                <img src={emailImportant
                                    ? '/img/starColored.png'
                                    : '/img/star.png'} alt={'starImg'} />
                            </button>
                        }
                        <div><b>Sended: </b>{emailDateSend.toLocaleDateString()} ({emailDateSend.toLocaleTimeString()})
                            {email.isEdited
                                ? <><b> Edited: </b>{emailDateEdit.toLocaleDateString()} ({emailDateEdit.toLocaleTimeString()})</>
                                : null}</div>
                    </div>
                </div>
                <div className="reply-mail-div">
                    <input type="checkbox" id="content-wrapper__btnControl" />
                    <label className="content-wrapper__btn" htmlFor="content-wrapper__btnControl">
                        <div className={`content-wrapper__cover  ${userStore.user.theme}`}>{localStorage.getItem('mode') == 'outboxes' ? 'Edit Form' : 'Reply Form'}</div>
                    </label>
                    <div className={`reply-mail-window  ${userStore.user.theme}`}>
                        <div className="write-mail-recipient">
                            <h2>Recipient:</h2>
                            <textarea
                                
                                disabled={true}
                                value={senderEmail}
                                rows={1}
                                cols={60}
                            />
                        </div>
                        <div className="write-mail-title">
                            <h2>Title:</h2>
                            <textarea
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
                                onChange={handleDescription}
                                value={description}
                                placeholder='Your reply..'
                                rows={8}
                                cols={60}

                            />
                        </div>
                        <div className={`write-mail-buttons ${userStore.user.theme}`}>

                            <button onClick={handleClear}>Clear</button>
                            {localStorage.getItem('mode') == 'outboxes'
                                ? <button onClick={handleEditEmail} disabled={!title || !description}>Edit</button>
                                : <button onClick={handleSendEmail} disabled={!title || !description}>Send</button>}
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default CurrentEmail;