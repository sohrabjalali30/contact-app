import { Link } from "react-router-dom";
import { useContext } from "react";

import { BACKGROUND, CURRENTLINE, ORANGE, RED } from "../../helper/colors";
import Contact from "./Contact";
import Spinner from "../Spinner";
import { ContactContext } from "../../context/ContactContext";
import imgf from "../../assets/user 3.webp";

const Contacts = () => {
  const { contacts, loading, deleteContact } = useContext(ContactContext);
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h2">
                <Link
                  to={"/contacts/add"}
                  className="btn m-2"
                  style={{ backgroundColor: ORANGE }}
                >
                  Create New Content
                  <i className="fa fa-plus-square mx-2" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <div className="row">
            {contacts.length > 0 ? (
              contacts.map((c) => (
                <Contact
                  key={c.id}
                  contact={c}
                  deleteContact={() => {
                    deleteContact(c.id, c.fullname);
                  }}
                />
              ))
            ) : (
              <div
                className="text-center py-5"
                style={{ backgroundColor: CURRENTLINE }}
              >
                <p className="h3" style={{ color: RED }}>
                  User Not Fond!
                </p>
                <img
                  src={imgf}
                  className="w-20"
                  alt="not-fond"
                  width="200px"
                  height="200px"
                />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default Contacts;
