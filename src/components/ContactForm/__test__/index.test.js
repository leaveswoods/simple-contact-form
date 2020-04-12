/* eslint-disable react/jsx-props-no-spreading */
// import dependencies
import * as React from "react";
// import * as React-testing methods
import { render, fireEvent, waitFor } from "@testing-library/react";
// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

import ContactForm from "../index";

describe("Contact Form", () => {
  describe("Title", () => {
    it("should render title if provided title text", () => {
      const mockCallback = jest.fn();
      const { asFragment } = render(
        <ContactForm
          title="Contact us now"
          fields={["nameGroup", "email", "phone", "message"]}
          onSubmit={mockCallback}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe("Fields", () => {
    it("should render all fields", () => {
      const mockCallback = jest.fn();

      const { asFragment } = render(
        <ContactForm
          fields={["nameGroup", "email", "phone", "message"]}
          onSubmit={mockCallback}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("should only render specified fields", () => {
      const mockCallback = jest.fn();

      const { asFragment } = render(
        <ContactForm
          fields={["nameGroup", "email", "message"]}
          onSubmit={mockCallback}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("should prompt error message if required fields are empty", async () => {
      const mockCallback = jest.fn();

      const { getAllByTestId, getByText } = render(
        <ContactForm
          fields={[
            { type: "nameGroup", required: true },
            { type: "phone", required: true },
            { type: "email", required: true },
            { type: "message", required: true },
          ]}
          onSubmit={mockCallback}
          submitButtonProps={{
            text: "Submit",
          }}
        />
      );
      fireEvent.click(getByText("Submit"));
      expect(getAllByTestId("form_field_error_message")).toMatchSnapshot();
    });

    it("should display loader when loading is true", () => {
      const mockCallback = jest.fn();
      const { getByTestId } = render(
        <ContactForm
          fields={[
            { type: "nameGroup", required: true },
            { type: "phone", required: true },
            { type: "email", required: true },
            { type: "message", required: true },
          ]}
          onSubmit={mockCallback}
          loading
        />
      );
      expect(getByTestId("btn_loader")).toMatchSnapshot();
    });
  }); // Fields

  describe("Alert", () => {
    it("should show alert if have alertMessageProps", () => {
      const mockCallback = jest.fn();
      const props = {
        fields: [
          { type: "nameGroup", required: true },
          { type: "phone", required: true },
          { type: "email", required: true },
          { type: "message", required: true },
        ],
        onSubmit: mockCallback,
        alertMessageProps: {
          type: "",
          message: "",
        },
      };
      const { queryByTestId, rerender } = render(<ContactForm {...props} />);
      expect(queryByTestId("form_alert")).not.toBeInTheDocument();

      props.alertMessageProps = {
        type: "success",
        message: "This is an alert.",
      };
      rerender(<ContactForm {...props} />);
      expect(queryByTestId("form_alert")).toBeInTheDocument();
    });

    it("should close if click close alert button", async () => {
      const mockCallback = jest.fn();
      const { getByTestId, queryByTestId } = render(
        <ContactForm
          onSubmit={mockCallback}
          alertMessageProps={{
            type: "success",
            message: "This is an alert message",
          }}
        />
      );
      fireEvent.click(getByTestId("close_btn"));
      await waitFor(() => {
        expect(queryByTestId("form_alert")).not.toBeInTheDocument();
      });
    });

    it("should not render alert if passing invalid alert type", () => {
      const mockCallback = jest.fn();
      const { queryByTestId } = render(
        <ContactForm
          onSubmit={mockCallback}
          alertMessageProps={{
            type: "dwadbwadi",
            message: "This is an alert message",
          }}
        />
      );
      expect(queryByTestId("form_alert")).not.toBeInTheDocument();
    });
  }); // Alert

  describe("Submit Button", () => {
    it("should render button with text specified", () => {
      const mockCallback = jest.fn();
      const buttonText = "Submit Button";
      const { getByText } = render(
        <ContactForm
          fields={[
            { type: "nameGroup", required: true },
            { type: "phone", required: true },
            { type: "email", required: true },
            { type: "message", required: true },
          ]}
          onSubmit={mockCallback}
          submitButtonProps={{ text: buttonText }}
        />
      );
      expect(getByText(buttonText)).toMatchSnapshot();
    });
  }); // Submit Button
}); // Contact form
