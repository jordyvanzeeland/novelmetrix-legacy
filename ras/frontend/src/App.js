import React, { Component } from "react"
import {render} from "react-dom"

export default class App extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return <p>Soon here comes the Reading Analytics System!</p>
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);