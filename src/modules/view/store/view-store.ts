import { observable } from "mobx";

export class ViewStore {
    @observable
    public isEditMode = false;
}