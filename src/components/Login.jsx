import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const Login = () => {
  const emailRef = useRef({});
  const passwordRef = useRef({});

  const location = useLocation();

  const navigate = useNavigate();

  const [userDetailsErrors, setUserDetailsErrors] = useState({
    emailError: "",
    passwordError: "",
  });

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

    // dispatch(userSignin(auth, navigate, location, { email, password }));
  };

  return (
    <section name="signin" className="h-screen bg-[#6666] overflow-y-scroll">
      <div className="max-w-[350px] mx-auto flex flex-col items-center">
        <section className="border border-lightGray rounded-lg px-6 py-4">
          <form
            noValidate
            action=""
            className="grid gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-[28px] font-medium">Sign in</h2>
            <div>
              <label htmlFor="email" className="text-sm leading-4 font-medium">
                Email
              </label>
              <input
                className="inputBox"
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                autoComplete="email"
              />
              {userDetailsErrors.emailError && (
                <p className="flex gap-2 items-center text-xs text-[#ff0000]">
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
                className="inputBox"
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
            <p className="text-[#D9D6E5] text-xs leading-4 mt-4 px-2 text-center">
              By continuing you agree to our{" "}
              <span>
                {" "}
                <NavLink
                  to="https://help.jiocinema.com/articles/terms-and-conditions/terms-and-conditions/641d382892cd636d4c10983d?uid=82a9dec5-8954-48b7-98c4-08fea6dbc289&name=AuM5QLbF"
                  target="_blank"
                  className="defaultLink"
                >
                  Terms of Use
                </NavLink>{" "}
              </span>
              and acknowledge that you have read our{" "}
              <span className="">
                <NavLink
                  to="https://help.jiocinema.com/articles/terms-and-conditions/privacy-policy/641d3829d903444a7aef49b1?uid=82a9dec5-8954-48b7-98c4-08fea6dbc289&name=AuM5QLbF"
                  target="_blank"
                  className="defaultLink"
                >
                  Privacy Policy.
                </NavLink>
              </span>
            </p>
          </form>
        </section>
        <div className="w-full text-xs text-[#767676] font-medium mt-4 flex items-center">
          <span className="w-1/3 h-[1px]  bg-lightGray inline-flex"></span>
          <span className="w-1/3 text-center">New to JioCinema?</span>
          <span className="w-1/3 h-[1px] bg-lightGray inline-flex"></span>
        </div>

        <div className="w-full py-4">
          <NavLink to="/register">
            <button className=" w-full text-sm text-[#D9D6E5] p-1 border border-lightGray rounded-lg hover:bg-[#333] transform active:scale-95 transition-all ease-in-out">
              Create your JioCinema account
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Login;
