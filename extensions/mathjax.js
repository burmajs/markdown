import Showdown from "showdown";

var escapehtml = function (str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

var encode = function (str) {
  if (typeof Buffer === "function") {
    return Buffer.from(str).toString("base64");
  } else {
    return btoa(str);
  }
};

var decode = function (str) {
  if (typeof Buffer === "function") {
    return Buffer.from(str, "base64").toString();
  } else {
    return atob(str);
  }
};
// mathjax extension
var mathjax = function () {
  /** @type {Showdown.ShowdownExtension[]} */
  const ext = [
    {
      type: "lang",
      filter: (text) => {
        return text.replace(/\\\((.*?)\\\)/g, (match, p1) => {
          return (
            "<mathxxxjax>" +
            encode("\\(" + escapehtml(p1) + "\\)") +
            "</mathxxxjax>"
          );
        });
      },
    },
    {
      type: "lang",
      filter: (text) => {
        return text.replace(/\\\[([\s\S]*?)\\\]/g, (match, p1) => {
          return (
            "<mathxxxjax>" +
            encode("\\[" + escapehtml(p1) + "\\]") +
            "</mathxxxjax>"
          );
        });
      },
    },
    {
      type: "output",
      filter: (text) => {
        return text.replace(/<mathxxxjax>(.*?)<\/mathxxxjax>/g, (match, p1) => {
          return decode(p1);
        });
      },
    },
  ];
  return ext;
};

Showdown.extension("MathJax", mathjax());

export default mathjax;
