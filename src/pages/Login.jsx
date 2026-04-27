export default function Login() {
  return (
    <div className="login-container container">
      <form className="login-form">
        <div className="login-image-container">
          <img src="https://harlanrestaurant.com/images/email/logo.png" alt="" className="login-image" />
        </div>
        <h4 className="text-center mt-3">Harlan Restaurant</h4>
        <h6 className="text-center">Admin Login</h6>
        <div className="w-75 m-auto py-3">
          <div>
            <input type="text" className="form-control py-3 mb-3" placeholder="Username" />
          </div>
          <div>
            <input type="password" className="form-control  py-3 mb-3" placeholder="Password" />
          </div>
          <div className="mb-3">
            <input type="checkbox" />
            <span className="ms-2 ">Remember me</span>
          </div>
          <div>
            <button className="btn btn-dark text-warning w-100 py-2 mb-3">Login</button>
          </div>

          <div className="text-center text-primary">
            <p>Forget password?</p>
          </div>
        </div>
      </form>
    </div>
  );
}
