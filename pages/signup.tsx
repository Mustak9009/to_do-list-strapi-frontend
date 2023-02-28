import Link from "next/link";
import React, { useState,useContext } from "react";
import {Context} from '../contexts/FormValidationContext';
import {InputEroorType,InputType} from '../types/input';
export default function login() {
  const {inputDataValidation} = useContext(Context); //use context for maintain the -> DRY
  const [errors,setErros] = useState<InputEroorType | ''>({emailEror:'',passwordErro:'',confirmPasswordError:''});
  const [formData,setFormData] = useState<InputType>({
      fullName:'',
      email:'',
      password:'',
      confirmPassword:'',
  });
  function handleInputChange(e:React.ChangeEvent<HTMLInputElement>){
      const {name,value} = e.target;
      setFormData({...formData,[name]:value});
  }
  const handleSubmit = (e:React.FormEvent)=>{
      e.preventDefault();
      const validationErrors:InputEroorType | '' = inputDataValidation(formData);
      if(Object.keys(validationErrors).length > 0 ){ //If any error
        setErros(validationErrors);
      }else{
        console.log("Form submited");
        setErros({emailEror:'',passwordErro:'',confirmPasswordError:''})
      }
  }
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-3xl  ">
              Sign <span className="text-[#8e4ae5] ">up</span>
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Full name
                </label>
                <input type="text" name="fullName" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " placeholder="Full name" required onChange={handleInputChange}/>
              </div>
              <div className="relative">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your email
                </label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " placeholder="name@company.com" required onChange={handleInputChange}/>
                <span className="text-sm text-red-500 absolute">{errors && errors.emailEror}</span>
              </div>
              <div className="relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900  ">
                  Password
                </label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " required onChange={handleInputChange}/>
                <span className="text-sm text-red-500 absolute">{errors && errors && errors.passwordErro}</span>
              </div>
              <div className="relative">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900  ">
                  Confirm password
                </label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " required onChange={handleInputChange}/>
                <span className="text-sm text-red-500 absolute">{errors && errors && errors.confirmPasswordError}</span>
              </div>
              <button type="submit" className="w-full text-white bg-[#8e4ae5] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                Sign up
              </button>
              <p className="text-sm text-gray-500">
                Don you have an account yet?{" "}
                <Link href="/signin" className="text-primary-600 hover:underline text-gray-900 font-bold hover:text-[#8e4ae5]">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
