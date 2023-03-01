import Link from "next/link";
import React, { useState,useContext } from "react";
import {Context} from '../contexts/FormValidationContext';
import {InputEroorType,InputType} from '../types/input';
import { gql } from "graphql-request";
import { dataTunnel } from "@/data/dataTunnel";
export default function login() {
  const {inputDataValidation} = useContext(Context); //use context for maintain the -> DRY
  const [errors,setErros] = useState<InputEroorType | ''>({emailEror:'',passwordErro:'',confirmPasswordError:''});
  const [formData,setFormData] = useState<InputType>({
      fullName:'',
      email:'',
      password:'',
      confirmPassword:'',
  });
  const [disableButton,setDisableButton] = useState<boolean>(false);
  const [verifyEmail,setVerifyEmail] = useState<boolean>(false);
  function handleInputChange(e:React.ChangeEvent<HTMLInputElement>){
      const {name,value} = e.target;
      setFormData({...formData,[name]:value});
  }
  const handleSubmit = async (e:React.FormEvent)=>{
      e.preventDefault();
      const validationErrors:InputEroorType | '' = inputDataValidation(formData);
      if(Object.keys(validationErrors).length > 0 ){ //If any error
        setErros(validationErrors);
      }else{
        setDisableButton(true);
        const {fullName,email,password} = formData;
        const registerUser = gql`
            mutation registerUser($username:String!,$password:String!,$email:String!){
              register(input:{username:$username,password:$password,email:$email}){
                jwt
              }
            }
        `;
        const data = await dataTunnel(registerUser, {username:fullName,email:email,password:password});
        if(data){
          setVerifyEmail(true);
        }
        setErros({emailEror:'',passwordErro:'',confirmPasswordError:''})
        setDisableButton(false);
      }
  }
  return (
    <section>
      {!verifyEmail?
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
              <button type="submit" disabled={disableButton} className="w-full text-white bg-[#8e4ae5] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
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
   :(<div className="w-full h-screen flex justify-center items-center">
        <div className="bg-white p-3 rounded-md sm:w-[25rem] w-[18rem]">
          <h1 className="text-3xl mb-2 font-display text-gray-800">Almost there</h1>
          <p className="text-gray-600">Check your email for email <br/> confirmation.</p>
          <div className="flex justify-between mt-3">
            <span className="font-semibold">Go back to: </span>
            <button className=" text-white bg-[#8e4ae5] bg-primary-600 hover:bg-primary-700 px-2 py-1 rounded-md text-center" onClick={()=>setVerifyEmail(false)}>sign up</button>
          </div>
        </div>
    </div>)}
   </section>
  );
}
