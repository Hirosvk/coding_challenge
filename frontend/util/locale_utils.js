module.exports = {
  getInfo(locale, callback){
    const req = new XMLHttpRequest();
    req.open("GET", `https://raw.githubusercontent.com/unicode-cldr/cldr-misc-full/master/main/${locale}/delimiters.json`);
    req.onload = function(){
      callback(JSON.parse(req.responseText), locale);
    };
    req.send();
  }

};
