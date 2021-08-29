export class Action {
  public toPlainObject = () => {
    return Object.assign({}, this);
  };
}
