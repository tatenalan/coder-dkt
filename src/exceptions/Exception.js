

class Exception extends Error{
    constructor(error, description, message){
        super();
        this.error = error;
        this.name = 'Exception';
        this.description = description;
        this.message = message;
    }
}
  export default Exception