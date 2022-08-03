
import React, { useContext, useEffect, useState } from "react";
import EmailsList from "../components/EmailList/index.js";
import Header from '../components/Header/index.js'
import { observer } from "mobx-react-lite";
import { EmailContext, UserContext } from "../index";

function UserPage() {

  const [search, setSearch] = useState('');
  const [emails, setEmails] = useState([]);
  const [mode, setMode] = useState();
  const { emailStore } = useContext(EmailContext)
  const { userStore } = useContext(UserContext)


  const uploadEmails = async () => {
    switch (localStorage.getItem('mode')) {
      case 'inboxes': await emailStore.getInboxes(userStore.user.id);
        break;
      case 'outboxes': await emailStore.getOutboxes(userStore.user.id);
        break;
      case 'importans': await emailStore.getImportans(userStore.user.id);
        break;
    }
    setEmails(emailStore.emails);
    setMode(localStorage.getItem('mode'))
  }

  const onSearchInput = (searchValue) => {
    setSearch(searchValue);
  };

  const onClearSearch = () => {
    setSearch('');
  };

  React.useEffect(() => {
    uploadEmails().catch(console.error);
  }, [emailStore, userStore, localStorage.getItem('mode')])

  const filtredSearch = emails.filter(searchText => searchText.description.toLowerCase().includes(search.toLowerCase()) ||
    searchText.senderName.toLowerCase().includes(search.toLowerCase()) ||
    searchText.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className={`app-wrapper  ${userStore.user.theme}`}>
      <Header clearSearch={onClearSearch} searchChange={onSearchInput} currentSearch={search} setMode={setMode} 
      emailMode={false} uploadEmails={uploadEmails}/>
      <EmailsList filtredSearch={filtredSearch} search={search} mode={localStorage.getItem('mode')} uploadEmails={uploadEmails} />
    </div>
  );
}

export default observer(UserPage);
