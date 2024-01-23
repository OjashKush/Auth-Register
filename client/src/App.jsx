import { Link } from "react-router-dom";

function App() {
  return (
      <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-[4rem]">Authentication</h1>
            <div className="flex items-center gap-6">
                <Link to='/login' className="border-2 border-black py-4 px-2 rounded-md"><button>Login</button></Link>
                <Link to='/register' className="border-2 border-black py-4 px-2 rounded-md"><button>Register</button></Link>
            </div>
      </div> 
  );
}

export default App;
