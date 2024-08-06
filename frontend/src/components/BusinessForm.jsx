import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import registration_illustartion from '../Assests/registration.png'

const BusinessForm = (props) => {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    description: '',
    location: ' ',
    website: '',
    currentRevenue: '',
    partnershipGoal: '',
    equityOffered: '',
    contactPerson: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const host = process.env.REACT_APP_BACKEND_HOST;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/signin');
    }
    const userType = localStorage.getItem("type");
    if (userType !== "business") {
      navigate("/submit-creator");
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch(`${host}/api/auth/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
          },
        });
        const user = await res.json();
        localStorage.setItem("type", user.type);
        setFormData((prevData) => ({
          ...prevData,
          email: user.email,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchFormData = async () => {
      try {
        const res = await fetch(`${host}/api/form/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
          },
        });
        const json = await res.json();
        if (json.length > 0) {
          setFormData(json[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching form data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
    fetchFormData();
  }, [host, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = formData._id ? `${host}/api/form/update/${formData._id}` : `${host}/api/form/submit`;
      const method = formData._id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ ...formData, type: localStorage.getItem("type") })
      });
      const json = await res.json();
      console.log(json);
      if (json.errors) {
        props.showAlert("Invalid Data", "danger");
      } else {
        props.showAlert("Form Submitted Successfully", "success");
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      props.showAlert("An error occurred", "danger");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-[100dvh] bg-background" >
      <div className="flex-1 flex items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card" style={{backgroundColor:'#EBD96B', marginBottom:"20px"}}>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">{formData._id ? "Update Your Business" : "Register Your Business"}</h1>
                <p className="text-muted-foreground">{formData._id ? "Update your business details below." : "Enter your business details to continue."}</p>
              </div>
              <div className="grid gap-4">
                {Object.keys(formData).map((key) => (
                  key !== "_id" && key !== "__v" && key !== "type" && key !== "user" && key !== "createdAt" && key !== "updatedAt" && (
                    <div key={key} className="grid gap-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </label>
                      {key === "description" ? (
                        <textarea
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id={key}
                          name={key}
                          placeholder={`Enter your ${key}`}
                          value={formData[key]}
                          onChange={handleChange}
                          required
                        ></textarea>
                      ) : (
                        <input
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                          id={key}
                          name={key}
                          placeholder={`Enter your ${key}`}
                          value={formData[key]}
                          onChange={handleChange}
                          required
                        />
                      )}
                    </div>
                  )
                ))}
              </div>
              <div className="items-center p-6 flex justify-between">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                  type="submit"
                >
                  {formData._id ? "Update Business" : "Register Business"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex-1 flex  justify-center" >
        <div className="w-full max-w-md">
          <div className="relative h-[400px] rounded-lg">
            <div className="absolute inset-0 flex items-center  justify-center">
              {/* <svg
                className="h-[300px] w-[300px] animate-spin-slow fill-primary"
                viewBox="0 0 100 100"
                xmlns={registration_illustartion}
                //xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C32.4 90 10 67.6 10 50S32.4 10 50 10s40 22.4 40 40-22.4 40-40 40z"></path>
                <path d="M50 0v10c22.1 0 40 17.9 40 40h10C100 22.4 77.6 0 50 0z"></path>
              </svg> */}
              <img src={registration_illustartion} style={{paddingTop:'30vh'}}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessForm;
