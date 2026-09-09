import {formatCurrency} from'../scripts/utils/money.js';

describe('test suite : format currency ',() => {
    it('converts cents to dollars and formats with two decimal places',() => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('converts 0 cents to dollars and formats with two decimal places',() => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('converts negative cents to dollars and formats with two decimal places',() => {
        expect(formatCurrency(-500)).toEqual('-5.00');
    });
    it('converts decimal cents to dollars and formats with two decimal places',() => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});