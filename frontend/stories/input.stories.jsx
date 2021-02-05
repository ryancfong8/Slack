import React from 'react';
import Input from '../components/forms/Input/input';

export default {
  title: 'Components/Input',
  component: Input,
  args: {
      labelName: "Label",
      onChange: () => {}
  }
};

const Template = (args) => <Input {...args} />;

export const InputStory = Template.bind({});