import { Days } from "../model/interfaces";

const UI = {
  EMPTY_STRING: "",
  SPACE_STRING: " ",
  STRING_ZERO: "0",
  DONE: "done",
  LOGIN: {
    HEAD: "Log In",
    ID: "ID",
    PW: "PW",
    UI_LOGIN: "로그인",
    GO_SIGN: "아이디가 없다면? ",
    SIGN: "회원가입",
  },
  WriteSumTsx: {
    TODAY_HEADER: "오늘 하루의",
  },
  WriteDoneBtnTsx: {
    NOTHING: "정말 아무것도 안적으시게요?",
    DONE_STRING: "작성완료",
    MARKS: {
      QEUSTION: "?",
      EXCLAMATION: "!",
    },
  },
  WriteTextAreaTsx: {
    PLACE_HOLDER: "직접 적어보아요",
  },
  DiaryTsx: {
    MONTH: "월",
    DAY: "일",
  },
  NullDiaryTsx: {
    LAST_TODAY_MESSAGE: "작년의 오늘에 쓴 일기가",
    NO_DIARY_YET: "아직 작성한 일기가",
    NONE: "없습니다",
  },
  NavTsx: {
    CONFIRM_LOGOUT: "정말 로그 아웃 하시겠습니까?",
    TODAY_DIARY: "오늘의 일기",
    WRITE_DIARY: "일기 쓰기",
    SEARCH_DIARY: "지난날 검색",
    LOGOUT: "로그아웃",
  },
  IdCheckBtnTsx: {
    CHECK_ID_DUPLE: "아이디 중복 조회",
    STRING_NOT: "not",
    CANT_USE: "사용 불가능",
    CAN_USE: "사용 가능",
  },
  WriteTsx: {
    FEELING: "feeling",
    WEATHER: "weather",
    WEATHER_LEVEL: "weatherLevel",
    FEELING_REASON: "feelingReason",
  },
  PwDivTsx: {
    STRING_UNDER_SIX: "🔒 영문, 숫자, 특수기호 포함 6글자 이상",
    CHECK_PW: "비밀번호 확인",
  },
  IntroTsx: {
    INTRO_P_TEXTS: ["나만 보고", "나만 쓰는", "나만의 일기장"],
    START: "시작하기",
  },
  LastTodayTsx: {
    TITLE: "작년의 오늘",
  },
  MyDiariesTsx: {
    H5_TITLE: "나의 일기들",
    DIARY_LENGTH: 5,
    SCROLL_COUNT: 20,
  },
  RootTsx: {
    HEADER: {
      YUDA: "YuDa",
      SUGGEST_WRITE: "오늘의 일기를 작성해 봐요",
    },
  },
  SignTsx: {
    CHECK_ID: "ID를 확인해주세요",
    ASK_CHECK_ID_DUPLE: "아이디 중복검사를 체크해주세요!",
    ASK_CHECK_PW_DUPLE: "비밀번호 중복 검사를 해주세요",
    H1_TITLE: "회원가입",
    INPUT_LABEL: {
      NAME: "이름",
      ID: "아이디",
      PW: "비밀번호",
      PW_CHECK: "비밀번호 확인",
    },
    PLACE_HOLDER: "한글 사용 불가 및 최소 4자",
    SIGN_DONE: "회원가입 완료",
  },
  SelectedTsx: {
    SUCCESS_ALERT:"일기 작성이 완료되었습니다!",
    FAIL_ALERT: "일기 작성이 실패했습니다!",
    WRITING_DIARY_DONE: "작성 완료!",
  },
  DAYS_OF_WEEK: Object.values(Days),
};

export default UI;
