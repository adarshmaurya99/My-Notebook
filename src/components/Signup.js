import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json);
        const { success, error } = json;
        //Save the auth-token and redirect
        if (success) {
            localStorage.setItem('token', json.authToken);
            history.push("/");
            props.showAlert("Accout created in successfully", "success")
        } else {
            props.showAlert("Invalid credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-2'>
            <h2>Create an account to use MyNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="text" className="form-label">Name</label>
                    <input type="text" className="form-control" id="text" name="name" onChange={onChange} aria-describedby="text" />
                </div>

                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3 mx-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label for="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
