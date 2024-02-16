import * as bcrypt from 'bcrypt'
// const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


export function encodedePassword(userPass: string){
    const saltRounds = bcrypt.genSaltSync();
return bcrypt.hashSync(userPass,saltRounds)
}

