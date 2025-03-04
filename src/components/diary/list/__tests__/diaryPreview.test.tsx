import React from "react";
import { render, screen } from "@testing-library/react";
import DiaryPreview from "../diaryPreview";
import PreviewWrapper from "../previewWrapper";

describe("DiaryPreview", () => {
  test("DiaryPreview컴포넌트가 잘 나올까요?", () => {
    render(<DiaryPreview />);
    const isComponentHasClass = screen.getByTestId("diaryPreview");

    const dateOfDiary = screen.getByText(/\d{4} \. \d{2} \. \d{2}/);

    expect(isComponentHasClass).toBeInTheDocument();
    expect(dateOfDiary).toBeInTheDocument();

  });
  test("DiaryPreview컴포넌트가 자식 컴포넌트를 잘 불러올까요?", () => {
    render(<DiaryPreview />);
    const stringTobeExpected = screen.getByTestId("diaryPreviewWrapper");
    
    expect(stringTobeExpected).toBeInTheDocument();
  })

  test("PreviewWrapper가 버튼들과 내용을 잘 불러올까요?", () => {
    render(<PreviewWrapper />);

    const sideBtns = screen.getAllByTestId("sideBtns");
    expect(sideBtns).toHaveLength(2);

    const previewWrapperContent = screen.getByText("완전 더웠던 하루", { exact: false });
    expect(previewWrapperContent).toBeInTheDocument();

    const carouselBtns = screen.getAllByTestId("carouselBtns");
    expect(carouselBtns).toHaveLength(4);
  })
})