import { useState, useEffect } from "react";
import { useFormik } from "formik";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AvatarUpload from "./AvatarUpload";
import Ticket from "./Ticket";
import "../App.css";
import { FaRegEnvelope } from "react-icons/fa";


export default function FormPage({ setStep }) {
    const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem("avatar") || "");
      const [submitted, setSubmitted] = useState(false);
    
      useEffect(() => {
        if (avatarUrl) {
          localStorage.setItem("avatar", avatarUrl);
        }
      }, [avatarUrl]);

      const ticketType = localStorage.getItem("ticketType");
      const ticketQuantity = localStorage.getItem("ticketQuantity");
    
      const formik = useFormik({
        initialValues: {
          fullName: localStorage.getItem("fullName") || "",
          email: localStorage.getItem("email") || "",
          specialRequest: localStorage.getItem("specialRequest") || "",
        },
        validationSchema: Yup.object({
          fullName: Yup.string().matches(/^[A-Za-z\s]+$/, "Name should only contain letters").min(4, "Name must be at least 4 characters").required("Full name is required"),
          email: Yup.string().email("Invalid email address").required("Email is required"),
          // avatar: Yup.string().url("Invalid image URL format").required("Avatar is required"),
          specialRequest: Yup.string().min(2, "Name must be at least 4 characters"),
        }),
        onSubmit: (values) => {
          if (!avatarUrl) {
            alert("Please upload an avatar");
            return;
          }
          localStorage.setItem("fullName", values.fullName);
          localStorage.setItem("email", values.email);
          localStorage.setItem("specialRequest", values.specialRequest);
          setSubmitted(true);
        },
      });

  return (
    <div className="container">

    {!submitted ? (
        <form onSubmit={formik.handleSubmit} className="form" aria-labelledby="form-title">
          <div className="top">
              <h1>Attendee Details</h1>
              <span>Step 2/3</span>
          </div>
          <hr className="ticket-divider" />

        <AvatarUpload onUpload={setAvatarUrl} />
        {avatarUrl && <img src={avatarUrl} alt="Avatar" className="preview" />}

        <label htmlFor="fullName">Enter your name:</label>
        <input
          placeholder="Type full name here"
          autoComplete="true"
          id="fullName"
          type="text"
          name="fullName"
          aria-describedby="fullNameError"
          {...formik.getFieldProps("fullName")}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <p className="error" id="fullNameError">{formik.errors.fullName}</p>
        )}
        {/* aria-invalid={errors.fullName && touched.fullName ? "true" : "false"}
            aria-describedby={errors.fullName && touched.fullName ? "fullNameError" : undefined}
          />
          <ErrorMessage component="p" id="fullNameError" name="fullName" role="alert" /> */}

        <label htmlFor="email">Enter your Email:</label>
        <FaRegEnvelope className="input-icon"/>
        <input
          aria-describedby="emailError"
          placeholder="hello@avlioflalagos.io" 
          id="email"
          type="email"
          name="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="error" id="emailError">{formik.errors.email}</p>
        )}

        {/* aria-invalid={errors.email && touched.email ? "true" : "false"}
            aria-describedby={errors.email && touched.email ? "emailError" : undefined}
          />
          <ErrorMessage component="p" id="emailError" name="email" role="alert" /> */}

        <label htmlFor="project">Special Request?</label>
        <textarea
        rows={6}
        cols={5}
          placeholder="Textarea"
          autoComplete="true"
          id="specialRequest"
          type="text"
          name="specialRequest"
          aria-describedby="specialRequestError"
          {...formik.getFieldProps("specialRequest")}
        />
        {formik.touched.specialRequest && formik.errors.specialRequest && (
          <p className="error" id="specialRequestError">{formik.errors.specialRequest}</p>
        )}

        <div className="bot">
            <button className="bac" type="button" onClick={() => setStep(1)} >
                Back</button>
            <button className="get" type="submit">Get my free ticket</button>
        </div>
      </form>
    ) : (
      <Ticket fullName={formik.values.fullName} email={formik.values.email} specialRequest={formik.values.specialRequest} avatar={avatarUrl} ticketType={ticketType} ticketQuantity={ticketQuantity}/>
    )}
  </div>
);
};

