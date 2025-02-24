const en = {
  // Common and generics
  common: {
    ok: "OK",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
    duration: "Duration: ",
    schedule: "Schedule: ",
    bookNow: "Book Now",
    currency: "$",
  },
  error: {
    generic: "An error occurred",
    network: "Network error",
    validation: "Validation error",
    unauthorized: "Unauthorized",
    notFound: "Not found",
    invalidEmail: "Invalid email",
    invalidPassword: "Invalid password",
    invalidCredentials: "Invalid credentials",
    required: "This field is required",
    minLength: "Minimum length not met",
    maxLength: "Maximum length exceeded",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  googleSignInButton: {
    error: {
      cancelled: "Canceled",
      inProgress: "In progress",
      playServicesNotAvailable: "Play Services not available",
      signInRequired: "Sign in required",
      other: "Something went wrong, please try again.",
    },
  },

  // Screens
  landingScreen: {
    header: "Welcome",
    title: "Welcome to {{brand}}!",
    lookingForARoom: "Looking to book a room?",
    bookNow: "Book now!",
    haveAnAccount: "Already have an account?",
    signIn: "Sign in",
    notHaveAnAccount: "First time here?",
    signUp: "Create an account",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  loginScreen: {
    logIn: "Sign In",
    enterDetails: "Access your account by entering your credentials below.",
    emailFieldLabel: "Email Address",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email",
    passwordFieldPlaceholder: "Enter your password",
    tapToLogIn: "Sign In",
    tapToLogInWithGoogle: "Continue with Google",
    hint: "Need help? Use your registered email and password.",
    errors: {
      emailRequired: "Email is required",
      emailMinimunCharacters: "must be at least 8 characters",
      emailInvalid: "must be a valid email address",
      passwordRequired: "Password is required",
      passwordTooShort: "Password must be at least 12 characters",
      passwordInvalid: "Password must contain only letters and numbers",
      loginFailed: "Login failed. Please check your credentials and try again.",
    },
    or: "Or you can continue with",
  },
  registrationScreen: {
    signUp: "Create Account",
    enterDetails: "Enter your details below to create your account.",
    emailFieldLabel: "Email Address",
    passwordFieldLabel: "Password",
    confirmPasswordFieldLabel: "Confirm Password",
    emailFieldPlaceholder: "Enter your email",
    passwordFieldPlaceholder: "Enter your password",
    confirmPasswordFieldPlaceholder: "Confirm your password",
    tapToSignUp: "Create Account",
    errors: {
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address",
      passwordRequired: "Password is required",
      passwordTooShort: "Password must be at least 12 characters",
      passwordInvalid: "Password must contain only letters and numbers",
      passwordsDontMatch: "Passwords don't match",
      signUpFailed: "Registration failed. Please try again.",
      confirmPasswordRequired: "Please confirm your password",
    },
    or: "Or you can continue with",
    tapToSignUpWithGoogle: "Continue with Google",
  },
  homeScreen: {
    title: "Home",
    welcome: "Welcome",
    searchPlaceholder: "Search...",
    activities: "Activities",
    popularDestinations: "Popular Destinations",
    recommendations: "Recommendations",
  },
  profileScreen: {
    title: "Profile",
    sectionPersonalDataTitle: "Personal Data",
    sectionPreferencesTitle: "Preferences",
    sectionActionsTitle: "Actions",
    darkModeTitle: "Dark Mode",
    activateDarkMode: "Activate Dark Mode",
    deactivateDarkMode: "Deactivate Dark Mode",
    displayNameLabel: "Display Name",
    errors: {
      updateFailed: "Failed to update display name. Please try again.",
    },
  },
  activitiesScreen: {
    title: "Activities",
    subtitle: "Inside hotel",
    city: "The city",
  },
  registerSuccessScreen: {
    heading: "Account Created Successfully! ✅",
    content:
      "Your account has been created. Please check your email to verify your account before logging in.",
    button: "Go to Login",
  },
  exploreScreen: {
    title: "Explore",
    subtitle: "Discover our facilities and services",
    searchPlaceholder: "Search activities, services...",
    activities: "Activities",
    popularDestinations: "Popular Destinations",
    recommendations: "Recommendations",
  },

  // Navigators
  homeNavigator: {
    homeTab: "Home",
    profileTab: "Profile",
    activitiesTab: "Activities",
  },

  // To delete
  demoCommunityScreen: {
    title: "Connect with the community",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoShowroomScreen: {
    jumpStart: "Components to jump start your project!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "Debug",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "Send to Reactotron",
    reportBugs: "Report Bugs",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: "React Native Radio episodes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },
  bookingScreen: {
    title: "Book a Room",
    subtitle: "Select dates and number of guests",
    selectDates: "Select dates",
    numberOfGuests: "Number of guests",
    bookingSummary: "Booking Summary",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    notSelected: "Not selected",
    continueBooking: "Continue with Booking",
  },
  checkInScreen: {
    title: "Online Check-in",
    subtitle: "Complete the form to speed up your check-in process",
    reservationCode: "Reservation Code",
    lastName: "Last Name",
    email: "Email",
    estimatedArrival: "Estimated Arrival Time",
    importantInfo: "Important Information",
    importantInfoDetails: [
      "Check-in is available from 3:00 PM",
      "Valid ID is required",
      "Credit card is required for security deposit",
    ],
    completeCheckIn: "Complete Check-in",
  },
  activityDetailScreen: {
    topBarTitle: "Activity Details",
    resort: {
      title: "Resort & Spa",
      description: "Enjoy a unique experience in our luxury facilities",
    },
    spa: {
      title: "Spa & Wellness",
      description: "An oasis of relaxation and wellness",
    },
    gastronomy: {
      title: "Gastronomy",
      description: "Explore our culinary offerings",
    },
    activities: {
      title: "Activities",
      description: "Plan your day with our activities",
    },
    timeLabel: "Duration",
    scheduleLabel: "Schedule",
    price: "Price: {{currency}}{{value}}",
    bookActivity: "Book {{activity}}",
  },
}

export type Translations = {
  common: typeof en.common
  error: typeof en.error
  emptyStateComponent: typeof en.emptyStateComponent
  googleSignInButton: typeof en.googleSignInButton
  landingScreen: typeof en.landingScreen
  errorScreen: typeof en.errorScreen
  loginScreen: typeof en.loginScreen
  registrationScreen: typeof en.registrationScreen
  homeScreen: typeof en.homeScreen
  profileScreen: typeof en.profileScreen
  activitiesScreen: typeof en.activitiesScreen
  registerSuccessScreen: typeof en.registerSuccessScreen
  exploreScreen: typeof en.exploreScreen
  bookingScreen: typeof en.bookingScreen
  checkInScreen: typeof en.checkInScreen
  activityDetailScreen: typeof en.activityDetailScreen
  homeNavigator: typeof en.homeNavigator
  // Demo screens son opcionales
  demoCommunityScreen?: typeof en.demoCommunityScreen
  demoShowroomScreen?: typeof en.demoShowroomScreen
  demoDebugScreen?: typeof en.demoDebugScreen
  demoPodcastListScreen?: typeof en.demoPodcastListScreen
}

export default en
