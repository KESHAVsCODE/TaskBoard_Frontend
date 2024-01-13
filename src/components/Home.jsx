import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-4xl font-bold mb-6">TaskBoard App</h1>
      <p className="text-slate-500 font-semibold mb-8">
        A simple and effective way to manage your tasks and stay organized.
      </p>
      <div className="flex gap-4">
        <Link to="/login">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all">
            Register
          </button>
        </Link>
      </div>
      <p className="mt-4 text-gray-500">
        If you don&apos;t have an account, please register first.
      </p>
    </div>
  );
};

export default Home;
