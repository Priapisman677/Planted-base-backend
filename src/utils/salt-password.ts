//% I will use PBKDF2 Instead of the regular " crypto.createHash". Pbkdf 2 allows to hash thousands of times making brute force attacks take a lot more time.
/// - `100000` → The number of iterations (higher = more secure but slower).
/// - `64` → Output key length (you can change this).
/// - `'sha256'` → Hashing algorithm (PBKDF2 can use SHA-256, SHA-512, etc.).


import crypto from 'node:crypto';

export const paikyGetRandomSalt = ()=>{
    return crypto.randomBytes(16).toString('hex')
}


export const paikyHash = (password: string, salt: string): string => {
    console.time('1')
	const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha-256').toString('hex') //$ Output hex to be stored.
    console.timeEnd('1')
	return hash;
};

export const paikyCompare = (password: string, salt: string, storedHash: string): Boolean => {
	//$ Here I'm basically a recycling the function above.
	const bufferFromInboundPass = Buffer.from(paikyHash(password, salt), 'hex');
    const bufferFromStoredHash = Buffer.from(storedHash, 'hex')

    if (bufferFromInboundPass.length !== bufferFromStoredHash.length){
        return false //$ The first step is to compare the lengths for even more safety.
    }

     return crypto.timingSafeEqual(bufferFromInboundPass, bufferFromStoredHash) 
         
};
