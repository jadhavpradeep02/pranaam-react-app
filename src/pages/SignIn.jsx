import { Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function SignIn() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#eaf1fb]">
      <div className="panel max-w-4xl w-full overflow-hidden grid md:grid-cols-2 min-h-[470px]">
        <div className="bg-gradient-to-br from-[#082a53] via-[#155fa9] to-[#f8b26c] text-white p-10 flex flex-col justify-between">
          <Plane size={40} />
          <div>
            <h1 className="text-4xl font-bold tracking-wider">PRANAAM</h1>
            <p className="text-sm mt-2 text-blue-100">
              Airport Hospitality Services
            </p>
            <p className="text-2xl mt-12 font-semibold leading-snug">
              Exceptional Journeys
              <br />
              Begin Here
            </p>
          </div>
          <p className="text-xs text-blue-100">
            Resource allocation console · Demo
          </p>
        </div>
        <form
          className="p-8 md:p-12 flex flex-col justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/dashboard");
          }}
        >
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm muted mt-1 mb-7">
            Sign in to access the allocation dashboard
          </p>
          <label className="text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="field mb-5"
            placeholder="Enter your email"
          />
          <label className="text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            className="field mb-5"
            placeholder="Enter your password"
          />
          <p className="text-xs muted mb-5">
            Demo only: credentials are not validated.
          </p>
          <button className="btn btn-primary py-3">Sign In</button>
        </form>
      </div>
    </main>
  );
}
