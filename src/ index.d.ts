/* eslint-disable no-extend-native */
/* eslint-disable no-unused-vars */
declare global {
  interface String {
    format(...replacements: string[]): string;
  }
}

String.prototype.format = function (...args: string[]) {
  return this.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] !== 'undefined' ? args[number] : match;
  });
};

export {};

declare module '*.svg' {
  const content: SVGElement;
  export default content;
}
