import { handleSubmitRegister } from "../components/SignUp"


describe('handleSubmitRegister', () => {

    // test one filed empty
    it('should return an error if username is empty', async () => {
        const expectedResult = {
            text: 'Please complete all fields',
            status: false,
        };

        const actualResult = await handleSubmitRegister('', '123', '123');

        expect(actualResult).toEqual(expectedResult);
    });
    it('should return an error if password is empty', async () => {
        const expectedResult = {
            text: 'Please complete all fields',
            status: false,
        };

        const actualResult = await handleSubmitRegister('123', '', '123');

        expect(actualResult).toEqual(expectedResult);
    });
    it('should return an error if repassword is empty', async () => {
        const expectedResult = {
            text: 'Please complete all fields',
            status: false,
        };

        const actualResult = await handleSubmitRegister('123', '123', '');

        expect(actualResult).toEqual(expectedResult);
    });

    // check valid input
    it('should return an error if username contain space', async () => {
        const expectedResult = {
            text: 'Username must not include space',
            status: false,
        };

        const actualResult = await handleSubmitRegister('Tuan Anh', '123', '123');

        expect(actualResult).toEqual(expectedResult);
    });
    it('should return an error if password and repassword mismatch', async () => {
        const expectedResult = {
            text: 'Password mismatch',
            status: false,
        };

        const actualResult = await handleSubmitRegister('TuanAnh', '1234', '123');
 
        expect(actualResult).toEqual(expectedResult);
    });
    it('should return an error if password length less than 3 characters', async () => {
        const expectedResult = {
            text: 'Password must be at least 3 characters',
            status: false,
        };

        const actualResult = await handleSubmitRegister('TuanAnh', '12', '12');
 
        expect(actualResult).toEqual(expectedResult);
    });


    // check User existed
    it('should return an error if user existed', async () => {
        const expectedResult = {
            text: 'User existed',
            status: false,
        };

        const actualResult = await handleSubmitRegister('tuananh', '123', '123');
 
        expect(actualResult).toEqual(expectedResult);
    });
    
    
    // create user successfully
    it('User Created Successfully', async () => {
        const expectedResult = {
            text: 'Create New User Successfully',
            status: true,
        };

        const actualResult = await handleSubmitRegister('tienanh', '123', '123');
 
        expect(actualResult).toEqual(expectedResult);
    });

})  
