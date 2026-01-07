import "./Form.css";

function Form() {
  return (
    <>
      <div className="form-wrapper">
        <form className="contact-form" action="https://formspree.io/f/mzdbpwzw" method="post">
            
            <p>Please share your feedback about the website and our department. Your input helps us improve the quality of information and services we provide.</p>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter your mail id"
            required
          />

          <textarea
            className="form-textarea"
            name="feedback"
            rows={5}
            placeholder="Enter your feedback"
            required
          ></textarea>

          <button className="form-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Form;
