'use server'

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const token = await getPaypalBearerToken()

  if (!token) {
    throw new Error('No se pudo obtener token')
  }
}

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const oauth2url = process.env.PAYPAL_OAUTH_URL ?? ''

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64')

  const headers = new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded')
  headers.append('Authorization', `Basic ${base64Token}`)

  const urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'client_credentials')

  const requestOptions = {
    method: 'POST',
    body: urlencoded,
    headers,
  }

  try {
    const result = await fetch(oauth2url, requestOptions).then((r) => r.json())
    return result.access_token
  } catch (error) {
    return null
  }
}
