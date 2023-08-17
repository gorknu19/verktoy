import { RegisterForm } from "./form";

function Register() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-1/4">
          <h1 className={`text-center font-bold text-lg m-5 `}>Register</h1>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}

export default Register;
