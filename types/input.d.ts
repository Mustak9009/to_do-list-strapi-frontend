export interface InputType {
    fullName?:String,
    email?:String,
    password?:String,
    confirmPassword?:String
}
export type InputEroorType = {
    fullNameEror?:String
    emailEror?:String,
    passwordErro?:String,
    confirmPasswordError?:String
}
export interface MyContextType{
    inputDataValidation:(data:InputType) => InputEroorType;
}
export interface MyContextPropsType{
    children: React.ReactNode;
}