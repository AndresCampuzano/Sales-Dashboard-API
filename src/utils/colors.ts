import { COLORS } from './constants';

/**
 * Recovers the color from the constants file based on the label
 * @example
 * colorFromLocalConstants('Verde')
 * // returns: { bgColor: '#24a124', textColor: '#ffffff' }
 */
export const colorFromLocalConstants = (label: string) => {
  const color = COLORS.find((color) => color.label === label)
  return color
    ? {
      bgColor: color.color,
      textColor: color?.textColor || '#ffffff'
    }
    : {
      bgColor: '#000000',
      textColor: '#ffffff'
    }
}