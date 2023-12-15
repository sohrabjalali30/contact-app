import { CURRENTLINE, GREEN, ORANGE, PINK, RED } from "../../helper/colors";
import { Link } from "react-router-dom";
const Contact = ({ contact, deleteContact }) => {
  return (
    <div className="col-md-6">
      <div className="card my-2" style={{ backgroundColor: CURRENTLINE }}>
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            <div className="col-md-4 col-sm-4">
              <img
                src={contact.image}
                alt={contact.fullname}
                className="img-fluid rounded"
                style={{
                  border: `1px dashed ${PINK}`,
                  width: "170px",
                  height: "190px",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div className="col-md-7 col-sm-7">
              <ul className="list-group">
                <li className="list-group-item">
                  fullname : <br />
                  <span className="fw-bold">{contact.fullname}</span>
                </li>
                <li className="list-group-item">
                  Phone Number: <br />
                  <span className="fw-bold">{contact.tel}</span>
                </li>
                <li className="list-group-item">
                  Email Address: <br />
                  <span className="fw-bold">{contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
              <Link
                to={`/contacts/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: GREEN }}
              >
                <i className="fa fa-eye" />
              </Link>
              <Link
                to={`/contacts/edit/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: ORANGE }}
              >
                <i className="fa fa-pencil" />
              </Link>
              <button
                onClick={deleteContact}
                className="btn my-1"
                style={{ backgroundColor: RED }}
              >
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
