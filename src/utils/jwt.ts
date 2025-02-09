import crypto from 'node:crypto';

export const paikyJWTsign = (payolad: {userId: number}, secret: string): string =>{

    const payload = JSON.stringify(payolad)
    const headers = JSON.stringify({ alg: 'HS256', type: 'jwt' });
	const base64Payload = Buffer.from(payload).toString('base64url')
    const base64headers = Buffer.from(headers).toString('base64url')
	const concat = base64headers + '.' + base64Payload;


    const signature = crypto.createHmac('sha256', secret ).update(concat).digest('base64url')
    const token = concat + '.' + signature;
    return token 
}