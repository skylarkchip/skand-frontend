import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ErrorMessage, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import * as Yup from "yup";

// GraphQL
import { AUTHENTICATE_USER, CREATE_USER } from "@/lib/graphql/mutations";

// Components
const InputField = dynamic(() => import("../input/input-field.component"));
const Button = dynamic(() => import("../button/button.component"));

const AuthForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const [authenticateUser] = useMutation(AUTHENTICATE_USER);
  const [registerUser] = useMutation(CREATE_USER);

  const onHandleSubmit = async (values, { setSubmitting }) => {
    const { email, password, isSignUp } = values;

    if (!isSignUp) {
      try {
        const { data } = await authenticateUser({
          variables: { email, password },
        });

        if (data.token) {
          let token = data.token;

          Cookies.set("token", token);
          router.push("/todo");
        } else {
          setError(
            "There seems to be an issue with your request. Please Try Again."
          );
        }
      } catch (error) {
        setError("User does not exist or wrong password.");
      }
    } else {
      try {
        const { data } = await registerUser({
          variables: { email, password },
        });

        if (data.createUser) {
          const { data: authData } = await authenticateUser({
            variables: { email, password },
          });

          if (authData.token) {
            let token = authData.token;

            Cookies.set("token", token);
            router.push("/todo");
          } else {
            setError(
              "There seems to be an issue with your request. Please Try Again."
            );
          }
        }
      } catch (error) {
        setError("E-mail address already exists.");
      }
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", isSignUp: false }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Please enter a valid e-mail address")
          .required("Please enter your e-mail address"),
        password: Yup.string()
          .min(8, "Password is too short")
          .required("Please enter your password"),
      })}
      onSubmit={onHandleSubmit}
    >
      {(formik) => (
        <>
          {error && (
            <div className="w-full">
              <p className="text-custom-pink">{error}</p>
            </div>
          )}
          <Form className="flex flex-col gap-y-4">
            <InputField
              inputType="email"
              id="email"
              placeholder="E-mail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              hasError={formik.errors.email}
              name="email"
            />
            <ErrorMessage
              name="email"
              render={(msg) => (
                <p className="text-sm text-custom-dark-pink">{msg}</p>
              )}
            />
            <InputField
              inputType="password"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              hasError={formik.errors.password}
              name="password"
            />
            <ErrorMessage
              name="password"
              render={(msg) => (
                <p className="text-sm text-custom-dark-pink">{msg}</p>
              )}
            />
            <div className="w-full flex gap-x-4 justify-end">
              <Button buttonType="submit" isPrimary={true}>
                {formik.values.isSignUp ? "Sign up" : "Log in"}
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  formik.setFieldValue("isSignUp", !formik.values.isSignUp);
                }}
              >
                {formik.values.isSignUp
                  ? "Switch to Login"
                  : "Switch to Sign Up"}
              </Button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default AuthForm;
