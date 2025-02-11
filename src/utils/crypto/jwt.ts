import crypto from 'node:crypto';

interface excractedPayload {
    userId: number
}


//prettier-ignore
export const paikyJWTsign = (payolad: {userId: number}, secret: string): string =>{
    const payload = JSON.stringify(payolad)
    const headers = JSON.stringify({ alg: 'HS256', type: 'jwt' });
	const base64payload = Buffer.from(payload, 'utf-8').toString('base64url')
    const base64headers = Buffer.from(headers, 'utf-8').toString('base64url')
	const concat = base64headers + '.' + base64payload;


    const signature = crypto.createHmac('sha256', secret ).update(concat).digest('base64url')
    const token = concat + '.' + signature;
    return token 
}

//prettier-ignore
export const paikyJWTVerify = (token: string, secret: string):number|null =>{

    const tokenNoBearer = token.split(' ')[1]
    
    const base64headers  = tokenNoBearer.split('.')[0]
    const base64payload  = tokenNoBearer.split('.')[1]
    const base6signature  = tokenNoBearer.split('.')[2]


    const concat = base64headers + '.' + base64payload;

    //prettier-ignore
    const veriHash = crypto.createHmac('sha256', secret).update(concat).digest('base64url')
    
    try{
        //$ This function:
        //$ 1. Returns false if the comparison goes wrong and
        //$ 2. Throws an error if one of the buffer is longer than the other.
        const isValid = crypto.timingSafeEqual(Buffer.from(base6signature), Buffer.from(veriHash))
        if(!isValid){
            return null
        }
    }catch(e){
        return null
    }

    const excractedPayload: excractedPayload = JSON.parse(Buffer.from(base64payload, 'base64url').toString('utf-8'))

    const userId = excractedPayload.userId

    return userId
}
