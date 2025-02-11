
import { paikyJWTsign, paikyJWTVerify } from './jwt.js'
import { paikyHash, paikyCompare, paikyGetRandomSalt } from './salt-password.js'

export default {
    paikyJWTsign,
    paikyJWTVerify,
    paikyHash,
    paikyCompare,
    paikyGetRandomSalt
}