import DOMPurify from "isomorphic-dompurify";

const ALLOWED_URI_REGEXP = /^(?:(?:https?|mailto):|\/|#)/i;

export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "a",
      "blockquote",
      "br",
      "code",
      "del",
      "em",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "hr",
      "img",
      "li",
      "ol",
      "p",
      "pre",
      "s",
      "span",
      "strong",
      "u",
      "ul",
    ],
    ALLOWED_ATTR: [
      "alt",
      "class",
      "height",
      "href",
      "rel",
      "src",
      "target",
      "title",
      "width",
    ],
    ALLOW_DATA_ATTR: false,
    ALLOWED_URI_REGEXP,
    FORBID_TAGS: ["style", "svg", "math"],
    FORBID_ATTR: ["style"],
  });
}
