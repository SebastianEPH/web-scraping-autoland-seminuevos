export interface AutolandUniqueInformation {
	cdn_image_prefix: string;
	customer: Customer;
	customer_name: string;
	enable_auction_disclaimer: boolean;
	finance_insurance_products: any;
	ft_locale: string;
	ga4_measurement_id: string;
	ga_asc: boolean;
	info: Info;
	partner_id: number;
	perf: Perf;
	promotional_images: any[];
	s3_folder: string;
	s3_prefix: string;
	show_feature_highlights: boolean;
	show_featuretour: boolean;
	show_finance_insurance_products: boolean;
	show_finance_insurance_quiz: boolean;
	show_spin: boolean;
	spin_placeholder: SpinPlaceholder;
	thumb: string;
	vin: string;
	wa_products: WaProducts;
}

export interface Customer {
	featuretour: boolean;
}

export interface Info {
	abgr_status: string;
	body_type: any;
	customer_cache: CustomerCache;
	factory_upgrades: any;
	is_new: any;
	isdamage_tags: IsdamageTags;
	make: any;
	model: any;
	options: Options;
	placeholders: Placeholders;
	srp_path: string;
	stock: any;
	video_test_drive: VideoTestDrive;
	video_tour_key: any;
	views: Views;
	vin: string;
	year: any;
}

export interface CustomerCache {
	bg_removal_enabled: boolean;
}

export interface IsdamageTags {}

export interface Options {
	closeup_tags: CloseupTags;
	features_translated: any[];
	has_thumbs: boolean;
	hide_zoom_ui: boolean;
	hotspots: any[];
	needs_assessment_quiz: boolean;
	numImgCloseup: number;
	numImgEC: number;
	previous_version: string;
	s3_folder: string;
	show_powered_by_impel: boolean;
	version: string;
}

export interface CloseupTags {}

export interface Placeholders {
	still_image: string;
	still_image_low_res: string;
}

export interface VideoTestDrive {
	thumbnail_url: string;
	url: string;
}

export interface Views {
	closeup: Closeup;
	exterior: Exterior;
	interior: Interior;
	pano: Pano;
}

export interface Closeup {
	has_low_res: boolean;
	has_ultra_res: boolean;
	rearranged: boolean;
	source: string;
}

export interface Exterior {
	has_ec_thumbs: boolean;
	has_low_res: boolean;
	has_ultra_res: boolean;
	load_images_from: string;
	rearranged: boolean;
	source: string;
	thumbs_load_images_from: string;
}

export interface Interior {}

export interface Pano {}

export interface Perf {
	customer_config_cache: number;
	'local_info:vin': number;
	total: number;
	vehicle_query: number;
}

export interface SpinPlaceholder {
	fallback: Fallback;
	still: Still;
}

export interface Fallback {
	full_res: string;
	low_res: string;
}

export interface Still {
	full_res: string;
	low_res: string;
}

export interface WaProducts {
	photos: boolean;
	wa_360: boolean;
}
