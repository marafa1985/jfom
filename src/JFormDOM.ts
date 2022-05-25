// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace JFormDOM {
  export type Container = Element | Document | DocumentFragment;

  export const render = (
    rootElement: HTMLElement,
    container: Container | null
  ) =>
    container
      ? container.appendChild(rootElement)
      : document.body.appendChild(rootElement);
}
