import { handleSubmitLogin } from "../components/SignIn"


describe('handleSubmitLogin', () => {

    // test one filed empty
    it('should return an error if username is empty', async () => {
        const expectedResult = {
            text: 'Please complete all fields',
            status: false,
        };

        const actualResult = await handleSubmitLogin('', '123');

        expect(actualResult).toEqual(expectedResult);
    });
    it('should return an error if password is empty', async () => {
        const expectedResult = {
            text: 'Please complete all fields',
            status: false,
        };

        const actualResult = await handleSubmitLogin('123', '');

        expect(actualResult).toEqual(expectedResult);
    });


    // check valid input fields
    it('should return an error if username include space', async () => {
        const expectedResult = {
            text: 'Username must not include space',
            status: false,
        };

        const actualResult = await handleSubmitLogin('tuan anh', '123');

        expect(actualResult).toEqual(expectedResult);
    });
    it('should return an error if password length less than 3 characters', async () => {
        const expectedResult = {
            text: 'Password must be at least 3 characters',
            status: false,
        };

        const actualResult = await handleSubmitLogin('tuananh', '12');

        expect(actualResult).toEqual(expectedResult);
    });

    // check account
    it('should return an error if wrong password', async () => {
        const expectedResult = {
            text: 'Wrong password',
            status: false,
        };

        const actualResult = await handleSubmitLogin('tuananh', '1234');

        expect(actualResult).toEqual(expectedResult);
    }); 
    it('should return an error if cannot found user', async () => {
        const expectedResult = {
            text: 'Not found user',
            status: false,
        };

        const actualResult = await handleSubmitLogin('tuananh12', '123');

        expect(actualResult).toEqual(expectedResult);
    }); 
    it('login successfully', async () => {
        const expectedResult = {
            text: 'Login successfully',
            status: true,
        };

        const actualResult = await handleSubmitLogin('tuananh', '123');

        expect(actualResult).toEqual(expectedResult);
    });


}) 