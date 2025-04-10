import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

import React from "react";
import DiaryPreview from "../diaryPreview";
import PreviewWrapper from "../previewWrapper";
import TEST from "../../../../constants/testConstants";

const { DUMMI_DIARY_DATA } = TEST;
const TEST_HAPPY_DAY = "완전 행복했던 하루";
const TEST_SUNNY_DAY = "너무 화창했던 하루";
const TEST_SPECIFIC_DAY = ["1.8도", "47%", "0mm", "맑음"];

afterEach(() => {
  cleanup(); // 테스트 간 DOM 정리
});

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

    const previewWrapperContent = screen.getByText(TEST_HAPPY_DAY, { exact: true });
    expect(previewWrapperContent).toBeInTheDocument();

    const carouselBtns = screen.getAllByTestId("carouselBtns");
    expect(carouselBtns).toHaveLength(3);
  })
  
})

describe("PreviewWrapper의 버튼이 제대로 작동할까요?",()=> {

  const renderAndClickRight = async (times: number, isRight: boolean) => {
    render(<PreviewWrapper diaryPreviewContent={DUMMI_DIARY_DATA} />);
    const sideBtns = screen.getAllByTestId("sideBtns");
    for (let i = 0; i < times; i++) {
      fireEvent.click(isRight ? sideBtns[1] : sideBtns[0]);
      await new Promise((r) => setTimeout(r, 500));
    }
  };

 test("우측으로 1번", async () => {
    renderAndClickRight(1, true);
    const result = await screen.findByText(TEST_SUNNY_DAY, { exact: true });
    expect(result).toBeInTheDocument();
  });

  test("우측으로 2번", async () => {
    renderAndClickRight(2, true);
    
    TEST_SPECIFIC_DAY.forEach(async (text) => {
      const result = await screen.findByText(text, { exact: false });
      expect(result).toBeInTheDocument();
    });
  });

  test("우측으로 3번", async () => {
    renderAndClickRight(3, true);
    const result = await screen.findByText(TEST_HAPPY_DAY, { exact: true });
    expect(result).toBeInTheDocument();
  });

  test("좌측으로 1번", () => {
    renderAndClickRight(1,false);
    TEST_SPECIFIC_DAY.forEach(async (text) => {
      const result = await screen.findByText(text, { exact: false });
      expect(result).toBeInTheDocument();
    });
  });

  test("좌측으로 2번", async () => {
    renderAndClickRight(2, false);
    
    await waitFor(() => {
      expect(screen.getByText(TEST_SUNNY_DAY)).toBeInTheDocument()
    })
  });

  test("좌측으로 3번", async () => {
    renderAndClickRight(3,false);
    const result = await screen.findByText(TEST_HAPPY_DAY);
    expect(result).toBeInTheDocument();
  });
})