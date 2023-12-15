import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Spinner from "../Spinner";
import { ContactContext } from "../../context/ContactContext";
import { COMMENT, ORANGE, PURPLE } from "../../helper/colors";
import { getContact, updateContact } from "../../services/contactService";

const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const {
    loading,
    setLoading,
    groups,
    contacts,
    setContacts,
    setFilteredContacts,
  } = useContext(ContactContext);
  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setLoading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await updateContact(contact, contactId);
      if (data) {
        const allContacts = [...contacts];
        const contactIndex = allContacts.findIndex(
          (c) => c.id === parseInt(contactId)
        );
        allContacts[contactIndex] = { ...data };
        setContacts(allContacts);
        setFilteredContacts(allContacts);
        setLoading(false);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    Edit Contact
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        name="fullname"
                        type="text"
                        className="form-control"
                        value={contact.fullname}
                        onChange={onContactChange}
                        required={true}
                        placeholder="Fullname"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="image"
                        type="text"
                        value={contact.image}
                        onChange={onContactChange}
                        className="form-control"
                        required={true}
                        placeholder="Image Address"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="tel"
                        type="number"
                        className="form-control"
                        value={contact.tel}
                        onChange={onContactChange}
                        required={true}
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={contact.email}
                        onChange={onContactChange}
                        required={true}
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="job"
                        type="text"
                        className="form-control"
                        value={contact.job}
                        onChange={onContactChange}
                        required={true}
                        placeholder="Job"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="group"
                        value={contact.group}
                        onChange={onContactChange}
                        required={true}
                        className="form-control"
                      >
                        <option value="">Choose Group </option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="Edit Contact"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.image}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
