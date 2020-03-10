import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import IQuestion from "./interfaces/IQuestion";

// pages (create index.ts for this...)
import BasePage from "./pages/BasePage/BasePage";
import { ActiveQuestionPage } from "./pages/ActiveQuestionPage/ActiveQuestionPage";
import "./App.scss";

export default class App extends Component<any, { questions: IQuestion[] }> {
     constructor(props: any) {
         super(props);

         this.state = {
            questions: []
         };

         this.getAllQuestions();
     }

    public render() {
        return (
            <div className="App">
                <Router>
                        {
                            // sorry for the lazy loading div lol.
                        }
                        <Route path="/" exact render={() => this.state.questions.length > 0 ? <BasePage/> :
                        <div>Loading...</div>}/>
                        {
                            // remember to protect this route Alex,
                            // if you don't then people can go here prior to api call
                        }
                        <Route path="/questions-active" render={() => <ActiveQuestionPage questions={this.state.questions}/>}/>
                </Router>
            </div>
        );
    }

    private async getAllQuestions(): Promise<void> {
        // adjust accordingly to your environment
        await fetch("http://127.0.0.1:3001/questions").then(d => d.json()).then((data) => {
            this.setState({
                questions: data
            });
        }).then(() => console.log(this.state.questions));
    }

}

