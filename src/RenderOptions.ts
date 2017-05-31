import CustomRendererDict from './renderers/CustomRendererDict'

export default class RenderOptions {
  className: string | undefined
  allowSoftBreaks: boolean | undefined
  customRenderers: CustomRendererDict | undefined

  constructor() {
  }
}
