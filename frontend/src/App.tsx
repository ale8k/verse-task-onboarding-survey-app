import React, { Component, FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// pages (create index.ts for this...)
import { BasePage } from "./pages/BasePage/BasePage";
import "./App.scss";

export default class App extends Component<{}, { questions: string[] }> {
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
                    <Route path="/" exact render={() => <BasePage/>}/>
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

