import demoEs from "./demo-es"
import { Translations } from "./en"

const es: Translations = {
  // Common and generics
  common: {
    ok: "OK",
    cancel: "Cancelar",
    back: "Volver",
    logOut: "Cerrar sesión",
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
    title: "¡Algo salió mal!",
    friendlySubtitle:
      "Esta es la pantalla que verán tus usuarios en producción cuando haya un error. Vas a querer personalizar este mensaje (que está ubicado en `app/i18n/es.ts`) y probablemente también su diseño (`app/screens/ErrorScreen`). Si quieres eliminarlo completamente, revisa `app/app.tsx` y el componente <ErrorBoundary>.",
    reset: "REINICIA LA APP",
    traceTitle: "Error desde %{name}",
  },
  loginScreen: {
    logIn: "Iniciar sesión",
    enterDetails: "Accede a tu cuenta ingresando tus credenciales.",
    emailFieldLabel: "Correo electrónico",
    passwordFieldLabel: "Contraseña",
    emailFieldPlaceholder: "Ingresa tu correo",
    passwordFieldPlaceholder: "Ingresa tu contraseña",
    tapToLogIn: "Iniciar sesión",
    tapToLogInWithGoogle: "Continuar con Google",
    hint: "¿Necesitas ayuda? Usa tu correo registrado y contraseña.",
    errors: {
      emailRequired: "Campo obligatorío.",
      emailMinimunCharacters: "Debe tener al menos 8 caracteres.",
      emailInvalid: "Debe ser un email valido.",
      passwordRequired: "La contraseña es requerida",
      passwordTooShort: "La contraseña debe tener al menos 12 caracteres",
      passwordInvalid: "La contraseña solo debe contener letras y números",
      loginFailed:
        "Error al iniciar sesión. Por favor verifica tus credenciales e intenta nuevamente.",
    },
    or: "O puedes continuar con",
  },
  registrationScreen: {
    signUp: "Crear cuenta",
    enterDetails: "Ingresa tus datos para crear tu cuenta.",
    emailFieldLabel: "Correo electrónico",
    passwordFieldLabel: "Contraseña",
    confirmPasswordFieldLabel: "Confirmar contraseña",
    emailFieldPlaceholder: "Ingresa tu correo",
    passwordFieldPlaceholder: "Ingresa tu contraseña",
    confirmPasswordFieldPlaceholder: "Confirma tu contraseña",
    tapToSignUp: "Crear cuenta",
    errors: {
      emailRequired: "El email es requerido",
      emailInvalid: "Por favor ingrese un email válido",
      passwordRequired: "La contraseña es requerida",
      passwordTooShort: "La contraseña debe tener al menos 12 caracteres",
      passwordInvalid: "La contraseña solo debe contener letras y números",
      passwordsDontMatch: "Las contraseñas no coinciden",
      signUpFailed: "El registro falló. Por favor intenta nuevamente.",
    },
    or: "O puedes continuar con",
    tapToSignUpWithGoogle: "Continuar con Google",
  },
  homeScreen: {
    title: "Inicio",
  },
  profileScreen: {
    title: "Perfil",
    sectionPersonalDataTitle: "Datos Personales",
    sectionPreferencesTitle: "Preferencias",
    darkModeTitle: "Modo Oscuro",
    activateDarkMode: "Activar Modo Oscuro",
    deactivateDarkMode: "Desactivar Modo Oscuro",
    displayNameLabel: "Nombre para mostrar",
    errors: {
      updateFailed: "No se pudo actualizar el nombre. Por favor intenta nuevamente.",
    },
  },
  activitiesScreen: {
    title: "Actividades",
    subtitle: "Dentro del hotel",
    city: "La ciudad",
  },
  registerSuccessScreen: {
    heading: "¡Cuenta Creada Exitosamente! ✅",
    content:
      "Tu cuenta ha sido creada. Por favor revisa tu correo para verificar tu cuenta antes de iniciar sesión.",
    button: "Ir a Iniciar Sesión",
  },

  // Navigators
  demoNavigator: {
    componentsTab: "Componentes",
    debugTab: "Debug",
    communityTab: "Comunidad",
    podcastListTab: "Podcasts",
  },
  homeNavigator: {
    homeTab: "Inicio",
    profileTab: "Perfil",
    activitiesTab: "Actividades",
  },

  // To delete
  demoCommunityScreen: {
    title: "Conecta con la comunidad",
    tagLine:
      "Únete a la comunidad React Native con los ingenieros de Infinite Red y mejora con nosotros tus habilidades para el desarrollo de apps.",
    joinUsOnSlackTitle: "Únete a nosotros en Slack",
    joinUsOnSlack:
      "¿Quieres conectar con desarrolladores de React Native de todo el mundo? Únete a la conversación en nuestra comunidad de Slack. Nuestra comunidad, que crece día a día, es un espacio seguro para hacer preguntas, aprender de los demás y ampliar tu red.",
    joinSlackLink: "Únete a la comunidad de Slack",
    makeIgniteEvenBetterTitle: "Haz que Ignite sea aún mejor",
    makeIgniteEvenBetter:
      "¿Tienes una idea para hacer que Ignite sea aún mejor? ¡Nos encantaría escucharla! Estamos siempre buscando personas que quieran ayudarnos a construir las mejores herramientas para React Native. Únete a nosotros en GitHub para ayudarnos a construir el futuro de Ignite.",
    contributeToIgniteLink: "Contribuir a Ignite",
    theLatestInReactNativeTitle: "Lo último en el mundo de React Native",
    theLatestInReactNative:
      "Estamos aquí para mantenerte al día con todo lo que React Native tiene para ofrecer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "Newsletter de React Native",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Conferencia Chain React",
    hireUsTitle: "Trabaja con Infinite Red en tu próximo proyecto",
    hireUs:
      "Ya sea para gestionar un proyecto de inicio a fin o educación a equipos a través de nuestros cursos y capacitación práctica, Infinite Red puede ayudarte en casi cualquier proyecto de React Native.",
    hireUsLink: "Envíanos un mensaje",
  },
  demoShowroomScreen: {
    jumpStart: "Componentes para comenzar tu proyecto",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "A través de el atributo `tx`",
    demoViaSpecifiedTxProp: "A través de el atributo específico `{{prop}}Tx`",
  },
  demoDebugScreen: {
    howTo: "CÓMO HACERLO",
    title: "Debug",
    tagLine:
      "Felicidades, aquí tienes una propuesta de arquitectura y base de código avanzada para una app en React Native. ¡Disfrutalos!",
    reactotron: "Enviar a Reactotron",
    reportBugs: "Reportar errores",
    demoList: "Lista demo",
    demoPodcastList: "Lista demo de podcasts",
    androidReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, corre adb reverse tcp:9090 tcp:9090 desde tu terminal, y luego recarga la app.",
    iosReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, y luego recarga la app.",
    macosReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, y luego recarga la app.",
    webReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, y luego recarga la app.",
    windowsReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, y luego recarga la app.",
  },
  demoPodcastListScreen: {
    title: "Episodios de React Native Radio",
    onlyFavorites: "Mostrar solo favoritos",
    favoriteButton: "Favorito",
    unfavoriteButton: "No favorito",
    accessibility: {
      cardHint:
        "Haz doble clic para escuchar el episodio. Haz doble clic y mantén presionado para {{action}} este episodio.",
      switch: "Activa para mostrar solo favoritos",
      favoriteAction: "Cambiar a favorito",
      favoriteIcon: "Episodio no favorito",
      unfavoriteIcon: "Episodio favorito",
      publishLabel: "Publicado el {{date}}",
      durationLabel: "Duración: {{hours}} horas {{minutes}} minutos {{seconds}} segundos",
    },
    noFavoritesEmptyState: {
      heading: "Esto está un poco vacío",
      content:
        "No se han agregado episodios favoritos todavía. ¡Presiona el corazón dentro de un episodio para agregarlo a tus favoritos!",
    },
  },

  ...demoEs,
}

export default es
