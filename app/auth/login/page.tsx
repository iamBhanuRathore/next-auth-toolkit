import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <>
      <LoginForm />
      {/* <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg
     className="w-6 h-6"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <path d="m9 16 3-3 3 3" />
    </svg>
        </button>
        <div className="flex flex-col items-center">
          <svg
            className="w-24 h-24 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <h2 className="text-2xl font-semibold mt-4">Email Confirmation</h2>
          <h3 className="text-4xl font-bold mt-4">OTP: 123456</h3>
          <p className="text-gray-600 mt-4 text-center">
            We have sent an email to
            <a className="text-blue-600 hover:underline" href="#">
              niteshchandra47@gmail.com
            </a>
            to confirm the validity of our email address. After receiving the
            email follow the link provided to complete your registration.
            {"\n                  "}
          </p>
          <p className="text-gray-600 mt-4 text-center">
            If you not got any mail
            <a className="text-blue-600 hover:underline" href="#">
              Resend confirmation mail
            </a>
          </p>
          <h3 className="text-lg font-semibold mt-4">Username: JohnDoe</h3>
          <h3 className="text-lg font-semibold mt-4">
            Company: Your Company Name
          </h3>
        </div>
      </div>
      <footer className="mt-8 text-center text-gray-600">
        <p>© 2024 Your Company Name</p>
      </footer>
    </div> */}
    </>
  );
};

export default LoginPage;
