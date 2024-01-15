import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef({});
  const passwordRef = useRef({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user.userId) {
      navigate("/task-board");
    }
  }, [user.userId]);

  const [userDetailsErrors, setUserDetailsErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const loginUser = async (user) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/user/login`,
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
      setUser(data?.data);
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

  const handleFormSubmit = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const errors = {
      emailError: email ? "" : "Enter your email",
      passwordError: password ? "" : "Enter your password",
    };

    if (errors.emailError || errors.passwordError) {
      setUserDetailsErrors({ ...errors });
      return;
    } else {
      setUserDetailsErrors({ ...errors });
    }

    loginUser({ userEmail: email, userPassword: password });
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
            <h2 className="text-[28px] font-medium">Login</h2>
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
              {userDetailsErrors.passwordError && (
                <p className="flex gap-2 items-center text-xs text-[#ff0000]">
                  <span className="errorSign">!</span>
                  {userDetailsErrors.passwordError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="customButton"
              onClick={handleFormSubmit}
            >
              Continue
            </button>
          </form>
        </section>
        <div className="w-full text-xs text-[#767676] font-medium mt-4 flex items-center">
          <span className="w-1/3 h-[1px]  bg-lightGray inline-flex"></span>
          <span className="w-1/3 text-center">New to TaskBoard?</span>
          <span className="w-1/3 h-[1px] bg-lightGray inline-flex"></span>
        </div>

        <div className="w-full py-4">
          <button
            onClick={() => navigate("/signup")}
            className=" w-full text-sm text-[#D9D6E5] p-1 border border-lightGray rounded-lg hover:bg-[#333] transform active:scale-95 transition-all ease-in-out"
          >
            Create your TaskBoard account
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
