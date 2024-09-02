import Layout from "../components/layout/Layout";
import "../components/styles/ContactPage.css";

const ContactPage = () => {
  return (
    <Layout>
      <div className="pageNotFound">
        <div className="pnf">
          <div className="pnf-left contact-container">
            <h1>Contact Us</h1>
            <br />
            <div className="container container-form">
              <form
                action="mailto:prakritijha29aug@gmail.com"
                method="post"
                enctype="text/plain"
              >
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputText" className="form-label">
                    Comment Here
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-header">Contact Details</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <i className="fa-solid fa-phone"></i> +91 8860333616
                </li>
                <li className="list-group-item">
                  <i className="fa-solid fa-envelope"></i>{" "}
                  support@chhammakchhallo.com
                </li>
              </ul>
            </div>
          </div>
          <video autoPlay loop muted playsInline className="contact-video">
            <source src="contact-us.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
