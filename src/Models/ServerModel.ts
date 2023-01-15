export default class ServerModel {
    public readonly ulid: string;
    public toString = (): string => this.ulid;
    public readonly name: string;

    constructor(values: {
        ulid: string,
        name: string
    }) {
        this.ulid = values.ulid;
        this.name = values.name;
    }
}