import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [inputvalue, setInputvalue] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    message: "",
  });

  const getvalue = (e) => {
    const { name, value } = e.target;
    setInputvalue(() => {
      return {
        ...inputvalue,
        [name]: value,
      };
    });
  };

  const sendUserData = async (e) => {
    e.preventDefault();

    const { fname, lname, email, mobile } = inputvalue; //
    if (fname === "") {
      toast.error("fname is require");
    } else if (lname === "") {
      toast.error("lname is require");
    } else if (email === "") {
      toast.error("email is require");
    } else if (!email.includes("@")) {
      toast.error("invalid email");
    } else if (mobile === "") {
      toast.error("mobile is require");
    } else {
      toast.success('Your response submitted')

      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          mobile,

        }),

      });

      const data = res.json();
      
      if(data.status === 201){
        toast.success('Your response submitted')
      }

    }
  };

  return (
    <>
      <div className="container mb-5 contact">
        <h2 className="text-center mt-3">ContactUS</h2>
        <div className="container" mt-2>
          <Form className="row mt-2">
            <Form.Group className="mb-3 mt-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Fname</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                value={inputvalue.fname}
                onChange={getvalue}
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Lname</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                value={inputvalue.lname}
                onChange={getvalue}
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-5 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={inputvalue.email}
                onChange={getvalue}
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-5 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={inputvalue.mobile}
                onChange={getvalue}
              />
            </Form.Group>


            <div className="d-flex mt-5 justify-content-center">
              <Button
                variant="primary"
                className="col-lg-6"
                type="submit"
                onClick={sendUserData}
              >
                Submit
              </Button>
            </div>
          </Form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Contact;
