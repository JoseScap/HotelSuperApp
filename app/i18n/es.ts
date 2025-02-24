import { Translations } from "./en"

const es: Translations = {
  // Common and generics
  common: {
    ok: "OK",
    cancel: "Cancelar",
    back: "Atrás",
    logOut: "Cerrar sesión",
    duration: "Duración: ",
    schedule: "Horario: ",
    bookNow: "Reservar",
    currency: "$",
  },
  emptyStateComponent: {
    generic: {
      heading: "Muy vacío... muy triste",
      content:
        "No se han encontrado datos por el momento. Intenta darle clic en el botón para refrescar o recargar la app.",
      button: "Intentemos de nuevo",
    },
  },
  googleSignInButton: {
    error: {
      cancelled: "Cancelado",
      inProgress: "En progreso",
      playServicesNotAvailable: "Play Services no disponibles",
      signInRequired: "Requiere inicio de sesión",
      other: "Ocurrió un error, por favor intenta nuevamente.",
    },
  },

  // Screens
  landingScreen: {
    header: "Bienvenido",
    title: "¡Bienvenido a {{brand}}!",
    lookingForARoom: "¿Querés reservar una habitación?",
    bookNow: "¡Reservar ahora!",
    haveAnAccount: "¿Ya tenés una cuenta?",
    signIn: "Iniciar sesión",
    notHaveAnAccount: "¿Es tu primera vez aquí?",
    signUp: "Crear cuenta",
  },
  errorScreen: {
    title: "Algo salió mal",
    friendlySubtitle:
      "Esto es el mensaje de error amigable que se muestra a los usuarios finales. Algo salió mal.",
    reset: "REINICIAR APP",
    traceTitle: "Error desde %{name}",
  },
  loginScreen: {
    logIn: "Iniciar sesión",
    enterDetails: "Ingresa tus datos para continuar",
    emailFieldLabel: "Email",
    emailFieldPlaceholder: "Ingresa tu email",
    passwordFieldLabel: "Contraseña",
    passwordFieldPlaceholder: "Ingresa tu contraseña",
    tapToLogIn: "Iniciar sesión",
    tapToLogInWithGoogle: "Continuar con Google",
    hint: "¿Necesitas ayuda? Usa tu correo registrado y contraseña.",
    or: "O",
    errors: {
      emailRequired: "El email es requerido",
      emailMinimunCharacters: "debe tener al menos 8 caracteres",
      emailInvalid: "El email no es válido",
      passwordRequired: "La contraseña es requerida",
      passwordTooShort: "La contraseña debe tener al menos 12 caracteres",
      passwordInvalid: "La contraseña debe contener solo letras y números",
      loginFailed: "Error al iniciar sesión. Por favor, verifica tus datos.",
    },
  },
  registrationScreen: {
    signUp: "Crear Cuenta",
    enterDetails: "Ingresa tus datos para crear tu cuenta.",
    emailFieldLabel: "Correo Electrónico",
    passwordFieldLabel: "Contraseña",
    confirmPasswordFieldLabel: "Confirmar Contraseña",
    emailFieldPlaceholder: "Ingresa tu correo",
    passwordFieldPlaceholder: "Ingresa tu contraseña",
    confirmPasswordFieldPlaceholder: "Confirma tu contraseña",
    tapToSignUp: "Crear Cuenta",
    errors: {
      emailRequired: "El correo es requerido",
      emailInvalid: "Por favor ingresa un correo válido",
      passwordRequired: "La contraseña es requerida",
      passwordTooShort: "La contraseña debe tener al menos 12 caracteres",
      passwordInvalid: "La contraseña debe contener solo letras y números",
      passwordsDontMatch: "Las contraseñas no coinciden",
      signUpFailed: "El registro falló. Por favor intenta de nuevo.",
      confirmPasswordRequired: "Por favor confirma tu contraseña",
    },
    or: "O puedes continuar con",
    tapToSignUpWithGoogle: "Continuar con Google",
  },
  homeScreen: {
    title: "Inicio",
    welcome: "Bienvenido",
    searchPlaceholder: "Buscar actividades, servicios...",
    activities: "Actividades",
    popularDestinations: "Destinos populares",
    recommendations: "Recomendaciones",
  },
  profileScreen: {
    title: "Perfil",
    sectionPersonalDataTitle: "Datos personales",
    sectionPreferencesTitle: "Preferencias",
    darkModeTitle: "Modo Oscuro",
    activateDarkMode: "Activar Modo Oscuro",
    deactivateDarkMode: "Desactivar Modo Oscuro",
    displayNameLabel: "Nombre para mostrar",
    sectionActionsTitle: "Acciones",
    errors: {
      updateFailed: "Error al actualizar el nombre. Por favor intenta de nuevo.",
    },
  },
  activitiesScreen: {
    title: "Actividades",
    subtitle: "Dentro del hotel",
    city: "La ciudad",
  },
  registerSuccessScreen: {
    heading: "¡Registro exitoso!",
    content:
      "Tu cuenta ha sido creada correctamente. Por favor, verifica tu correo electrónico antes de iniciar sesión.",
    button: "Ir a Iniciar Sesión",
  },
  exploreScreen: {
    title: "Explorar",
    subtitle: "Descubre nuestras instalaciones y servicios",
    searchPlaceholder: "Buscar actividades, servicios...",
    activities: "Actividades",
    popularDestinations: "Destinos populares",
    recommendations: "Recomendaciones",
  },
  bookingScreen: {
    title: "Reservar",
    subtitle: "Selecciona las fechas de tu estadía",
    selectDates: "Selecciona las fechas",
    numberOfGuests: "Número de huéspedes",
    bookingSummary: "Resumen de la reserva",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Huéspedes",
    notSelected: "No seleccionado",
    continueBooking: "Continuar con la reserva",
  },
  checkInScreen: {
    title: "Check-in",
    subtitle: "Completa tu check-in",
    reservationCode: "Código de reserva",
    lastName: "Apellido",
    email: "Email",
    estimatedArrival: "Hora estimada de llegada",
    importantInfo: "Información importante",
    importantInfoDetails: [
      "El check-in está disponible desde las 15:00",
      "Por favor, ten tu identificación a mano",
      "Se requiere tarjeta de crédito para el registro",
    ],
    completeCheckIn: "Completar check-in",
  },
  activityDetailScreen: {
    topBarTitle: "Detalles de la Actividad",
    resort: {
      title: "Resort & Spa",
      description: "Disfruta de una experiencia única en nuestras instalaciones de lujo",
    },
    spa: {
      title: "Spa & Wellness",
      description: "Un oasis de relajación y bienestar",
    },
    gastronomy: {
      title: "Gastronomía",
      description: "Explora nuestra oferta culinaria",
    },
    activities: {
      title: "Actividades",
      description: "Programa tu día con nuestras actividades",
    },
    timeLabel: "Duración",
    scheduleLabel: "Horario",
    price: "Precio: {{currency}}{{value}}",
    bookActivity: "Reservar {{activity}}",
  },

  // Navigators
  homeNavigator: {
    homeTab: "Inicio",
    profileTab: "Perfil",
    activitiesTab: "Actividades",
  },

  error: {
    generic: "Ocurrió un error",
    network: "Error de red",
    validation: "Error de validación",
    unauthorized: "No autorizado",
    notFound: "No encontrado",
    invalidEmail: "Email inválido",
    invalidPassword: "Contraseña inválida",
    invalidCredentials: "Credenciales inválidas",
    required: "Este campo es requerido",
    minLength: "No cumple con la longitud mínima",
    maxLength: "Excede la longitud máxima",
  },
}

export default es
