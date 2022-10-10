const allowedDisplayValues = ['auto', 'block', 'swap', 'fallback', 'optional']

const formatValues = (values: string[]) =>
  values.map((val) => `\`${val}\``).join(', ')

const extToFormat = {
  woff: 'woff',
  woff2: 'woff2',
  ttf: 'truetype',
  otf: 'opentype',
  eot: 'embedded-opentype',
}

type FontOptions = {
  family: string
  src: string
  ext: string
  format: string
  display: string
  weight?: number
  style?: string
  fallback?: string[]
  preload: boolean
  variable?: string
  ascentOverride?: string
  descentOverride?: string
  fontStretch?: string
  fontVariant?: string
  fontFeatureSettings?: string
  fontVariationSettings?: string
  lineGapOverride?: string
  sizeAdjust?: string
  adjustFontFallback?: string | false
}
export function validateData(functionName: string, data: any): FontOptions {
  if (functionName) {
    throw new Error(`@next/font/local has no named exports`)
  }
  let {
    src,
    display = 'optional',
    weight,
    style,
    fallback,
    preload = true,
    variable,
    ascentOverride,
    descentOverride,
    fontStretch,
    fontVariant,
    fontFeatureSettings,
    fontVariationSettings,
    lineGapOverride,
    sizeAdjust,
    adjustFontFallback,
  } = data[0] || ({} as any)

  if (!allowedDisplayValues.includes(display)) {
    throw new Error(
      `Invalid display value \`${display}\`.\nAvailable display values: ${formatValues(
        allowedDisplayValues
      )}`
    )
  }

  if (!src) {
    throw new Error('Missing required `src` property')
  }

  const ext = /\.(woff|woff2|eot|ttf|otf)$/.exec(src)?.[1]
  if (!ext) {
    throw new Error(`Unexpected file \`${src}\``)
  }

  const family = /.+\/(.+?)\./.exec(src)![1]

  return {
    family,
    src,
    ext,
    format: extToFormat[ext as 'woff' | 'woff2' | 'eot' | 'ttf' | 'otf'],
    display,
    weight,
    style,
    fallback,
    preload,
    variable,
    ascentOverride,
    descentOverride,
    fontStretch,
    fontVariant,
    fontFeatureSettings,
    fontVariationSettings,
    lineGapOverride,
    sizeAdjust,
    adjustFontFallback,
  }
}
