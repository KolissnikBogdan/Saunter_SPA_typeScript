export interface IMap {
  onlyView: boolean
  containerElement: any
  onMapChange?: (...arg: any) => void
  onLengthChange?: (...arg: any) => void
  route?: any
  defaultCenter?: any
  defaultZoom?: number
}