import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import React from "react";
import DiaryPreview from "../diaryPreview";
import PreviewWrapper from "../previewWrapper";
import TEST from "../../../../constants/testConstants";

const { DUMMI_DIARY_DATA } = TEST;

describe("DiaryPreview", () => {
  test("DiaryPreview컴포넌트가 잘 나올까요?", () => {
    
    render(<DiaryPreview diaryDetails={DUMMI_DIARY_DATA} />);
    
    const fullText = `${DUMMI_DIARY_DATA.diaryDate.replaceAll("-", " . ")} ${String(DUMMI_DIARY_DATA.dayOfWeek)}`;
    const isFullTextExist = screen.getByText(fullText,{exact: false});

    expect(isFullTextExist).toBeInTheDocument();

  });

  test("PreviewWrapper가 버튼들과 내용을 잘 불러올까요?", () => {
    render(<PreviewWrapper diaryPreviewContent={DUMMI_DIARY_DATA} />);

    const sideBtns = screen.getAllByTestId("sideBtns");
    expect(sideBtns).toHaveLength(2);

    const previewWrapperContent = screen.getByText("완전 행복했던 하루", { exact: true });
    expect(previewWrapperContent).toBeInTheDocument();

    const carouselBtns = screen.getAllByTestId("carouselBtns");
    expect(carouselBtns).toHaveLength(4);
  })
  
})

describe("PreviewWrapper의 버튼이 제대로 작동할까요?",()=> {

  const renderAndClickRight = (times: number, isRight: boolean) => {
    render(<PreviewWrapper diaryPreviewContent={DUMMI_DIARY_DATA} />);
    const sideBtns = screen.getAllByTestId("sideBtns");
    for (let i = 0; i < times; i++) {
      fireEvent.click(isRight ? sideBtns[1] : sideBtns[0]);
    }
  };

  test("우측으로 1번", () => {
    renderAndClickRight(1,true);
    expect(screen.getByText("너무 화창했던 하루")).toBeInTheDocument();
  });

  test("우측으로 2번", () => {
    renderAndClickRight(2,true);
    expect(screen.getByText("테스트")).toBeInTheDocument();
  });

  test("우측으로 3번", () => {
    renderAndClickRight(3,true);
    expect(screen.getByText("완전 행복했던 하루")).toBeInTheDocument();
  });

  test("좌측으로 1번", () => {
    renderAndClickRight(1,false);
    expect(screen.getByText("테스트")).toBeInTheDocument();
  });

  test("좌측으로 2번", () => {
    renderAndClickRight(2,false);
    expect(screen.getByText("너무 화창했던 하루")).toBeInTheDocument();
  });

  test("좌측으로 3번", () => {
    renderAndClickRight(3,false);
    expect(screen.getByText("완전 행복했던 하루")).toBeInTheDocument();
  });
})