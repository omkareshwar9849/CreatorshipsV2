import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [otp, setOtp] = useState('');
    const [showOtpBox, setShowOtpBox] = useState(false);
    let navigate = useNavigate();
    const host = process.env.REACT_APP_BACKEND_HOST;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${host}/api/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await res.json();
        console.log(json);
        if (json.success) {
            const res = await fetch(`${host}/api/email/otp/${otp}`);
            if (res.status === 200) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                localStorage.setItem('type', json.type);
                props.showAlert("Login Successfully", "success");
                if (json.type === 'business') {
                    navigate('/creators');
                } else {
                    navigate('/businesses');
                }
            }
            else {
                props.showAlert("Invalid OTP", "danger");
            }
        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    };

    const isValidEmail = (email) => {
        const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return re.test(String(email).toLowerCase());
    };

    const handleSendOtp = async () => {
        if (!credentials.email || credentials.email.trim() === '') {
            props.showAlert(`Please enter your email to receive the OTP.`, "warning");
            return; // Prevent OTP sending
        }

        if (!isValidEmail(credentials.email)) {
            props.showAlert(`Please enter a valid email.`, "danger");
            return; // Prevent OTP sending
        }

        const emailsend = process.env.REACT_APP_EMAIL;
        if (Number(emailsend) === 1) {
            props.showAlert("Sending OTP, please wait....", "success");
            fetch(`${host}/api/email/sendotp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: credentials.email })
            }).then((response) => {
                if (response.ok) {
                    setShowOtpBox(true);
                    props.showAlert(`OTP Sent to your email successfully`, "success");
                }
            })
                .catch((error) => {
                    console.error("Network error:", error);
                    props.showAlert("NETWORK ERROR : Unable to send OTP" + error, "danger");
                });
        }
        else {
            setShowOtpBox(true);
            const otp = await fetch(`${host}/api/email/otp`);
            const otpjson = await otp.json();
            console.log(otpjson);
            props.showAlert(`OTP Sent to your email successfully : ${otpjson.OTP}`, "success");
            // props.showAlert(`OTP Sent to your email successfully`, "success");
        }
    };

    const onChange = (e) => {
        if (e.target.name === "otp") {
          setOtp(e.target.value);
        }
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }

    return (
        <div className="flex min-h-[80dvh] bg-background" >
            <div className="flex-1 flex items-center justify-center" >
                <div className="w-full max-w-md">
                    <div className="relative h-[420px] overflow-hidden rounded-lg">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img
                                className="h-full w-full rounded-lg object-cover"
                                src="https://i.ibb.co/Zcj4Qsc/business-decisions.jpg"
                                alt="side"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center" >
                <div className="mx-auto w-full max-w-md space-y-6">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card" style={{ backgroundColor: '#EBD96B' }}>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-2 text-center">
                                <h1 className="text-3xl font-bold">Welcome back!</h1>
                                <p className="text-muted-foreground">Enter your email and password to sign in.</p>
                            </div>
                            <div className="grid gap-4">
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
                                        placeholder="Enter you email address"
                                        value={credentials.email}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <a className="text-xs text-muted-foreground hover:underline" href="/">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={credentials.password}
                                        placeholder="Enter you password"
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>

                            {!showOtpBox ? (
                                <div className="items-center p-6 flex justify-between">
                                    <button
                                        onClick={handleSendOtp}
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                                        type="button"
                                        style={{ color: '#EBD96B' }}
                                    >
                                        Send OTP
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid gap-2">
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="otp"
                                            autoComplete="false"
                                        >
                                            Enter OTP
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            onChange={onChange}
                                            maxLength={4}
                                            id="otp"
                                            name="otp"
                                            placeholder="Enter you OTP"
                                            value={otp}
                                            required
                                        />
                                    </div>
                                    <div className="items-center p-6 flex justify-between">
                                        <button
                                            onClick={handleSendOtp}
                                            className="inline-flex mr-5 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                                            type="button"
                                            style={{ color: '#EBD96B' }}
                                        >
                                            Resend OTP
                                        </button>
                                        <button
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                                            type="submit"
                                            style={{ color: '#EBD96B' }}
                                        >
                                            Login
                                        </button>
                                    </div>
                                </>
                            )}

                        </form>
                    </div>
                    <div className="text-center text-sm text-muted-foreground" >
                        Don't have an account?{" "}
                        <a className="underline hover:text-primary" href="/signup">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
