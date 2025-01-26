const APIS = {
  STRING_PWCHECK: "pwCheck",
  IS_USER_LOGINED_STR: "isUserLogin",
  IS_USER_LOGINED_TRUE: true,
  IS_USER_LOGINED_FALSE: false,
  NUM_ZERO: 0,
  TIMEOUT: {
    ANIMATION: {
      FIRST: 1500,
      SECOND: 2000,
      THIRD: 2500,
      AT_ROOT: 800,
    },
  },
  ROUTES: {
    ROOT: "/",
    LOGIN: "/login",
    SIGN: "/sign",
    MAIN: "/main",
  },
  QUERIES: {
    DIARIES: "diaries",
    LOGOUT: "logout",
  },
  DATA: {
    FETCHING: "fetching",
  },
  DATE_LITERAL_METHODS: ["getFullYear", "getMonth", "getDate"] as const,
};

export default APIS;
