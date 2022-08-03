import './zeroEmails.css'

function ZeroEmails({mode}) {
    switch (mode) {
        case 'inboxes':
            return (
                <div className="zero-emails-wrapper">
                    <img className="zero-emails-wrapper__img" src={'/img/zeroInboxes.png'} />
                    <h1 className="zero-emails-wrapper__text">You have not received any emails yet</h1>
                </div>
            );
        case 'outboxes':
            return (
                <div className="zero-emails-wrapper">
                    <img className="zero-emails-wrapper__img" src={'/img/zeroOutboxes.png'} />
                    <h1 className="zero-emails-wrapper__text">You have not sent any emails yet</h1>
                </div>
            );
        case 'importans':
            return (
                <div className="zero-emails-wrapper">
                    <img className="zero-emails-wrapper__img" src={'/img/zeroImportans.png'} />
                    <h1 className="zero-emails-wrapper__text">You have not marked any email as important</h1>
                </div>
            );
    }
}

export default ZeroEmails;