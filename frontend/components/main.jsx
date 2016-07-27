const React = require('react');
const LocaleUtils = require('../util/locale_utils');
const LocaleList = require('../constants/locale_list');

const Main = React.createClass({
  getInitialState(){
    return({results: [], currentCol: -1});
  },

  getInfo(event){
    event.preventDefault();
    this.setState(currentState =>{
      let property = this.refs.property.value;
      currentState.currentCol++;
      currentState.results[currentState.currentCol] = {name: property};
      return currentState;
    });
    LocaleList.forEach(locale => {
      LocaleUtils.getInfo(locale, this.searchForProperty);
    });
  },

  searchForProperty(obj, localeName, property = this.refs.property.value){
    for(let propName in obj){
      if(typeof obj[propName] === "object") {
        this.searchForProperty(obj[propName], localeName, property);
      }else if(propName === property){
        this.setState(currentState => {
          if (currentState.results[currentState.currentCol].hasOwnProperty(obj[propName])){
            currentState.results[currentState.currentCol][obj[propName]].push(localeName);
          } else {
            currentState.results[currentState.currentCol][obj[propName]] = [localeName];
          }
          return currentState;
        });
      }
    }
  },

  renderCol(col){
    let results = [];
    for(let p in col){
      if (p !== "name"){
        results.push(`${p}= ${col[p].join(",")}`);
      }
    }
    return results.map((line,idx) => {
      return <li key={idx}>{line}</li>;
    });
  },

  render(){
    return (
      <div>
        <h2>enter the property name below.</h2>
        <input ref="property"></input>
        <button onClick={this.getInfo}>Get Info</button>
        <div className="columns">
          {
            this.state.results.map((resultCol, idx1) => {
              return (<ul key={idx1}>
                <li>{`Search Result for "${resultCol.name}"`}</li>
                {this.renderCol(resultCol)}
              </ul>);
            })
          }
        </div>
      </div>
    );
  }
});

module.exports = Main;
