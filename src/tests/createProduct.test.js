import { handleCreateProduct } from "../components/CreateProduct";

describe('handleCreateProduct', () => {

    // test one filed empty
    it('should return an error if name is empty', async () => {
        const expectedResult = 'Please enter complete information';

        const actualResult = await handleCreateProduct('', 123, 34, 'imageProduct.jpg');

        expect(actualResult).toEqual(expectedResult);
    });
    it('should return an error if price is empty', async () => {
        const expectedResult = 'Please enter complete information';

        const actualResult = await handleCreateProduct('Onitsuka', '', 34, 'imageProduct.jpg');

        expect(actualResult).toEqual(expectedResult);
    });
    it('should return an error if size is empty', async () => {
        const expectedResult = 'Please enter complete information';

        const actualResult = await handleCreateProduct('Onitsuka', 123, '', 'imageProduct.jpg');

        expect(actualResult).toEqual(expectedResult);
    });
    it('should return an error if image is empty', async () => {
        const expectedResult = 'Please enter complete information';

        const actualResult = await handleCreateProduct('Onitsuka', 123, 34, '');

        expect(actualResult).toEqual(expectedResult);
    });


    // check valid fields
    it('should return an error if size must not be less than 36 or greater than 45', async () => {
        const expectedResult = 'Size must be between 36 and 45';

        const actualResult = await handleCreateProduct('Prestiger Limber UD Nippon', 123, 32, 'imageProduct.jpg');

        expect(actualResult).toEqual(expectedResult);
    });
    it('should return an error if product existed', async () => {
        const expectedResult = 'Product Existed';

        const actualResult = await handleCreateProduct('Prestiger Limber UD Nippon', 123, 39, 'imageProduct.jpg');

        expect(actualResult).toEqual(expectedResult);
    });
    it('Create new Product successfully', async () => {
        const expectedResult = 'Add new product Successfully';

        const actualResult = await handleCreateProduct('Onitsuka New Product', 2750000, 39, 'imageProduct.jpg');

        expect(actualResult).toEqual(expectedResult);
    });
}) 