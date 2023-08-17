import { LoginButton } from "./nextauth.buttons.component";

export const NotLoggedInn = () => {
  return (
    <>
      <div className={`text-center`}>
        <h1>Du er ikke logget inn! Logg inn her:</h1>
        <LoginButton />
      </div>
    </>
  );
};

export default NotLoggedInn;
