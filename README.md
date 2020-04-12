# simple-contact-form

> Simple Contact Form Component for React Applications

## Install
The component is developed in React version 16.9.0, however, 16.8.0 seems working as well.
`React >= 16.9.0`

```bash
npm install --save simple-contact-form
```

## Usage
Simple Contact Form is built for simple while also providing some customizability. Here is a basic usage:
```jsx
import React, { useState } from 'react';

import ContactForm from 'simple-contact-form';
// Don't forget to import styles
import 'simple-contact-form/dist/index.css';

function Example(props) {
const [loading, setLoading] = useState(false);
  const [alertMessageProps, setAlertMessageProps] = useState({
    message: "",
    type: "",
  });

  const mockAsync = () => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setAlertMessageProps({
          message: "You message has been sent",
          type: "success",
        });
        setLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  return (
    <ContactForm
      fields={[
        { type: "nameGroup", required: true },
        { type: "phone", required: true },
        { type: "email", required: true },
        { type: "message", required: true },
      ]}
      loading={loading}
      submitButtonProps={{
        text: "Submit",
      }}
      alertMessageProps={alertMessageProps}
      onSubmit={mockAsync}
    />
  );
}
```

## Form Props.
|Property|Type|Required|default|Description|
|-------|-----|----|----------|--------------------|
|onSubmit||function||set the handler to handle click submit
|loading|Boolean|No|false|set the loader visble state of submit button
alertMessageProps|Object|No|`{text: "", type: ""}`|Alert message props, you can set alert message by passing `{text: "A alert message, ...}`, or set alert type by passing `{..., type: "success"}` to this prop, available types are `success` and `error` 
|submitButtonProps|Object|No|`{text: "Submit", style: {}}`|Submit button props, example, `{ text: "Submit", style:{ color: "white", backgroundColor: "blue"  }}` 
|fields|obj[ ] or str[ ]|No|`fields`|set the fiels to be used in form, currently available, fields are `nameGroup`(first name and last name), `email`, `phone`, `message`, usage could be found in Codesandbox demo
|title|string|No||set title of form