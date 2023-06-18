import React from "react";
import dynamic from "next/dynamic";

// Components
const Layout = dynamic(() => import("@/components/layout/layout.component"));
const AuthForm = dynamic(() =>
  import("@/components/ui/forms/auth-form.component")
);

function Homepage() {
  return (
    <Layout>
      <div className="container max-w-3xl mx-auto">
        <div className="flex flex-col gap-y-4">
          <h1 className="font-semibold text-base">Sign Up or Log In</h1>
          <AuthForm />
        </div>
      </div>
    </Layout>
  );
}

export default Homepage;
