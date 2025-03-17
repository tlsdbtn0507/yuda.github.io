import { feelingPreviewMaker } from "../util";

describe("util파일의 함수들 테스트", () => {
  test("feelingPreviewMaker함수가 올바른 문자열을 뱉는가?", () => {
    expect(feelingPreviewMaker({ ment: '완전 행복', level: 1 })).toBe("별로 였던 하루");
    expect(feelingPreviewMaker({ ment: '그냥 그랬어', level: 2 })).toBe("그냥 그랬던 하루");
    expect(feelingPreviewMaker({ ment: '완전 행복', level: 3 })).toBe("완전 행복했던 하루");
  });
});