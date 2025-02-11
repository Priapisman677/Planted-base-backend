
import { cometJWTsign, cometJWTVerify } from './jwt.js'
import { cometHash, cometCompare, cometGetRandomSalt } from './salt-password.js'

export default {
    cometJWTsign,
    cometJWTVerify,
    cometHash,
    cometCompare,
    cometGetRandomSalt
}