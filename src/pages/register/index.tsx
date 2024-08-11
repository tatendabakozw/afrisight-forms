import React, { useState } from "react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import PrimaryInput from "@/components/inputs/PrimaryInput";
import Link from "next/link";
import AlertMessage from "@/components/alerts/AlertMessage";
import { useAuth } from "@/context/AuthContext";
import { getMessage } from "@/helpers/getMessage";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const { register } = useAuth();

  const registerUserToBuilder = async () => {
    setLoading(true);
    try {
      await register({ username, email, password, confirm_password });
      setSuccess("Login Successful");
      setErr("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setErr(getMessage(error));
      setSuccess("");
      setLoading(false);
    }
  };
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 min-h-screen w-full bg-white">
      <div className="col-span-1 bg-zinc-100 relative md:flex hidden items-center justify-center">
        <div className="h-40 w-40 bg-brand-original rounded-full"></div>
        <div className="h-1/2 backdrop-blur-lg w-full absolute bottom-0 "></div>
      </div>
      <div className="col-span-1 grid items-center w-full content-center p-6">
        <div className="max-w-md w-full mx-auto flex flex-col space-y-6">
          <p className="text-3xl font-bold text-zinc-950">Hello there</p>
          <p className="text-zinc-600">
            Create an account by entering details below
          </p>
          <PrimaryInput
            value={email}
            setValue={setEmail}
            placeholder="email"
            label={"Email"}
          />
          <PrimaryInput
            value={username}
            setValue={setUsername}
            placeholder="username"
            label={"Username"}
          />
          <PrimaryInput
            value={password}
            type="password"
            setValue={setPassword}
            placeholder="passsword"
            label={"Password"}
          />
          <PrimaryInput
            value={confirm_password}
            type="password"
            setValue={setConfirmPassword}
            placeholder="confirm password"
            label={"Confirm Password"}
          />
          <div className="flex items-center">
            <input
              checked
              id="checked-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
            />
            <label
              htmlFor="checked-checkbox"
              className="ms-2 text-sm text-zinc-950 "
            >
              Agree to terms and conditions
            </label>
          </div>
          {err && <AlertMessage type="error" text={err.toString()} />}
          <PrimaryButton
            loading={loading}
            success={success}
            error={err}
            text="Sign In"
            onClick={registerUserToBuilder}
          />
          <p className="text-sm text-center">
            <p>
              Already have an account{" "}
              <span className="text-blue-700 font-semibold">
                <Link href={"/"}>Log In</Link>
              </span>
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
