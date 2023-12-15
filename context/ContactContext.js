import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  contact: {},
  contacts: [],
  filteredContacts: [],
  contactQuery: {},
  groups: [],

  setLoading: () => {},
  setContact: () => {},
  setContacts: () => {},
  setFilteredContacts:()=>{},
  onContactChange: () => {},
  deleteContact: () => {},
  updateContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
});
