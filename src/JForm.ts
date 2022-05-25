// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace JForm {
  export type JComponent = Element;
  export type Container = Element | Document | DocumentFragment;

  export const render = (rootElement: Element, container: Container | null) =>
    container
      ? container.appendChild(rootElement)
      : document.body.appendChild(rootElement);
}
