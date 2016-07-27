const React = require('react');
const LocaleUtils = require('../util/locale_utils');
const LocaleList = require('../constants/locale_list');

const Main = React.createClass({
  getInitialState(){
    return({results: []});
  },

  getInfo(event){
    event.preventDefault();
    this.setState({results: []});
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
          currentState.results = currentState.results.concat([`${localeName}= "${obj[propName]}"`]);
          return currentState;
        });
      }
    }
  },


  render(){
    return (
      <div>
        <input ref="property"></input>
        <button value="Get Info" onClick={this.getInfo} />
        <ul>
          {
            this.state.results.map((result, idx) =>{
              return <li key={idx}>{result}</li>;
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = Main;
window.LocaleUtils = LocaleUtils;
