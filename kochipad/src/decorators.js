function create_decorator(decorator, fn) {
  return function decorate(fn) {
    return function (_state) {
      state = decorator(state);
      fn(state);
    };
  };
}
