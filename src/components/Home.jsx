import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="px-4 flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-6">TaskBoard App</h1>
      <p className="text-lg text-slate-500 font-semibold mb-8">
        A simple and effective way to manage your tasks and stay organized.
      </p>
      <div className="flex gap-4 font-semibold">
        <Link to="/login">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
            Register
          </button>
        </Link>
      </div>
      <p className="mt-4  text-gray-500 font-semibold">
        If you don&apos;t have an account, please register first.
      </p>
    </div>
  );
};

export default Home;
