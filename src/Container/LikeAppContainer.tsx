import * as React from 'react';
import InputName from '../Component/InputName';
import Question from '../Component/Question';
import Result from '../Component/Result';
const jeongminAnswerSheet = require('../Data/Jeongmin');

export enum Progress { INPUT_NAME, QUESTION, RESULT }
export enum Answer { UNANSWERED, LIKE, DISLIKE }

interface LikeAppState {
  author : string;
  userName : string;
  userAnswers : Answer[];
  progress : Progress;
  qIndex : number;
}

export default class LikeAppContainer extends React.Component<any, LikeAppState> {
  authorQAs:[string, Answer][];
  constructor(props:any){
    super(props);
    const jeongminQAs = jeongminAnswerSheet.qas as any;
    this.authorQAs = jeongminQAs.map((qa:{subject:string, choice:string}) => {
      const choice:string = qa.choice;
      if(choice === 'like') {
        return [qa.subject, Answer.LIKE];
      }
      if (choice === 'dislike') {
        return [qa.subject, Answer.DISLIKE];
      }
      return [qa.subject, Answer.UNANSWERED];
    });
    this.state = {
      author : jeongminAnswerSheet.author as string,
      userName : '',
      userAnswers : [],
      progress : Progress.INPUT_NAME,
      qIndex : 0,
    };
  }

  setUserName = (name:string) : void => {
    this.setState({
      userName: name,
      progress : Progress.QUESTION,
    });
  }

  appendUserAnswer = (ans:Answer) : void => {
    this.setState((prev:LikeAppState) => {
      const userAnswers = prev.userAnswers.slice(0);
      const qIndex = prev.qIndex + 1;
      const progress = (qIndex >= this.authorQAs.length) ? Progress.RESULT : Progress.QUESTION;
      userAnswers.push(ans);
      return {
        qIndex,
        userAnswers,
        progress,
      };
    });
  }

  resetState = () => {
    this.setState({
      userName : '',
      userAnswers : [],
      progress : Progress.INPUT_NAME,
      qIndex : 0,
    });
  }

  render() : React.ReactElement<any> {
    switch(this.state.progress){
      case Progress.INPUT_NAME:
        return <InputName 
                author={this.state.author}
                setUserName={this.setUserName}>
               </InputName>;

      case Progress.QUESTION :
        const question:string = this.authorQAs[this.state.qIndex][0];
        const qprogress:string = `${this.state.qIndex}/${this.authorQAs.length}`;
        return <Question
                author={this.state.author}
                question={question}
                qprogress={qprogress}
                appendUserAnswer={this.appendUserAnswer}>
               </Question>;

      case Progress.RESULT :
        const authorQuestions:string[] = this.authorQAs.map(qa => qa[0]);
        const matches:boolean[] = this.state.userAnswers.map((ans, index) =>
          ans === this.authorQAs[index][1]
        );
        return <Result 
                author={this.state.author}
                authorQuestions={authorQuestions}
                userName={this.state.userName}
                matches ={matches}
                reset={this.resetState} >
                </Result>;
    }
  }
}