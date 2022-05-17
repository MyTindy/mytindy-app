export interface SellerInput {
  sp_store_name: string;
  seller_name: string;
  email: string;
  password: string;
  contact?: string;
  zipcode?: string;
  state?: string;
  country?: string;
  custom_fields?: string;
}

export interface SellerOutput {
  id: number;
  main_id_shop: number;
  customer_id: number;
  sp_shop_name: string;
  sp_store_name: string;
  store_name_handle: string;
  seller_name: string;
  last_name: string;
  full_name: string;
  email: string;
  shop_logo: string;
  store_logo: string;
  display_customer_info: number;
  date_add: string;
  active: number;
  bucket_created: number;
  on_s3: number;
  description: any;
  store_address: string;
  contact: any;
  store_banner: any;
  seller_banner_video: any;
  policy: any;
  city: any;
  short_desc: any;
  zipcode: string;
  social_tabs_status: number;
  box_folder_id: any;
  navision_sync: number;
  shopify_store_url: any;
  custom_fields: any;
  on_vacation: number;
  is_approved: number;
  user_type: number;
  user_type_value: string;
  seller_default_location_id: number;
  sp_location_id: any;
  is_published: number;
  to_sell_global: number;
  id_country: any;
  id_state: any;
  create_pickup_bring: any;
  fulfill_reminder_day: number;
  seller_currency: any;
}
