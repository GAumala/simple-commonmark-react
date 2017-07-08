import CustomRendererDict from './renderers/CustomRendererDict';

export default class RenderOptions {
  public className: string | undefined;
  public allowSoftBreaks: boolean | undefined;
  public customRenderers: CustomRendererDict | undefined;
}
