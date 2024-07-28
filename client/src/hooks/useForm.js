import { useEffect, useState } from "react";

export default function useForm(submitHandlers, initialValues) {
    const [values, setValues] = useState(initialValues);

    //useEffect(() => {
      //  setValues(initialValues);
    //}, [initialValues]);
    
    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        submitHandlers(values);
    };

    return {
        values, 
        onChange,
        onSubmit
    }
}