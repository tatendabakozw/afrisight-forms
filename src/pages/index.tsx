import React, { useState } from "react";
import Link from "next/link";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import PrimaryInput from "@/components/inputs/PrimaryInput";
import Image from "next/image";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="grid md:grid-cols-2 col-span-1 min-h-screen w-full bg-white">
      <div className="col-span-1 grid items-center w-full content-center p-4">
        <div className="max-w-md w-full mx-auto flex flex-col space-y-6">
          <div className="h-20 w-40 relative">
            <Image
              src={"/logo.svg"}
              alt="Afrisight logo"
              className=" object-contain"
              fill
            />
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-3xl font-bold text-zinc-950">Welcome back</p>
            <p className="text-zinc-600">
              Welcome back! Please enter your details
            </p>
          </div>
          <PrimaryInput
            value={email}
            setValue={setEmail}
            placeholder="email"
            label={"Email"}
          />
          <PrimaryInput
            value={password}
            setValue={setPassword}
            placeholder="passsword"
            label={"Password"}
          />

          <p className="text-brand-original text-sm text-end">
            Forgot password
          </p>
          <PrimaryButton text="Sign In" />
          <div className="text-sm text-center">
            <p>
              Dont have an account{" "}
              <span className="text-blue-700 font-semibold">
                <Link href={"/register"}>Sign Up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-1 bg-zinc-100 relative md:flex hidden items-center justify-center">
        <div className="h-40 w-40 bg-brand-original rounded-full"></div>
        <div className="h-1/2 backdrop-blur-lg w-full absolute bottom-0 "></div>
      </div>
    </div>
  );
}

export default Login;
