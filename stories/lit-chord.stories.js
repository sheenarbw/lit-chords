import { html } from 'lit';
import '../src/lit-chord.js';

export default {
  title: 'LitChord',
  component: 'lit-chord',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <lit-chord
      style="--lit-chord-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </lit-chord>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
