import * as React from 'react';
import {Input, Button} from 'antd';
import { render } from 'react-dom';

export interface InputNameProps {
  author : string;
  setUserName(name : String) : void;
}

export interface InputNameState {
  input : string;
}

export default class InputName extends React.Component<InputNameProps, InputNameState> {
  constructor(props:InputNameProps){
    super(props);
    this.state = {
      input: '',
    }
  }
  onChangeListener = (event:React.ChangeEvent<HTMLInputElement>) : void => {
    this.setState({
      input:(event.target as HTMLInputElement).value,
    });
  }
  onClickListener = (userName:string) => (event:React.MouseEvent<HTMLButtonElement>) => {
    this.props.setUserName(userName);
  }

  render = () : React.ReactElement<any> => {
    return (
      <div>
        <h1>{this.props.author}과의 호불호를 알아보아요.</h1>
        <span>당신의 이름을 입력해주세요.</span>
        <Input placeholder="Input your name" onChange={this.onChangeListener} ></Input>
        <Button type="primary" onClick={this.onClickListener(this.state.input)}
        block >ENTER</Button>
      </div>
    );
  }
}
