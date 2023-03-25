import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";

import { GlobalContext } from "../context/GlobalContext";

const Login = () => {
  const navigate = useNavigate();
  const { setProvider, setProfile } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);

  const onStart = () => {
    setIsLoading(true);
  };

  const onResolve = ({ provider, data }) => {
    setProvider(provider);
    setProfile(data);
    Cookies.set(
      "token",
      provider === "google" ? data.access_token : data.accessToken
    );
    Cookies.set("provider", provider);
    Cookies.set("profile", JSON.stringify(data));
    setIsLoading(false);
    navigate("/jobs");
  };

  return (
    <div className="flex h-screen bg-sky-300">
      <div className="m-auto bg-white border-solid border-1 border-blue-500 rounded-xl shadow-xl px-12 py-8">
        {isLoading && (
          <p className="text-lg text-center text-sky-600 font-bold">
            Please wait for a moment ..
          </p>
        )}
        <p className="text-xl text-center text-sky-600 font-bold">
          Login to Job Hunter
        </p>
        <hr className="mt-2 mb-4" />
        <div className="flex flex-col">
          <LoginSocialGoogle
            client_id={process.env.REACT_APP_GG_APP_ID || ""}
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="offline"
            onLoginStart={onStart}
            onResolve={onResolve}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>

          <LoginSocialFacebook
            appId={process.env.REACT_APP_FB_APP_ID || ""}
            fieldsProfile={
              "id,name,name_format,picture,short_name,email,gender"
            }
            onLoginStart={onStart}
            onResolve={onResolve}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>
        </div>
      </div>
    </div>
  );
};

export default Login;
