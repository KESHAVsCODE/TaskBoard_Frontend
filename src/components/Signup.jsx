import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef({});
  const passwordRef = useRef({});
  const nameRef = useRef({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isSignupSuccess, setSignupSuccess] = useState(false);

  const navigate = useNavigate();

  const [userDetailsErrors, setUserDetailsErrors] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });

  const signupUser = async (user) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/user/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setLoading(false);
      setError("");
      setSignupSuccess(true);
      console.log(data);
    } catch (error) {
      setLoading(false);
      setSignupSuccess(false);
      setError(error.message);
      console.log(error);
    }
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the pattern
    return emailPattern.test(email);
  };

  const handleFormSubmit = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    const errors = {
      nameError: name ? "" : "Enter your name",
      emailError: email
        ? isValidEmail(email)
          ? ""
          : "Enter a valid email address"
        : "Enter your email",
      passwordError: password
        ? password.length > 5
          ? ""
          : "Passwords must be at least 6 characters"
        : "Enter your password",
    };

    if (errors.emailError || errors.passwordError || errors.nameError) {
      setUserDetailsErrors({ ...errors });
      return;
    } else {
      setUserDetailsErrors({ ...errors });
    }

    signupUser({ userName: name, userEmail: email, userPassword: password });
  };

  return (
    <section name="signin" className="h-full bg-[#6666]- overflow-y-scroll">
      <div className="max-w-[350px] mx-auto flex flex-col items-center">
        <div className="p-5">
          {loading && <p className="text-center">Loading...</p>}
          {error && (
            <p className="text-center text-red-500 font-medium">{error}</p>
          )}
        </div>
        <section className="border border-lightGray rounded-lg px-6 py-4">
          <form
            noValidate
            action=""
            className="grid gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-[28px] font-medium">Signup</h2>
            <div>
              <label htmlFor="email" className="text-sm leading-4 font-medium">
                Name
              </label>
              <input
                className="bg-[#333] w-full border border-zinc-400 rounded px-2 py-1 text-sm
            outline-none focus-within:border-pink-600 focus-within:shadow-focusInputBoxShadow duration-100
            placeholder:text-[13px] font-normal"
                type="text"
                name="name"
                id="userName"
                ref={nameRef}
              />
              {userDetailsErrors.nameError && (
                <p className="flex gap-2 items-center text-xs text-[rgb(255,0,0)]">
                  <span className="errorSign">!</span>
                  {userDetailsErrors.nameError}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-sm leading-4 font-medium">
                Email
              </label>
              <input
                className="bg-[#333] w-full border border-zinc-400 rounded px-2 py-1 text-sm
            outline-none focus-within:border-pink-600 focus-within:shadow-focusInputBoxShadow duration-100
            placeholder:text-[13px] font-normal"
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                autoComplete="email"
              />
              {userDetailsErrors.emailError && (
                <p className="flex gap-2 items-center text-xs text-[rgb(255,0,0)]">
                  <span className="errorSign">!</span>
                  {userDetailsErrors.emailError}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm leading-4 font-medium"
              >
                Password
              </label>
              <input
                className="bg-[#333] w-full border border-zinc-400 rounded px-2 py-1 text-sm
            outline-none focus-within:border-pink-600 focus-within:shadow-focusInputBoxShadow duration-100
            placeholder:text-[13px] font-normal"
                type="password"
                name="password"
                id="password"
                ref={passwordRef}
                autoComplete="current-password"
              />
              {userDetailsErrors.passwordError ? (
                <p className="flex gap-2 items-center text-xs text-[#ff0000]">
                  <span className="errorSign">!</span>
                  {userDetailsErrors.passwordError}
                </p>
              ) : (
                <div className="text-xs mt-1">
                  <span className="text-blue-600 text-sm italic pl-1 pr-2 font-serif font-semibold">
                    i
                  </span>
                  Passwords must be at least 6 characters.
                </div>
              )}
            </div>
            <button
              type="submit"
              className="customButton"
              onClick={handleFormSubmit}
            >
              Continue
            </button>
            <p className="text-sm text-center">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")} className="defaultLink">
                Login
                <i className="fa-solid fa-angles-right pl-[2px]"></i>
              </span>
            </p>
          </form>
        </section>
        {isSignupSuccess && (
          <div className="w-full py-4">
            <p className="pb-2 text-center text-green-500 font-medium">
              Account created successfully!
            </p>
            <button
              onClick={() => navigate("/login")}
              className=" w-full text-sm text-[#D9D6E5] p-1 border border-lightGray rounded-lg hover:bg-[#333] transform active:scale-95 transition-all ease-in-out"
            >
              Go to login page
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Signup;
