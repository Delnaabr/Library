//  import {Register} from '../../../pages/utils/apis'
// import Login from '../../Login/page'
// import { render, screen } from "@testing-library/react";

// describe("user api", () => {
//   it("check user api is correct", () => {
//     expect(Register).toBe("http://localhost:3000/register");
//   });
// });

// describe("test the login form", () => {
//   it("Login renders correctly", () => {
//     render(<Login />);
//     const textElement=screen.getByText(/login here/i);
//     expect(textElement).toBeInTheDocument();
//   });

//   it("Check if button UI is correct", async () => {
//     render(<Login />);
//     const buttonList = await screen.findAllByRole("button");
//     expect(buttonList).toHaveLength(3);
//   });

//   it("Check field validation", () => {
//     render(<Login />);
//     const name = screen.getByPlaceholderText("username");
//     userEvent.type(name, "delna");
//     expect(name.value).toMatch("delna");
//   });

//   it("Check if username and password fields are empty", () => {
//     // render(<Login />);
//     const name = screen.getByPlaceholderText("username");
//     const password = screen.getByPlaceholderText("Password");
//     expect(name.value).toBe("");
//     expect(password.value).toBe("");
//   });
// });


















// // import React from 'react';
// // import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// // import '@testing-library/jest-dom/extend-expect'; // For additional matchers like toBeInTheDocument
// // import Login from '../page'

// // describe('Login component', () => {
// //   const useRouter = jest.spyOn(require('next/router'), 'useRouter');
// //   useRouter.mockImplementation(() => ({
// //     push: jest.fn(),
// //   }));

// //   it('renders login form', () => {
// //     render(<Login />);

// //     expect(screen.getByText('Login here...')).toBeInTheDocument();
// //     expect(screen.getByLabelText('Username')).toBeInTheDocument();
// //     expect(screen.getByLabelText('Password')).toBeInTheDocument();
// //     expect(screen.getByText('Login')).toBeInTheDocument();
// //   });


// //   it('handles login with incorrect credentials', async () => {
// //     render(<Login />);

// //     global.fetch = jest.fn().mockResolvedValue({
// //       json: () => [],
// //     });

// //     fireEvent.change(screen.getByLabelText('Username'), {
// //       target: { value: 'invalidUser' },
// //     });
// //     fireEvent.change(screen.getByLabelText('Password'), {
// //       target: { value: 'invalidPassword' },
// //     });

// //     fireEvent.click(screen.getByText('Login'));

// //     await waitFor(() =>
// //       expect(
// //         screen.getByText('Login failed. Incorrect username or password.')
// //       ).toBeInTheDocument()
// //     );

// //     expect(useRouter().push).not.toHaveBeenCalled();
// //   });
// // });