export = Bmark;
export as namespace bmark;

declare namespace Bmark {
  type DocumentMeta = {
    layout: "page" | "post";
    title: string;
    publishedDate?: string;
    description?: string;
    tags?: string[];
  };
  type Options = import("showdown").ConverterOptions;
  /**
   * Converts Markdown content to HTML.
   *
   * @param mdContent - The Markdown content to be converted.
   * @param options - (Optional) Configuration options for the converter, including settings for tables, emoji, image dimensions, etc.
   * @returns An object containing the front matter data extracted from the Markdown and the converted HTML string.
   */

  function converter(
    mdContent: string,
    options?: Options
  ): {
    data: DocumentMeta;
    convertedHtml: string;
  };
}
