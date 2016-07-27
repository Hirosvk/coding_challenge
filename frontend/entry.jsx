const React = require('react');
const ReactDOM = require('react-dom');
const Main = require('./components/main');

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<Main />, document.getElementById('root'));
});
