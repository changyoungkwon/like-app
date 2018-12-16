import * as React from 'react';
import {Answer, Progress} from '../Container/LikeAppContainer';
import {Button} from 'antd';

interface QuestionProps {
  author : string;
  question : string;
  qprogress : string;
  appendUserAnswer(ans : Answer) : void;
}

export default function Question(props:QuestionProps) : React.ReactElement<any>{
  const onClickListener = (id:Answer) => (event:React.MouseEvent<HTMLButtonElement>):void => {
    const target = event.target as HTMLButtonElement;
    if( id === Answer.LIKE ){
      props.appendUserAnswer(Answer.LIKE);
    } else {
      props.appendUserAnswer(Answer.DISLIKE);
    }
  };
  return (
    <div>
      <span>{props.author}</span>
      <span>{props.qprogress}</span>
      <h2>{props.question}</h2>
      <Button onClick={onClickListener(Answer.LIKE)} id="btn_like">LIKE</Button>
      <Button onClick={onClickListener(Answer.DISLIKE)} id="btn_dislike">DISLIKE</Button>
    </div>
  );
}