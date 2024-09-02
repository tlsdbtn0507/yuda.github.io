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

export interface LogoutReturnType {
  message: string,
  result: boolean
}

export interface NavProps{
  onDiaryClick: () => void
}

export interface WriteDiaryFeeling{
  ment: string
  level: number
}

export const FEELINGS:WriteDiaryFeeling[] = [
    {
      ment: '완전 행복!',
      level:3
    },
    {
      ment: '그냥 그랬어',
      level:2
    },
    {
      ment: '별로..',
      level:1
    },
]

export interface WriteDiary {
  feeling: { ment: string, level: number },
  feelingReason: string,
}