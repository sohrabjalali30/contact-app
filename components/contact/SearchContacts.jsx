import { useContext } from "react";
import { PURPLE } from "../../helper/colors";
import { ContactContext } from "../../context/ContactContext";

const SearchContents = () => {
  const { contactQuery, contactSearch } = useContext(ContactContext);
  return (
    <div className="col">
      <div className="input-group mx-2 w-75" dir="ltr">
        <span
          className="input-group-text"
          id="basic-addon1"
          style={{ backgroundColor: PURPLE }}
        >
          <i className="fa fa-search" />
        </span>
        <input
          type="text"
          dir="ltr"
          value={contactQuery.text}
          onChange={contactSearch}
          className="form-control"
          placeholder="Search Content..."
          aria-label="search"
          aria-aria-describedby="basic-addon1"
        />
      </div>
    </div>
  );
};
export default SearchContents;
