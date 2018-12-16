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
  userAnswerList : Answer[];
  progress : Progress;
  questionIndex : number;
}

export default class LikeAppContainer extends React.Component<any, LikeAppState> {
  authorAnswerSheet:[string, Answer][];
  constructor(props:any){
    super(props);
    const jeongminQAs = jeongminAnswerSheet.qas as any;
    this.authorAnswerSheet = jeongminQAs.map((qa:{subject:string, choice:string}) => {
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
      userAnswerList : [],
      progress : Progress.INPUT_NAME,
      questionIndex : 0,
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
      const newAnswerList = prev.userAnswerList.slice(0);
      newAnswerList.push(ans);
      const questionIndex = prev.questionIndex + 1;
      if( questionIndex >= this.authorAnswerSheet.length ){
        return {
          questionIndex,
          userAnswerList : newAnswerList,
          progress : Progress.RESULT,
        };
      }
      return {
        questionIndex,
        userAnswerList : newAnswerList,
        progress : Progress.QUESTION,
      };
    });
  }

  clearState = () => {
    this.setState({
      userName : '',
      userAnswerList : [],
      progress : Progress.INPUT_NAME,
      questionIndex : 0,
    });
  }
  render() : React.ReactElement<any> {
    switch(this.state.progress){
      case Progress.INPUT_NAME:
        return <InputName author={this.state.author} setUserName={this.setUserName}></InputName>;
      case Progress.QUESTION :
        const question:string = this.authorAnswerSheet[this.state.questionIndex][0];
        return <Question author={this.state.author} question={question}
                appendUserAnswer={this.appendUserAnswer}
                qprogress={(this.state.questionIndex+1) + "/" + this.authorAnswerSheet.length} ></Question>;
      case Progress.RESULT :
        const compareList:boolean[] = this.state.userAnswerList.map((ans, index) => {
          return ans === this.authorAnswerSheet[index][1];
        });
        return <Result author={this.state.author} authorAnswerSheet={this.authorAnswerSheet}
                userName={this.state.userName}  userAnswerList={this.state.userAnswerList}
                compareList={compareList} initialize={this.clearState} ></Result>;
    }
  }
}