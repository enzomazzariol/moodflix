import LoginForm from "../../components/forms/loginForm";
import AuthScreen from "../../components/screens/AuthScreen";

export default function Login() {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <AuthScreen>
      <LoginForm onSubmit={onSubmit} />
    </AuthScreen>
  );
}
