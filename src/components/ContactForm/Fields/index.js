import * as React from "react";
import { InputField, TextField } from "../../Form/Fields/index";
import { FormItem, Group } from "../../Form/index";

function NameGroup({ required }) {
  return (
    <Group>
      <FormItem
        name="firstName"
        rules={[{ required, message: "Please enter your first name" }]}
      >
        <InputField placeholder="First Name" autoComplete="given-name" />
      </FormItem>
      <FormItem
        name="lastName"
        rules={[{ required, message: "Please enter your last name" }]}
      >
        <InputField placeholder="Last Name" autoComplete="family-name" />
      </FormItem>
    </Group>
  );
}

function Email({ required }) {
  return (
    <FormItem
      name="email"
      rules={[
        { required, message: "Please enter your email" },
        { type: "email", message: "Please enter a valid email" },
      ]}
    >
      <InputField placeholder="Email" autoComplete="email" />
    </FormItem>
  );
}

function Phone({ required }) {
  return (
    <FormItem
      name="phone"
      rules={[
        { required, message: "Please enter your phone" },
        { type: "phone", message: "Please enter a valid phone number" },
      ]}
    >
      <InputField placeholder="Phone" autoComplete="phone" />
    </FormItem>
  );
}

function Message({ required }) {
  return (
    <FormItem
      name="message"
      rules={[{ required, message: "Please leave some message for us" }]}
    >
      <TextField placeholder="Message" rows={5} />
    </FormItem>
  );
}

export { NameGroup, Email, Phone, Message };
