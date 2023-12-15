import './App.css';

import Navbar from './components/Navbar';
import Contacts from './components/contact/Contacts';
import AddContact from './components/contact/AddContact';
import EditContact from './components/contact/EditContact';
import ViewContact from './components/contact/ViewContact';
import { ContactContext } from './context/ContactContext';

import {CURRENTLINE, RED, COMMENT, ORANGE, PURPLE, GREEN} from '../src/helper/colors';
import { Route,Routes,Navigate,useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import {getAllContacts,getAllGroups,createContact,deleteContact} from './services/contactService';

const App = () =>{
  const [loading , setLoading] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [contacts, setContacts]= useState([]);
  const [groups, setGroups]= useState([]);
  const [contactQuery, setContactQuery] = useState({text:""});
  const [contact ,setContact]= useState({});
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        setLoading(true);
        const {data:Cdata} = await getAllContacts();
         
        const {data:Gdata} = await getAllGroups();
        setFilteredContacts(Cdata);
        setContacts(Cdata);
        setGroups(Gdata);
        setLoading(false);
      }catch(err){
        console.log(err.massage);
        setLoading(false);
      }
      };
    fetchData();
  },[]);
    
  const createContactForm = async event =>{
    event.preventDefault();
    {
      try{
        setLoading((prevloading) => !prevloading);
        const {status, data} = await createContact(contact);
        if(status === 201){
          const allContacts = [...contacts,data];
          setContacts (allContacts);
          setFilteredContacts(allContacts);
          setContact({});
          setLoading((prevloading) => !prevloading);
          navigate("/contacts");
        }
      }catch(err){
        console.log(err.massage);
        setLoading((prevloading) => !prevloading);
      }
    }

  }
  const onContactChange = (event)=>{
    setContact({
      ...contact,
      [event.target.name]:event.target.value,
    });
  };
  const confirmDelete = (contactId , contactFullname) =>{
    confirmAlert({
      customUI:({onClose})=>{
        return(
          <div
          style={{backgroundColor:CURRENTLINE,border:`1px dashed ${RED}`,
          borderRadius:'1rem'}} className='p-4'>
            <h1 style={{color:COMMENT}}>Remove This Contact</h1>
            <p style={{color:ORANGE}}> Are you want to {contactFullname} delete ? </p>
            <button onClick={()=>{
              removeContact(contactId);
                onClose();
            }}
            className='btn mx-2'
            style={{backgroundColor:GREEN}}>Yes I Sure</button>
            
            <button onClick={onClose}
             className='btn'
              style={{backgroundColor:ORANGE
            }}>No I don't sure</button>
          </div>
        )
      }
    })
  }

  const removeContact = async (contactId) => {
    const allContacts = [...contacts];
    try{
       const updatedContact = contacts.filter((c) => c.id !== contactId);
      setContacts(updatedContact);
      setFilteredContacts(updatedContact);
      const { status } = await deleteContact(contactId);

      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    }catch(err){
      console.log(err.massage);
      setContacts(allContacts);
      setFilteredContacts(allContacts);
    }
  }
    const contactSearch = (event) => {
    setContactQuery({ ...contactQuery, text: event.target.value });
    const allContacts = contacts.filter((contact) => {
      return contact.fullname
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setFilteredContacts(allContacts);
  };
  return (
    <ContactContext.Provider value={{
        loading,
        contact,
        contacts,
        filteredContacts,
        contactQuery,
        groups,
        setLoading,
        setContact,
        setContacts,
        setFilteredContacts,
        onContactChange,
        deleteContact:confirmDelete,
        createContact:createContactForm,
        contactSearch
    }}>

    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to={'/Contacts'}/>}/>
        <Route path='/contacts' element={<Contacts/>}/> 
        <Route path='/contacts/Add' element={<AddContact/>}/>
        <Route path='/contacts/:contactId' element={<ViewContact/>}/>
        <Route path='contacts/edit/:contactId' element={<EditContact
        />}/>
      </Routes>
    </div>
    </ContactContext.Provider>
  );
}

export default App;
