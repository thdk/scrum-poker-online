import { observable } from 'mobx';

export class ViewStore {
  @observable
  public sessionFromUrl: string | undefined = undefined;
}
