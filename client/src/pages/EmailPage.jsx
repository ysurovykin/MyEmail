import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { EmailContext, UserContext } from '..';
import CurrentEmail from '../components/CurrentEmail';
import EmailLoader from '../components/EmailLoader';
import Header from '../components/Header';

function EmailPage() {
    const { id } = useParams();
    const [email, setEmail] = useState({});

    const { emailStore } = useContext(EmailContext);
    const {userStore} = useContext(UserContext)

    useEffect(() => {
        const uploadEmail = async () => {
            await emailStore.getEmailById(id);
            setEmail(emailStore.curEmail);
        }
        uploadEmail().catch(console.error);
    }, [])

    return (
        <div className={`app-wrapper ${userStore.user.theme}`}>
            {emailStore.isLoading
                ? <div className="app-wrapper__email-loader"><EmailLoader /></div>
                : <>
                    <Header emailMode={true} email={email} />
                    <CurrentEmail email={email} />
                </>
            }
        </div>
    );
}

export default EmailPage;