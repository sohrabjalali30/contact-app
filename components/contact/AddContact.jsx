import Spinner from "../Spinner";
import imga from "../../assets/user2.jpg";
import { ContactContext } from "../../context/ContactContext";
import { GREEN, ORANGE, RED } from "../../helper/colors";
import { Link } from "react-router-dom";
import { useContext } from "react";

const AddContact = () => {
  const { loading, contact, groups, onContactChange, createContact } =
    useContext(ContactContext);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section>
            <img
              src={imga}
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "180px",
                left: "800px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h-4 fw-bold text-center"
                    style={{ color: GREEN, marginTop: "15px" }}
                  >
                    Create New Contact
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: RED }} />
              <div className="row mt-5">
                <div className="col-md-4">
                  <form onSubmit={createContact}>
                    <div className="mb-2">
                      <input
                        name="fullname"
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        value={contact.fullname}
                        onChange={onContactChange}
                        required
                      />
                      <input
                        name="image"
                        type="text"
                        className="form-control"
                        placeholder="Like Image Address"
                        value={contact.image}
                        onChange={onContactChange}
                        required
                      />
                      <input
                        name="tel"
                        type="number"
                        className="form-control"
                        placeholder="Phone Number"
                        value={contact.tel}
                        onChange={onContactChange}
                        required
                      />
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        placeholder="Email Address"
                        value={contact.email}
                        onChange={onContactChange}
                        required
                      />
                      <input
                        name="job"
                        type="text"
                        className="form-control"
                        placeholder="Job"
                        value={contact.job}
                        onChange={onContactChange}
                        required
                      />
                      <br />
                      <div className="mb-2">
                        <select
                          value={contact.group}
                          onChange={onContactChange}
                          name="group"
                          className="from-control"
                          required
                        >
                          <option value="">Chouse Group</option>
                          {groups.length > 0 &&
                            groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="mx-2">
                        <input
                          type="submit"
                          value="Create User"
                          className="btn"
                          style={{ backgroundColor: RED }}
                        />
                        <Link
                          to="/contacts"
                          className="btn mx-2"
                          style={{ backgroundColor: ORANGE }}
                        >
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default AddContact;
