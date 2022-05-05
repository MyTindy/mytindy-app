export interface Product {
  seller_id: string;
  type: number;
  product_name: string;
  product_type: string;
  product_tag: string;
  product_description: string;
  variants: Variant[];
  options: Option[];
}

export interface Variant {
  sku: string;
  barcode: string;
  weight: string;
  dimension: string;
  price: string;
  compare_at_price: string;
  handling_charges: string;
  charge_taxes: number;
  require_shipping: string;
  track_inventory: string;
  quantity: string;
  inventory_policy: string;
  inventory_locations: InventoryLocation[];
}

export interface InventoryLocation {
  location_id: string;
  variant_quantity: string;
}

export interface Option {
  name: string;
  values: string;
}
