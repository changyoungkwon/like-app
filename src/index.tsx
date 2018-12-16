import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface TitleProps {
  text: string;
}

function Title(props: TitleProps) : React.ReactElement<TitleProps> {
  return (
    <h1>{props.text}</h1>
  );
}

ReactDOM.render(<Title text="Hello World!" />, document.getElementById('app'));
