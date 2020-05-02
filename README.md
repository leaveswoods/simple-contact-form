# simple-contact-form

> Simple Contact Form Component for React Applications

## Install
The component is developed in React version 16.9.0, however, 16.8.x seems working as well.

`React >= 16.9.0`

```bash
npm install --save simple-contact
```

## Usage
Simple Contact Form is built for simple while also providing some customizability. 

You can preview the component and play with it in CodeSanbox: 

[![Edit summer-frog-02m5l](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/summer-frog-02m5l?fontsize=14&hidenavigation=1&theme=dark)

Here is a basic usage:
```jsx
import React, { useState } from 'react';

import ContactForm from 'simple-contact';
// Don't forget to import styles
import 'simple-contact/dist/index.css';

function Example(props) {
const [loading, setLoading] = useState(false);
  const [alertMessageProps, setAlertMessageProps] = useState({
    message: "",
    type: "",
  });

  const mockAsync = (contactDetails) => {
    console.log(contactDetails)
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
|onSubmit|function|Yes||set the handler to handle click submit, carrying `contactDetails` as funtion argument
|loading|Boolean|No|false|set the loader visble state of submit button
alertMessageProps|Object|No|`{text: "", type: ""}`|Alert message props, you can set alert message by passing `{text: "A alert message, ...}`, or set alert type by passing `{..., type: "success"}` to this prop, available types are `success` and `error` 
|submitButtonProps|Object|No|`{text: "Submit", style: {}}`|Submit button props, example, `{ text: "Submit", style:{ color: "white", backgroundColor: "blue"  }}` 
|fields|obj[ ] or str[ ]|No|`fields`|set the fiels to be used in form, currently available, fields are `nameGroup`(first name and last name), `email`, `phone`, `message`, usage could be found in Codesandbox demo
|title|string|No||set title of form

## More Features are comming
Add fields for select and upload.


## License
Simple React Form is licensed under the MIT license. (https://opensource.org/licenses/MIT)