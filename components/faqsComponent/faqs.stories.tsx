import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Faqs from './faqs.component';

export default {
  title: 'components/Faqs/acordion',
  component: Faqs,
  argTypes: {
    faqdata: []
    },
} as ComponentMeta<typeof Faqs>;

const Template: ComponentStory<typeof Faqs> = (args: any) => <Faqs {...args} />;

export const primary = Template.bind({});
primary.args = { 
 
    
};

