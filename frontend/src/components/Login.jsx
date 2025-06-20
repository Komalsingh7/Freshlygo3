import React from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();
  const [state, setState] = React.useState("login"); // or "register"
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const payload = { email, password };
      if (state === "register") payload.name = name;

      const { data } = await axios.post(`/api/user/${state}`, payload);

      if (data.success) {
        setUser(data.user);
        setShowUserLogin(false);
        navigate('/');
        toast.success(data.message || "Success!");
      } else {
        toast.error(data.message || "Something went wrong.");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Server error.");
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 left-0 right-0 bottom-0 z-30 flex items-center justify-center bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px] bg-white rounded-lg shadow-xl border border-gray-200"
      >
        <p className="text-2xl font-medium text-center w-full">
          <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded outline-primary"
            />
          </div>
        )}

        <div className="w-full">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded outline-primary"
          />
        </div>

        <div className="w-full">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded outline-primary"
          />
        </div>

        <p className="text-sm text-center w-full">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setState("login")} className="text-primary cursor-pointer">
                Login
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span onClick={() => setState("register")} className="text-primary cursor-pointer">
                Sign Up
              </span>
            </>
          )}
        </p>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dull transition-all text-white py-2 rounded-md"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
