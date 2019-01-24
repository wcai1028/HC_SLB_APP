declare module '*.json' {
  const value: IObject
  export default value
}

declare module 'parameters' {
  const value: any
  export default value
}

declare interface IObject {
  [index: string]: any
}
declare interface IRObject {
  readonly [index: string]: any
}
declare interface IAction {
  type: string
  payload: any
}

declare namespace JSX {
  interface IntrinsicElements {
    [eleName: string]: any
  }
  interface IntrinsicAttributes {
    [eleName: string]: any
  }
}

declare interface INSActionTypes {
  readonly [index: string]: INSActionTypes | string | any
}

declare interface IReduxActionNamespacer {
  nsActionTypes(actionTypes: any[]): INSActionTypes
}

declare module '*.svg' {
  const content: any
  export default content
}
