export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public role?: string,
        public google?: string, 
        public img?: string,
        public uid?: string
    ){
        
    }
}