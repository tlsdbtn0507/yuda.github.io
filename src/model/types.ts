export type Dates = {
  date:string,
  day:string,
  month:string
}

export type Contents = {
  title:string,
  body:string
}

export type Img = {
  url:string
}

export type DiaryType = {
  id:number
  diaryTitle:string
  diaryContent:string
  diaryDate:string
  diaryDay:string
  temp:number
  rain:number
  main:string
}

export interface DiarySummary{
  date:Dates,
  content:Contents,
  img:Img 
}

export interface sendObj {
  request:Request
}

export interface toSendDataObj {
  [index:string]:string
}

export interface BtnType {
  onClick: (e: React.FormEvent) => void,
  isIdVal: boolean | string
}