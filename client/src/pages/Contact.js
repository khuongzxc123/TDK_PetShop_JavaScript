import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="images/chamsockhachhang.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          ></img>
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            If you have any questions or concerns about our products, please
            feel free to contact us at any time.
          </p>
          <div className="contact-info">
            <p className="mt-3">
              <BiMailSend />:{" "}
              <a href="mailto:petshophelp@gmail.com">petshophelp@gmail.com</a>
            </p>
            <p className="mt-3">
              <BiPhoneCall />: 999-999-9999
            </p>
            <p className="mt-3">
              <BiSupport />: 1-800-999-9999 (toll free)
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contactus {
          padding: 50px 0;
        }

        .contact-info {
          margin-top: 30px;
        }

        .contact-info p {
          display: flex;
          align-items: center;
        }

        .contact-info p svg {
          margin-right: 10px;
        }

        .contact-info a {
          color: #333;
          text-decoration: none;
        }

        .contact-info a:hover {
          text-decoration: underline;
        }
      `}</style>
    </Layout>
  );
};

export default Contact;
