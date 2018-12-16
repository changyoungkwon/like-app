import * as React from 'react';
import {Answer} from '../Container/LikeAppContainer';
import {Button, Icon} from 'antd';

export interface ResultProps {
  author : String;
  authorQuestions: string[];
  userName : String;
  matches: boolean[];
  reset() : void;
}

export default function Result(props:ResultProps) : React.ReactElement<any>{
  const score = props.matches.filter( match => match ).length;
  const questions = props.authorQuestions;
  const onClickListener = (event:React.MouseEvent<HTMLButtonElement>) => {
    props.reset();
  };
  const answer = (question:string, match:boolean, key:number) : React.ReactElement<any> => {
    const icon = match ? <Icon type="check" /> : <Icon type="close" />;
    return <li key={key}>{icon}{question}</li>;
  };
  return (
  <div>    
    <h2>{props.author}님과의 호불호 일치도입니다!</h2>
    <h1>총 {Math.round(100 * score / questions.length)}점</h1>
    <span>총 {questions.length}개 중 {score}개 일치</span>
    <h3>{props.userName}님</h3>
    <Button onClick={onClickListener}>RETRY</Button>
    <div>
      <ul style={{listStyleType:'none'}}>
        {
          questions.map((question, index) => {
            return answer(question, props.matches[index], index);
          })
        }
      </ul>
    </div>
  </div>
  );
}
