import React,{createContext} from 'react'
import {InputType,InputEroorType,MyContextType,MyContextPropsType} from '../types/input';
export const Context = createContext<MyContextType>({
    inputDataValidation: function (data: InputType): InputEroorType {
        throw new Error('Function not implemented.');
    }
});
function inputDataValidation(data:InputType){
    const {email,password,confirmPassword} = data;
    const errors:any = {}; //For avoiding -> form submit bug i can set it type -> any
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if(!regex.test(email as string)){
        errors.emailEror = 'Please provide valid email.';
    }
    if(password && password.length < 6){
        errors.passwordErro = 'Password must be at least 6 characters.';
    }
    if(password && confirmPassword){
        if(password != confirmPassword){
            errors.confirmPasswordError = "Password doe's not   matched.";
        }
    }
    return errors;
}
export const  FormValidationContext:React.FC<MyContextPropsType> = ({children}) =>{
  return (
    <Context.Provider value={{inputDataValidation}}>
        {children}
    </Context.Provider>
  )
}
