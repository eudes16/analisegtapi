import IContext from "../../ports/IContext";

export type TFields<T> = Array<keyof T>;

export default interface IUseCase<IN = any, OUT = any> {
    execute(incoming: IN, context: IContext): Promise<OUT>;
}
