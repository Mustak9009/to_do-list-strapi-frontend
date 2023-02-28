import { InputEroorType, InputType } from "@/types/input";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Context } from "../contexts/FormValidationContext";
export default function login() {
  const { inputDataValidation } = useContext(Context); //use context for maintain the -> DRY
  const [formData, setFormData] = useState<InputType>({email: "",password: ""});
  const [errors, setErros] = useState<InputEroorType | "">({emailEror: "",passwordErro: "",});
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: InputEroorType | "" = inputDataValidation(formData);
    if (Object.keys(validationErrors).length > 0) { //If any error
      setErros(validationErrors);
    } else {
      console.log("Form submited");
      setErros({ emailEror: "", passwordErro: "" });
    }
  };
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-3xl  ">
              Sign <span className="text-[#8e4ae5] ">in</span>
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your email
                </label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " placeholder="name@company.com" required onChange={handleInputChange}/>
                <span className="text-sm text-red-500 absolute">
                  {errors && errors.emailEror}
                </span>
              </div>
              <div className="relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900  ">
                  Password
                </label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " required onChange={handleInputChange}/>
                <span className="text-sm text-red-500 absolute">
                  {errors && errors && errors.passwordErro}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 cursor-pointer" onChange={(e) => setRememberMe(e.target.checked)}/>{/*You also do this -> onChange={(e)=>setRememberMe(!rememberMe)} -> toggling state*/}
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 cursor-pointer">
                      Remember me
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-[#8e4ae5]">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="w-full text-white bg-[#8e4ae5] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                Sign in
              </button>
              <p className="text-sm text-gray-500">
                Don’t have an account yet?
                <Link href="/signup" className="text-primary-600 hover:underline text-gray-900 font-bold hover:text-[#8e4ae5]">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
