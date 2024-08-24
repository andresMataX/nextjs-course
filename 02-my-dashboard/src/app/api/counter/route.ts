import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  return NextResponse.json({ count: 100 })
}
