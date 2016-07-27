module.exports = {
  getInfo(locale, callback){
    const req = new XMLHttpRequest();
    req.open("GET", `https://raw.githubusercontent.com/unicode-cldr/cldr-misc-full/master/main/${locale}/delimiters.json`);
    // req.open("GET", `../node_modules/cldr-misc-full/main/${locale}/delimiters.json`);
    req.onreadystatuschange = function(){
      callback(JSON.parse(req.responseText), locale);
    };
    req.send();
  }

};
