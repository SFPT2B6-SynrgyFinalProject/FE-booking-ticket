// // istanbul ignore file
// // HeaderSearchItem.test.tsx
// import { render, fireEvent, getByPlaceholderText, getByText } from '@testing-library/react';
// import HeaderSearchItem, { OptionPersonAgeType } from '../addPerson';

// describe('HeaderSearchItem', () => {
//   const optionPersonAgeUser: OptionPersonAgeType = {
//     bayi: 1,
//     anak: 2,
//     dewasa: 3,
//   };

//   const handleOptionPersonUser = jest.fn();

//   test('renders HeaderSearchItem component', () => {
//     const { container } = render(
//       <HeaderSearchItem
//         optionPersonAgeUser={optionPersonAgeUser}
//         handleOptionPersonUser={handleOptionPersonUser}
//       />
//     );
//     const inputElement = getByPlaceholderText(container, 'Passenger');
//     expect(inputElement).toBeTruthy();
//   });

//   test('clicking on input should toggle CounterOptions', () => {
//     const { container } = render(
//       <HeaderSearchItem
//         optionPersonAgeUser={optionPersonAgeUser}
//         handleOptionPersonUser={handleOptionPersonUser}
//       />
//     );
//     const inputElement = getByPlaceholderText(container, 'Passenger');
//     fireEvent.click(inputElement);
//     expect(handleOptionPersonUser).toHaveBeenCalledTimes(0); // Assuming the counter options don't immediately trigger the callback
//     const dewasaCounter = getByText(container, '3');
//     fireEvent.click(dewasaCounter); // Assuming clicking on the counter will not trigger the callback here
//     expect(handleOptionPersonUser).toHaveBeenCalledTimes(0);
//   });
// });

