export const loginFields = [
  {
    name: "emailOrUsername",
    label: "Email o nombre de usuario",
    placeholder: "ejemplo123",
    secureTextEntry: false,
    keyboardType: "email-address",
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "micontraseñasecreta",
    secureTextEntry: true,
    keyboardType: "default",
  },
];

export const signupFields = [
  {
    name: "username",
    label: "Nombre",
    placeholder: "Nombre",
    secureTextEntry: false,
    keyboardType: "default",
  },
  {
    name: "email",
    label: "Correo electrónico",
    placeholder: "Correo electrónico",
    secureTextEntry: false,
    keyboardType: "email-address",
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "Contraseña",
    secureTextEntry: true,
    keyboardType: "default",
  },
  {
    name: "confirmPassword",
    label: "Confirmar contraseña",
    placeholder: "Confirmar contraseña",
    secureTextEntry: true,
    keyboardType: "default",
  },
];
