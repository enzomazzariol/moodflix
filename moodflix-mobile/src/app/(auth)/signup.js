import SignupForm from "../../components/forms/SignupForm";
import AuthScreen from "../../components/screens/AuthScreen";

export default function Signup() {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <AuthScreen>
      <SignupForm onSubmit={onSubmit} />
    </AuthScreen>
  );
}
