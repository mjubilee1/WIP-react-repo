import React from 'react';
import { useForm } from 'react-hook-form';

export default function RegisterForm(props) {
  const { register, handleSubmit, watch, errors, formState } = useForm({ mode: 'onChange' });
  const [value, setValue] = React.useState();
  const [day, setDay] = React.useState(0);

  const onSubmit = (values) => {
    const dateOfBirth = `${values.birthYear}-${values.birthMonth}-${values.birthDay}`;
    const formattedValues = {
      ...values,
      dob: dateOfBirth,
      isVerified: false,
    };
    delete formattedValues["birthMonth"];
    delete formattedValues["birthDay"];
    delete formattedValues["birthYear"];
    delete formattedValues["confirmPwd"];
    props.authStore.createUser(formattedValues)
  };

  const numMonth = parseInt(watch("birthMonth"), 10)
  let days = 0;
  if (numMonth === 2) {
    days = 28;
  } else if (numMonth === 4 || numMonth === 6 || numMonth === 9 || numMonth === 11) {
    days = 30;
  } else {
    days = 31;
  }

  let daysArray = []
  // Working with dates so we will start at index 1
  for (let i = 1; i < days + 1; i++) {
    daysArray[i] = i
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleDayChange = (e) => {
    setDay(e.target.value)
  }

  const errorStyle = "text-sm text-red-600";
  const disabledClassName = formState.isValid ? "cursor-pointer py-2 px-4 font-bold rounded bg-blue-700 text-white" : "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed";
  return (
    <div className="mt-10 sm:mt-0 text-align-center">
      <div
        className="md:grid md:grid-cols-2
       md:gap-6"
      >
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="firstName" className="block text-sm font-medium leading-5 text-gray-700">
                      First Name
                      <input
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        placeholder="First Name"
                        ref={register({
                              required: true,
                              maxLength:24,
                              pattern: /^[^*|":<>[\]{}`\\();=@&$0-9]+$/,
                          })}
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </label>
                    {errors.firstName && errors.firstName.type === "required" && <p className={errorStyle}>*Please input your first name.</p>}
                    {errors.firstName && errors.firstName.type === "maxLength" && <p className={errorStyle}>*Max input length is 24.</p>}
                    {errors.firstName && errors.firstName.type === "pattern" && <p className={errorStyle}>*Contains invalid input try again.</p>}
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="lastName" className="block text-sm font-medium leading-5 text-gray-700">
                      Last Name
                      <input
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        placeholder="Last Name"
                        ref={register({
                              required: true,
                              maxLength:24,
                              pattern: /^[^*|":<>[\]{}`\\();=@&$0-9]+$/,
                            })}
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </label>
                    {errors.lastName && errors.lastName.type === "required" && <p className={errorStyle}>*Please input your last name.</p>}
                    {errors.lastName && errors.lastName.type === "maxLength" && <p className={errorStyle}>*Max input length is 24.</p>}
                    {errors.lastName && errors.lastName.type === "pattern" && <p className={errorStyle}>*Contains invalid input try again.</p>}
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                      Email address
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        ref={register({
                              required: true,
                              pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                            })}
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </label>
                    {errors.email && errors.email.type === "required" && <p className={errorStyle}>*Please input your email.</p>}
                    {errors.email && errors.email.type === "pattern" && <p className={errorStyle}>*Invalid email address.</p>}
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium leading-5 text-gray-700">
                      Country / Region
                      <select
                        type="text"
                        name="country"
                        onChange={handleChange}
                        ref={register({ required: true })}
                        className="mt-1 block form-select w-full py-2  px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option value="" selected hidden>Country</option>
                        <option value="united-states">United States</option>
                        <option value="canada">Canada</option>
                        <option value="mexico">Mexico</option>
                        <option value="china">China</option>
                        <option value="japan">Japan</option>
                        <option value="south-korea">South Korea</option>
                        <option value="germany">Germany</option>
                        <option value="united-kingdom">United Kingdom</option>
                        <option value="france">France</option>
                        <option value="italy">Italy</option>
                        <option value="spain">Spain</option>
                      </select>
                    </label>
                    {errors.country && errors.country.type === "required" && <p className={errorStyle}>*Please input your country.</p>}
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="userName" className="block text-sm font-medium leading-5 text-gray-700">
                      Username
                      <input
                        type="text"
                        name="userName"
                        onChange={handleChange}
                        placeholder="User Name"
                        ref={register({
                              required: true,
                              minLength:6,
                              maxLength: 24,
                              pattern: {value: /[^a-zA-Z0-9_-]*$/g}
                            })}
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </label>
                    {errors.userName && errors.userName.type === "required" && <p className={errorStyle}>*Please input your username.</p>}
                    {errors.userName && errors.userName.type === "minLength" && <p className={errorStyle}>*Username has to be at least 6 characters.</p>}
                    {errors.userName && errors.userName.type === "maxLength" && <p className={errorStyle}>*Max length is 24 characters.</p>}
                    {errors.userName && errors.userName.type === "pattern" && <p className={errorStyle}>*Contains invalid input try again.</p>}
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <label htmlFor="dob" className="block text-sm font-medium leading-5 text-gray-700">
                      Date of Birth
                      <div className="flex">
                        <select
                          type="text"
                          name="birthMonth"
                          onChange={handleChange}
                          placeholder="Date of Birth"
                          ref={register({ required: true })}
                          className="mt-1 mr-4 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        >
                          <option value="" selected hidden>Month</option>
                          <option value="1">January</option>
                          <option value="2">February</option>
                          <option value="3">March</option>
                          <option value="4">April</option>
                          <option value="5">May</option>
                          <option value="6">June</option>
                          <option value="7">July</option>
                          <option value="8">August</option>
                          <option value="9">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </select>
                        <select
                          type="text"
                          onChange={handleDayChange}
                          name="birthDay"
                          value={day}
                          ref={register({required: true })}
                          className="mt-1 mr-4 block form-select w-50 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        >
                          <option value="" selected hidden>Day</option>
                          {daysArray.map(item => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <select
                          type="text"
                          name="birthYear"
                          onChange={handleChange}
                          ref={register({required: true,})}
                          className="mt-1 block form-select w-50 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        >
                          <option value="" disabled selected hidden>Year</option>
                          <option value="2020">2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
                          <option value="2017">2017</option>
                          <option value="2016">2016</option>
                          <option value="2015">2015</option>
                          <option value="2014">2014</option>
                          <option value="2013">2013</option>
                          <option value="2012">2012</option>
                          <option value="2011">2011</option>
                          <option value="2010">2010</option>
                          <option value="2009">2009</option>
                          <option value="2008">2008</option>
                          <option value="2007">2007</option>
                          <option value="2006">2006</option>
                          <option value="2005">2005</option>
                          <option value="2004">2004</option>
                          <option value="2003">2003</option>
                          <option value="2002">2002</option>
                          <option value="2001">2001</option>
                          <option value="2000">2000</option>
                          <option value="1999">1999</option>
                          <option value="1998">1998</option>
                          <option value="1997">1997</option>
                          <option value="1996">1996</option>
                          <option value="1995">1995</option>
                          <option value="1994">1994</option>
                          <option value="1993">1993</option>
                          <option value="1992">1992</option>
                          <option value="1991">1991</option>
                          <option value="1990">1990</option>
                          <option value="1989">1989</option>
                          <option value="1988">1988</option>
                          <option value="1987">1987</option>
                          <option value="1986">1986</option>
                          <option value="1985">1985</option>
                          <option value="1984">1984</option>
                          <option value="1983">1983</option>
                          <option value="1982">1982</option>
                          <option value="1981">1981</option>
                          <option value="1980">1980</option>
                          <option value="1979">1979</option>
                          <option value="1978">1978</option>
                          <option value="1977">1977</option>
                          <option value="1976">1976</option>
                          <option value="1975">1975</option>
                          <option value="1974">1974</option>
                          <option value="1973">1973</option>
                          <option value="1972">1972</option>
                          <option value="1971">1971</option>
                          <option value="1970">1970</option>
                          <option value="1969">1969</option>
                          <option value="1968">1968</option>
                          <option value="1967">1967</option>
                          <option value="1966">1966</option>
                          <option value="1965">1965</option>
                          <option value="1964">1964</option>
                          <option value="1963">1963</option>
                          <option value="1962">1962</option>
                          <option value="1961">1961</option>
                          <option value="1960">1960</option>
                          <option value="1959">1959</option>
                          <option value="1958">1958</option>
                          <option value="1957">1957</option>
                          <option value="1956">1956</option>
                          <option value="1955">1955</option>
                          <option value="1954">1954</option>
                          <option value="1953">1953</option>
                          <option value="1952">1952</option>
                          <option value="1951">1951</option>
                          <option value="1950">1950</option>
                          <option value="1949">1949</option>
                          <option value="1948">1948</option>
                        </select>
                      </div>
                    </label>
                    {errors.birthMonth && errors.birthMonth.type === "required" && <p className={errorStyle}>*Please input your birth month.</p>}
                    {errors.birthDay && errors.birthDay.type === "required" && <p className={errorStyle}>*Please input your birth day.</p>}
                    {errors.birthYear && errors.birthYear.type === "required" && <p className={errorStyle}>*Please input your birth year.</p>}
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="pwd" className="block text-sm font-medium leading-5 text-gray-700">
                      Password
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                        ref={register({
                          required: true,
                          validate: {
                            containLowerCase: strValue => /.*[a-z]/.test(strValue),
                            containUpperCase: strValue => /.*[A-Z]/.test(strValue),
                            containNumber: strValue => /.*[0-9]/.test(strValue),
                            containSpecialChar: strValue => /.*[!@#$%^&*]/.test(strValue),
                          },
                          minLength:8
                        })}
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </label>
                    {errors.password && errors.password.type === "required" && <p className={errorStyle}>*Password is required.</p>}
                    {errors.password && errors.password.type === "containLowerCase" && <p className={errorStyle}>*Password must contain at least 1 lowercase alphabetical character.</p>}
                    {errors.password && errors.password.type === "containUpperCase" && <p className={errorStyle}>*Password must contain at least 1 uppercase alphabetical character.</p>}
                    {errors.password && errors.password.type === "containNumber" && <p className={errorStyle}>*Password must contain at least 1 numeric character.</p>}
                    {errors.password && errors.password.type === "containSpecialChar" && <p className={errorStyle}>*Password must contain at least 1 special character.</p>}
                    {errors.password && errors.password.type === "minLength" && <p className={errorStyle}>*Password must be at least 8 characters.</p>}
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="confirmPwd" className="block text-sm font-medium leading-5 text-gray-700">
                      Confirm Password
                      <input
                        type="password"
                        name="confirmPwd"
                        onChange={handleChange}
                        placeholder="Password"
                        ref={register({
                          required: true,
                          validate: (strValue)  => strValue === watch('password')
                          })}
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </label>
                    {errors.confirmPwd && errors.confirmPwd.type === "required" && <p className={errorStyle}>*Please confirm your password.</p>}
                    {errors.confirmPwd && errors.confirmPwd.type === "validate" && <p className={errorStyle}>*Passwords do not match.</p>}
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <button
                      type="submit"
                      disabled={!formState.isValid}
                      className={`${disabledClassName}`}
                    >
                    Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
