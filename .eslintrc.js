const INLINE_ELEMENTS = [
  "a",
  "abbr",
  "audio",
  "b",
  "bdi",
  "bdo",
  "canvas",
  "cite",
  "code",
  "data",
  "del",
  "dfn",
  "em",
  "i",
  "iframe",
  "ins",
  "kbd",
  "label",
  "map",
  "mark",
  "noscript",
  "object",
  "output",
  "picture",
  "q",
  "ruby",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "svg",
  "time",
  "u",
  "var",
  "video"
];

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2018,
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    "max-len": {
      "code": 120,
    },
    "no-unused-vars": "warn",
    semi: [2, "always"],
    "no-console": ["warn"],
    "eol-last": ["error", "always"],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 4,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          normal: "never",
          void: "always",
          component: "always"
        }
      }
    ],
    "vue/singleline-html-element-content-newline": [
      "error",
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ["pre", "textarea", ...INLINE_ELEMENTS]
      }
    ],
  }
};
