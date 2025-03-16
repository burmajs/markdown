import Bmatter from "@burmajs/frontmatter";
import Showdown from "showdown";
import mathjax from "./extensions/mathjax.js";
import showKi from "./extensions/shiki.js";
const bmark = {};
/**
 *
 * @param {string} mdContent
 * @param {import("./index").Options} [options]
 * @returns
 */
bmark.converter = function (mdContent, options = {}) {
  const defaultOptions = {
    tables: true,
    emoji: true,
    parseImgDimensions: true,
    extensions: [mathjax,showKi],
  };

  const cvt = new Showdown.Converter({
    ...defaultOptions,
    ...options,
    extensions: [...defaultOptions.extensions, ...(options.extensions || [])],
  });

  cvt.setFlavor("github");
  const { data, content } = Bmatter.frontmatter(mdContent);
  return { data, convertedHtml: cvt.makeHtml(content) };
};

export default bmark;
