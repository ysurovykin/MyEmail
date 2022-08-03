import { useContext } from 'react';
import { EmailContext } from '../../index';
import Email from '../Email/index.js'
import EmailLoader from '../EmailLoader';
import ZeroEmails from '../ZeroEmails';
import './emailList.css'

function EmailsList({ filtredSearch, search, mode, uploadEmails}) {

    const { emailStore } = useContext(EmailContext)

    const zeroEmails = !!emailStore.emails.length
    
    const emails = zeroEmails
        ? filtredSearch.length
            ? filtredSearch.map((emails) => (
                <Email
                    key={emails._id}
                    id={emails._id}
                    senderName={emails.senderName}
                    title={emails.title}
                    text={emails.description}
                    isImportant={emails.isImportant}
                    isRead={emails.isRead}
                    dateSend={new Date(emails.dateSend).toLocaleDateString()}
                    mode={mode}
                    uploadEmails={uploadEmails}
                />
            ))
            : <h2 className="no-emails-searched">There is no emails for search:<textarea value={search}></textarea></h2>
        : <ZeroEmails mode={mode} />
    return (
        <div className="content-wrapper">
            <div className="content-wrapper__content">
                {emailStore.isLoading
                ? <EmailLoader/>
                : emails
                }
            </div>
        </div>
    )
}

export default EmailsList;