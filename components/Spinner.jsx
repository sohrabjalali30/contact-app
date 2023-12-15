import SpinnerGIF from "../assets/loader2.gif";

const Spinner = () => {
  return (
    <>
      <img
        src={SpinnerGIF}
        alt="spinner"
        className="d-block m-auto"
        style={{ width: "550px" }}
      />
    </>
  );
};
export default Spinner;
