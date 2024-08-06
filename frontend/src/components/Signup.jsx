import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", type: "" });
  let navigate = useNavigate();
  const host = process.env.REACT_APP_BACKEND_HOST;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.cpassword === credentials.password) {
      const response = await fetch(`${host}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, type: credentials.type })
      });
      const json = await response.json();
      console.log(json)
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        localStorage.setItem('type', json.type);
        props.showAlert("Account Created Successfully", "success");
        if(json.type === 'business'){
          navigate('/submit-business');
        }else{
          navigate('/submit-creator');
        }
      } else {
        props.showAlert("User with this email already exists", "danger");
      }
    } else {
      props.showAlert("Password and confirm password mismatch", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex min-h-[100dvh] bg-background pb-8 pt-2">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="relative h-[500px] overflow-hidden rounded-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                className="h-full w-full rounded-lg object-cover"
                src="https://i.ibb.co/fFhjy4x/mm.jpg"
                alt="side"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card" style={{backgroundColor:'#EBD96B'}}>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Create your account</h1>
                <p className="text-muted-foreground">Enter your details to sign up.</p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={credentials.name}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={credentials.email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="type"
                  >
                    Type
                  </label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="type"
                    name="type"
                    value={credentials.type}
                    onChange={onChange}
                    required
                  >
                    <option value="" disabled>Select your type</option>
                    <option value="business">Business</option>
                    <option value="creator">Creator</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="cpassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    placeholder="Confirm your password"
                    value={credentials.cpassword}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="items-center p-6 flex justify-between">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a className="underline hover:text-primary" href="/signin">
              signin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
