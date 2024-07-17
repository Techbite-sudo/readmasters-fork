
export default interface SystemOptions {
  id: string,
  sea_freight_shipping_price_per_cbm: number;
  air_freight_shipping_price_per_kg: number;
  chinese_yuan_to_usd: number;
  usd_to_chinese_yuan: number;
  usd_to_ksh: number;
  chinese_yuan_to_ksh: number;
  ksh_to_chinese_yuan: number;
  ksh_to_usd: number;
  manufacturer_price_percent_markup: number;
  shipping_price_percent_markup: number;
}