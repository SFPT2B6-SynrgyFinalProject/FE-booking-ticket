import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from '../footer';
jest.mock("../../assets/images/logo.png", () => ({
  default: "mocked-logo-path",
}));


describe('Footer', () => {
  test('renders footer elements with correct content and links', () => {
    render(<Footer />);

    // Memastikan judul "Let's Work Together" dirender
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();



    

    // Memastikan link "Privacy Policies" dirender dengan href yang sesuai
    const privacyPoliciesLink = screen.getByText('Privacy Policies');
    expect(privacyPoliciesLink).toBeInTheDocument();
   

    // Memastikan link "Connect With Us With Social Media" dirender dengan href yang sesuai
    const socialMediaLink = screen.getByText('Connect With Us With Social Media');
    expect(socialMediaLink).toBeInTheDocument();
    

    
    
  });
});
