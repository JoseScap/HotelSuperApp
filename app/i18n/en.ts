import demoEn from "./demo-en"

const en = {
  // Common and generics
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
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
    },
    or: "Or you can continue with",
    tapToSignUpWithGoogle: "Continue with Google",
  },
  homeScreen: {
    title: "Home",
  },
  profileScreen: {
    header: {
      title: "My Profile",
    },
    userProfile: {
      status: {
        goldMember: "Gold Member",
      },
    },
    settings: {
      title: "Settings",
      personalInfo: "Personal Information",
      paymentMethods: "Payment Methods",
      language: {
        title: "Language",
        spanish: "Spanish",
        english: "English",
      },
      notifications: "Notifications",
      privacySecurity: "Privacy & Security",
      helpCenter: "Help Center",
      logout: "Log out",
    },
    bookingHistory: {
      grandHotel: "Grand Hotel",
      cityResort: "City Resort",
      oceanView: "Ocean View",
      status: {
        completed: "Completed",
        upcoming: "Upcoming",
        cancelled: "Cancelled",
      },
    },
    appVersion: "App version: {{version}}",
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

  // Navigators
  demoNavigator: {
    componentsTab: "Components",
    debugTab: "Debug",
    communityTab: "Community",
    podcastListTab: "Podcast",
  },
  homeNavigator: {
    homeTab: "Home",
    profileTab: "Profile",
    paymentsTab: "Payments",
    exploreTab: "Explore",
  },

  paymentsScreen: {
    header: {
      title: "Payments",
      subtitle: "Manage your payment methods and bills",
    },
    account: {
      title: "Your Account",
      summary: "Account Summary",
      totalBalance: "Total Balance",
      paymentStatus: "Payment Status",
      paid: "Paid",
    },
    paymentMethods: {
      title: "Payment Methods",
      cardEnding: "VISA ending in {{number}}",
      default: "Default",
      addNew: "Add payment method",
    },
    recentExpenses: {
      title: "Recent Expenses",
    },
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

  exploreScreen: {
    header: {
      title: "Explore",
      searchPlaceholder: "Search experiences...",
    },
    categories: {
      title: "Explore our hotel",
      all: "All",
      amenities: "Amenities",
      facilities: "Facilities",
      services: "Services",
    },
    sections: {
      featured: {
        title: "Featured",
        viewAll: "View all",
      },
      allFacilities: {
        title: "All Facilities",
        filter: "Filter",
      },
    },
    items: {
      pool: {
        title: "Swimming Pool",
        description: "Enjoy our Olympic-sized pool with heated water.",
      },
      gym: {
        title: "Gym",
        description: "State-of-the-art equipment and trainers available.",
      },
      spa: {
        title: "Spa Services",
        description: "Relax with our professional massages and wellness services.",
      },
      restaurant: {
        title: "Restaurant",
        description: "Try our gourmet menu with international cuisine.",
      },
      businessCenter: {
        title: "Business Center",
        description: "Work comfortably with high-speed internet and printing services.",
      },
      roomService: {
        title: "Room Service",
        description: "24/7 room service available for all guests.",
      },
    },
  },

  bookingConfirmationScreen: {
    success: {
      title: "Booking confirmed!",
      subtitle:
        "Your reservation has been successfully processed. You'll find your booking details below.",
    },
    bookingDetails: {
      hotelName: "Hotel Sunshine Resort",
      location: "Cancun, Mexico",
      dates: {
        label: "Check-in/out dates",
        value: "October 12 - October 15, 2023",
      },
      room: {
        label: "Room",
        value: "Deluxe Suite with Ocean View",
      },
      guests: {
        label: "Guests",
        value: "2 Adults",
      },
      bookingId: {
        label: "Booking ID",
        value: "#BOOK-28547",
      },
    },
    buttons: {
      returnHome: "Return to home",
      share: "Share booking details",
    },
    shareMessage: "I just booked a room at our hotel! My booking reference is: {{bookingId}}",
  },

  ...demoEn,
} as const

export default en
