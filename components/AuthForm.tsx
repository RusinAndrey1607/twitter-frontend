import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  submitHandler: (email: string, password: string) => void;
  isLoginForm?: boolean;
  isRegForm?: boolean;
};

const AuthForm = (props: Props) => {
  const reg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

  return (
    <div className="border p-4 md:p-7 rounded-xl bg-white max-w-xl w-full">
      <h1 className="text-center text-3xl mb-8">{props.title}</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors.email = "Required Field";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Required Field";
          } else if (!reg.test(values.password)) {
            errors.password =
              "The password must be longer than 8 characters and contain at least one number and one letter of different case";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            props.submitHandler(values.email, values.password);
            setSubmitting(false);
            values.email = "";
            values.password = "";
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="focus:border-twitterColor text-gray-500 transition-colors duration-500 border w-full p-4 mb-4  bg-gray-100 rounded-full outline-none placeholder:text-lg   "
            />
            <ErrorMessage name="email" component="p" className="text-red-400" />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="focus:border-twitterColor  text-gray-500 transition-colors duration-500 border w-full p-4 mb-4  bg-gray-100 rounded-full outline-none placeholder:text-lg   "
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-400"
            />
            {props.isLoginForm ? (
              <div className="text-twitterColor text-xl my-3 cursor-pointer  text-right">
                <Link href={"/registration"}>Registration ?</Link>{" "}
              </div>
            ) : null}
            {props.isRegForm ? (
              <div className="text-twitterColor text-xl my-3 cursor-pointer  text-right">
                <Link href={"/login"}>Login ?</Link>{" "}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="disabled:opacity-50 rounded-full px-6 py-4 text-white bg-twitterColor font-bold text-lg ml-auto block"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
