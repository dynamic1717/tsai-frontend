export type Message = {
  role: 'user' | 'bot'
  content: string
  timestamp: number
}

export type BaseResponse<T> = {
  data: T
  status: number
  error: string
}

export type ChatResponse = {
  response: string
  timestamp: number
}
