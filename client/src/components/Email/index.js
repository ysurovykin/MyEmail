import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailContext } from "../..";
import './email.css';

function Email(props) {

  const { emailStore } = useContext(EmailContext)
  let navigate = useNavigate();
  
  const [emailImportant, setEmailImportant] = useState(props.isImportant)

  const onClickImportant = async (e) => {
    e.stopPropagation();
    await emailStore.setIsImportantEmail(props.id);
    setEmailImportant(!emailImportant);
  };

  const onClickEmail = async () => {
    if (!props.isRead && localStorage.getItem('mode') !== 'outboxes') {
      await emailStore.setIsReadEmail(props.id);
    }
    emailStore.setLoading(true);
    localStorage.setItem('mode', props.mode);
    navigate('../' + props.id);
  }

  const onClickDelete = async (e) => {
    e.stopPropagation();
    await emailStore.deleteEmail(props.id);
    props.uploadEmails()
  }

  return (
    <div className={props.isRead
      ? localStorage.getItem('mode') === 'outboxes'
        ? "email outbox"
        : "email"
      : localStorage.getItem('mode') === 'outboxes'
        ? "email unread outbox"
        : "email unread"
    }
      onClick={onClickEmail} >
      {
        localStorage.getItem('mode') === 'outboxes'
          ? <button className="img-wrapper"><img className="outbox-img" width={32} height={32} onClick={onClickDelete} src={"/img/emailSend.png"} alt={"sendedEmail"} /></button>
          : <button className="img-wrapper"><img width={24} height={24} onClick={onClickImportant} src={emailImportant ? "/img/starColored.png" : "/img/star.png"} alt={"isImportant"} /></button>
      }
      <h1>{props.senderName}</h1>
      <h2><span>{props.title}</span>{props.text}</h2>
      <p>{props.dateSend}</p>
    </div >
  );
}

export default Email;