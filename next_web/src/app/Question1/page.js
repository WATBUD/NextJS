"use client";
import React, { Component } from 'react';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [] // 用于存储结果的状态
    };
  }

  componentDidMount() {
    console.log(
      "%c question1_componentDidMount",
      "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
    );
      for (var i = 0; i < 3; i++) {
        setTimeout(() => {
          this.setState(prevState => ({
            results: [...prevState.results, i] // 将结果添加到状态中
          }));
        }, 1000 * i);
      }
  }

  render() {
    return (
      <div>
        <p>请查看页面上的结果：</p>
        <ul>
          {this.state.results.map((result, index) => (
            <li key={index}>{result}</li> // 将结果渲染到列表中
          ))}
        </ul>
      </div>
    );
  }
}

export default MyComponent;

