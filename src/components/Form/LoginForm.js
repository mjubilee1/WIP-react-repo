import React from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm(props) {
  const { register, handleSubmit, errors, formState } = useForm({ mode: "onChange" });
  const onSubmit = (values) => {
    props.authStore.login(values);
  };

  const errorStyle = "text-sm text-red-600";
  const disabledClassName = formState.isValid ? "cursor-pointer py-2 px-4 font-bold rounded bg-blue-700 text-white" : "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed";
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="userName" className="block text-sm font-medium leading-5 text-gray-700">
          Username
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            id="userName"
            ref={register({ required: true })}
            className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </label>
        {errors.userName && errors.userName.type === "required" && <p className={errorStyle}>Please input your Username!</p>}
      </div>
      <div className="mt-3 col-span-6 sm:col-span-3">
        <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            ref={register({ required: true })}
            className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </label>
        {errors.password && errors.password.type === "required" && <p className={errorStyle}>Please input your Password!</p>}
      </div>
      <div className="mt-3 text-center">
        <button
          type="submit"
          disabled={!formState.isValid}
          className={`${disabledClassName}`}
        >
        Login
        </button>
      </div>
    </form>
  );
}
