import React from "react";
import dynamic from "next/dynamic";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";

// GraphQL
import { AUTHENTICATE_USER, CREATE_USER } from "@/lib/graphql/mutations";

// Components
const InputField = dynamic(() => import("../input/input-field.component"));
const Button = dynamic(() => import("../button/button.component"));

const AuthForm = () => {
  const router = useRouter();
  const [authenticateUser, { data: authenticatedUserData }] =
    useMutation(AUTHENTICATE_USER);
  const [registerUser, { data: registerUserData }] = useMutation(CREATE_USER);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: {},
  });

  const onLoginHandler = async (values) => {
    const { email, password } = values;
    try {
      const response = await authenticateUser({
        variables: { email, password },
      });

      let token = response.data.token;

      Cookies.set("token", token);

      router.push("/todo");
    } catch (error) {
      console.log("ERROR", error);
    }
    // console.log(response);
  };

  const onSignUpHandler = async (values) => {
    const { email, password } = values;
    try {
      const response = await registerUser({
        variables: { email, password },
      });

      console.log(response);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <form className="flex flex-col gap-y-4">
      <InputField
        inputType="email"
        name="email"
        id="email"
        placeholder="E-mail"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      <InputField
        inputType="password"
        name="password"
        id="password"
        placeholder="Password"
        autoComplete="current-password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      <div className="w-full flex gap-x-4 justify-end">
        <Button
          buttonType="button"
          isPrimary={true}
          onClick={() => onLoginHandler(formik.values)}
        >
          Log In
        </Button>
        <Button
          buttonType="button"
          isPrimary={false}
          onClick={() => onSignUpHandler(formik.values)}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
