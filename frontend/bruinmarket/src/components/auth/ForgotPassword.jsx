import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => { 
    const [email, setEmail] = useState("");  

    const navigate = useNavigate();

    const [ForgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation();

    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
      }
      if (error) {
        toast.error(error?.data?.message);
      }

      if(isSuccess) {
        toast.success("Email sent successfully, check your inbox!");
      }
    }, [error, isAuthenticated, isSuccess]);
    
  
    const submitHandler = (e) => {
      e.preventDefault();
  
      ForgotPassword({ email });
      };

    return (
        <div class="row wrapper">
        <div class="col-10 col-lg-5">
          <form
            class="shadow rounded bg-body"
            onSubmit={submitHandler}
          >
            <h2 class="mb-4">Forgot Password</h2>
            <div class="mt-3">
              <label htmlFor="email_field" class="form-label">Enter Email</label>
              <input
                type="email"
                id="email_field"
                class="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <button
              id="forgot_password_button"
              type="submit"
              class="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading? "Sending..." : 'Send Email'}
            </button>
          </form>
        </div>
      </div>
    );
};


export default ForgotPassword;