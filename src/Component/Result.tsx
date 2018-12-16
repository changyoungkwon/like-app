import * as React from 'react';
import {Answer} from '../Container/LikeAppContainer';
import {Button, Icon} from 'antd';

export interface ResultProps {
  author : String;
  authorAnswerSheet : [string, Answer][]
  userName : String;
  userAnswerList: Answer[];
  compareList: boolean[];
  initialize() : void;
}

export default function Result(props:ResultProps) : React.ReactElement<any>{
  const matchedList = props.compareList.filter( match => match );
  const questionList = props.authorAnswerSheet.map( qa => qa[0]);
  const onClickListener = (event:React.MouseEvent<HTMLButtonElement>) => {
    props.initialize();
  }
  const singleAnswerElement = (question:string, match:boolean, key:number) : React.ReactElement<any> => {
    const icon = match ? <Icon type="check" /> : <Icon type="close" />;
    return <li key={key}>{icon}{question}</li>;
  };
  return (
  <div>    
    <h2>{props.author}님과의 호불호 일치도입니다!</h2>
    <h1>총 {Math.round(100 * matchedList.length / props.compareList.length)}점</h1>
    <span>총 {props.compareList.length}개 중 {matchedList.length}개 일치</span>
    <h3>{props.userName}님</h3>
    <Button onClick={onClickListener}>RETRY</Button>
    <div>
      <ul style={{listStyleType:'none'}}>
        {
          questionList.map((question, index) => {
            return singleAnswerElement(question, props.compareList[index], index);
          })
        }
      </ul>
    </div>
  </div>
  );
}
