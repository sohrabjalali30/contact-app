import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../Spinner";
import { ContactContext } from "../../context/ContactContext";
import { getContact, getGroup } from "../../services/contactService";
import { CURRENTLINE, PURPLE, CYAN, GREEN, RED } from "../../helper/colors";

const ViewContact = () => {
  const { contactId } = useParams();
  const [state, setState] = useState({
    contact: {},
    group: {},
  });
  const { loading, setLoading } = useContext(ContactContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getGroup(contactData.group);
        setLoading(false);
        setState({
          ...state,
          loading: false,
          contact: contactData,
          group: groupData,
        });
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { contact, group } = state;
  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: GREEN }}>
              Show User
            </p>
          </div>
        </div>
      </section>

      <hr style={{ backgroundColor: CYAN }} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (
            <section className="view-contact mt-e">
              <div
                className="container p-2"
                style={{ borderRadius: "1em", backgroundColor: CURRENTLINE }}
              >
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={contact.image}
                      alt=""
                      className="img-fluid rounded"
                      style={{ border: `1px solid ${PURPLE}` }}
                    />
                  </div>
                  <div className="col-md-9">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-dark">
                        Full Name:{" "}
                        <span className="fw-bold">{contact.fullname}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        Phone Number:{" "}
                        <span className="fw-bold">{contact.tel}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        Email : <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        Job : <span className="fw-bold">{contact.job}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        Group : <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <Link
                      to={"/contacts"}
                      className="btn"
                      style={{ backgroundColor: RED }}
                    >
                      Go To Users Page
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;
