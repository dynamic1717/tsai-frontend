import { PUBLIC_SERVER_URL } from '$env/static/public'
import type { BaseResponse, ChatResponse } from './types'

const serverUrl = PUBLIC_SERVER_URL

export const sendMessage = async (
  message: string
): Promise<BaseResponse<ChatResponse>> => {
  const response = await fetch(`${serverUrl}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })

  if (!response.ok) {
    throw new Error('Request failed')
  }

  const data = (await response.json()) as BaseResponse<ChatResponse>
  return data
}
