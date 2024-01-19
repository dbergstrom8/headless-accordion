export function composeEventHandlers<E>(
  theirEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void
) {
  return function handleEvent(event: E) {
    theirEventHandler?.(event);

    if (!(event as unknown as Event).defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}
