import { fireEvent, render } from '@testing-library/react';
import { Search } from '../Search';
import userEvent from '@testing-library/user-event';

const renderSearch = () => {
  const searchSpy = jest.fn();
  const utils = render(<Search onSearch={searchSpy}/>);

  const getInput = () => utils.queryByPlaceholderText('Search your film');
  const type = (text: string) => userEvent.type(getInput()!, text);
  const pressEnter = () => fireEvent.keyPress(getInput()!, { key: 'Enter', code: 13, charCode: 13 });

  return { utils, getInput, type, pressEnter, searchSpy };
};
describe('Search', function () {
  describe('Search behaviour', function () {
    it('should not call the onChange if the value is less than 3 letters', function () {
      const { type, pressEnter, searchSpy } = renderSearch();

      type('aa');
      pressEnter();

      expect(searchSpy).not.toBeCalled();
    });

    it('should call the onChange if the value is equal 3 letters', function () {
      const { type, pressEnter, searchSpy } = renderSearch();

      type('aaa');
      pressEnter();

      expect(searchSpy).toBeCalled();
    });

    it('should call the onChange if the value is more than 3 letters', function () {
      const { type, pressEnter, searchSpy } = renderSearch();

      type('aaaa');
      pressEnter();

      expect(searchSpy).toBeCalled();
    });
  });
});
