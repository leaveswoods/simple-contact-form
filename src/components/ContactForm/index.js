import * as React from "react";
import PropTypes from "prop-types";

import { Form, useForm } from "../Form/index";
import { NameGroup, Email, Phone, Message } from "./Fields";
import SubmitButton from "./Button";
import ContactFormAlert from "./Alert";
import Title from "./Title";
import { warning, error } from "../../utils";

function ContactFormWrapper({ children }) {
  return <div className="contact_form">{children}</div>;
}

function ContactForm({
  onSubmit,
  loading,
  alertMessageProps,
  title,
  fields,
  submitButtonProps,
}) {
  const form = useForm();
  const isShowAlertVisible = () => {
    if (
      alertMessageProps &&
      alertMessageProps.type &&
      ["success", "error"].includes(alertMessageProps.type) &&
      alertMessageProps.message
    ) {
      return true;
    }
    return false;
  };
  const [alertVisible, setAlertVisible] = React.useState(isShowAlertVisible());

  React.useEffect(() => {
    if (isShowAlertVisible()) {
      setAlertVisible(true);
    }
  }, [alertMessageProps.message, alertMessageProps.type]);

  const submitContact = async () => {
    const {
      email,
      firstName,
      lastName,
      phone,
      message,
    } = form.getFieldsValue();
    const contactDetail = {
      email,
      firstName,
      lastName,
      phone,
      message,
    };
    try {
      if (onSubmit) {
        await onSubmit(contactDetail);
        form.initFieldsValue();
      } else {
        warning(
          "You need to pass an onSubmit function in props to handle submit."
        );
      }
    } catch (e) {
      error(e);
    }
  };

  const handleClickSubmit = () => {
    const validateResult = form.validateFields();
    if (validateResult) {
      submitContact();
    }
  };
  const components = {
    nameGroup: NameGroup,
    email: Email,
    phone: Phone,
    message: Message,
  };
  return (
    <ContactFormWrapper>
      <Form
        name="contact"
        form={form}
        title={title ? <Title text={title} /> : ""}
      >
        {alertVisible && (
          <ContactFormAlert
            alertMessageProps={alertMessageProps}
            setAlertVisible={setAlertVisible}
          />
        )}
        {fields.map((field) => {
          if (typeof field === "object") {
            const Field = components[field.type];
            if (!Field) return null;
            return <Field key={field.type} required={field.required} />;
          }
          if (typeof field === "string") {
            const Field = components[field];
            if (!Field) return null;
            return <Field key={field} />;
          }
        })}
        <SubmitButton
          loading={loading}
          handleClickSubmit={handleClickSubmit}
          text={submitButtonProps.text}
          style={submitButtonProps.style}
        />
      </Form>
    </ContactFormWrapper>
  );
}
ContactForm.defaultProps = {
  loading: false,
  alertMessageProps: {
    type: "",
    message: "",
  },
  title: "",
  fields: [
    {
      type: "nameGroup",
      required: true,
    },
    {
      type: "email",
      required: true,
    },
    {
      type: "phone",
      required: false,
    },
    {
      type: "message",
      required: true,
    },
  ],
  submitButtonProps: {
    text: "Submit",
    style: {},
  },
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  alertMessageProps: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.oneOf(["error", "success", ""]),
  }),
  title: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        type: PropTypes.oneOf(["nameGroup", "email", "phone", "message"]),
        required: PropTypes.bool,
      }),
    ])
  ),
  submitButtonProps: PropTypes.shape({
    text: PropTypes.string,
    style: PropTypes.object,
  }),
};

export default ContactForm;
