export enum WEBHOOKS {
	NAME = 'webhook',
	TOKEN_CREATION_SUCCEEDED = 'token.creation.succeeded',
	TOKEN_CREATION_FAILED = 'token.creation.failed',
	TOKEN_EXPIRED = 'token.expired',
	TOKEN_UPDATE_SUCCEEDED = 'token.update.succeeded',
	TOKEN_UPDATE_FAILED = 'token.update.failed',
	TOKEN_CREATION_YAPE_FAILED = 'token.creationyape.failed',
}

export enum HEADERS {
	VERIFY_LOWER = 'application',
	MERCHANT_ID_NORMAL = 'merchant-id',
	MERCHANT_ID_NORMAL_v2 = 'Merchant_Id',
	MERCHANT_CODE_V3 = 'Merchant_Code',
	VOID_ALL_PREAUTH = 'Void-All-Preauth',
	ACTIVATE_MOCK_COMMISSIONS = 'Activate-Mock-Commissions',
	ACTIVATE_MOCK_CHARGE = 'Activate-Mock-Charge',
	ACTIVATE_MOCK_CARD = 'Activate-Mock-Card',
	ACTIVATE_MOCK_PREAUTHORIZATION = 'Activate-Mock-Preauthorization',
	ACTIVATE_MOCK_NOTIFICATION = 'Activate-Mock-Notification',
	ACTIVATE_MOCK_REFUND = 'Activate-Mock-Refund',
	ACTIVATE_MOCK_SWITCH = 'Activate-Mock-Switch',
	SUBSCRIPTION_CODE = 'Subscription-Code',
	CUSTOMER_REF = 'Customer-Ref',
	MOCK_INVOKE_FN_CORE_PCI = 'Mock-Invoke-Fn-Core-Pci',
	RECURRING_PAY = 'Recurring-Pay',
	PK_HEADER = 'pk',
	SK_HEADER = 'sk',
	X_FORWARDED_FOR = 'x-forwarded-for',
	ACTIVATE_MOCK_STEP_UP_TOKEN_REQUIRED = 'Activate-mock-step-Up-Token-Required',
	ACTIVATE_MOCK_FINANCE = 'Activate-Mock-Finance',
	VERIFY = 'Application',
	ACCESS_CONTROL_ALLOW_HEADERS = 'Access-Control-Allow-Headers',
	ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin',
	ACCESS_CONTROL_ALLOW_METHODS = 'Access-Control-Allow-Methods',
	AUTHORIZATION = 'Authorization',
	CONTENT_TYPE = 'Content-Type',
	HASH_TOKEN = 'hash-token',
	X_API_VERSION = 'X-Api-Version',
	API_VERSION = 'Api-Version',
	X_CULQI_PRODUCT = 'X-Culqi-Product',
	X_CULQI_CLIENT = 'X-Culqi-Client',
	MERCHANT_ID = 'Merchant_Id',
	MERCHANT_ID_V2 = 'Merchant-Id',
	MERCHANT_ID_V3 = 'Merchant_id',
	MERCHANT_CODE = 'Merchant_Code',
	MERCHANT_CODE_V2 = 'Merchant-Code',
	USER_AGENT = 'User-Agent',
	MOCK_FIS_WEBPAY_SESSION = 'Activate-Mock-Session',
	MOCK_FIS_WEBPAY_CREATE = 'Activate-Mock-Token',
	MOCK_FIS_WEBPAY_DECRYPT = 'Activate-Mock-Lookup',
	MOCK_FIS_WEBPAY_CVV_AND_EXPIRY = 'Activate-Mock-Cvv-And-Expiry',
	ACTIVATE_MOCK_FIS_WEBPAY_TOKENISATION = 'Activate-Mock-Token',
	ACTIVATE_MOCK_FIS_WEBPAY_CONTAINER = 'Activate-Mock-Token-Container',
	ACTIVATE_MOCK_YAPE = 'Activate-Mock-Yape',
	GENERATE_TOKEN_ONLY_ON_FIS = 'Generate-Token-Only-On-Fis',
	ACTIVATE_LOCAL_MOCK_FIS_NEUTRINO = 'Activate-Local-Mock-Fis-Neutrino',
}
export enum PATHS {
	TOKEN_GET = 'GET:/v2/tokens',
	TOKEN_GET_OPTIONS = 'OPTIONS:/v2/tokens',
	TOKEN_UPDATE = 'PATCH:/v2/tokens',
	TOKEN_UPDATE_OPTIONS = 'OPTIONS:/v2/tokens',
	TOKEN_THREEDS = 'POST:/v2/tokens/threeds-token',
	TOKEN_THREEDS_OPTIONS = 'OPTIONS:/v2/tokens/threeds-token',
	TOKEN_CREATE = 'POST:/v2/tokens',
	TOKEN_CREATE_OPTIONS = 'OPTIONS:/v2/tokens',
	TOKEN_YAPE_POST = 'POST:/v2/tokens/yape',
	TOKEN_YAPE_POST_OPTIONS = 'OPTIONS:/v2/tokens/yape',
	TOKEN_LIST = 'GET:/v2/tokens',
	TOKEN_LIST_OPTIONS = 'OPTIONS:/v2/tokens/',
	VALIDATE_IIN = 'GET:/v2/validate-iin',
	PRIVATE_TOKEN_VERIFY = 'POST:/private-api/tokens/verify',
	PRIVATE_TOKEN_SEND_WEBHOOK = 'POST:/private-api/tokens/send-webhook',
	PRIVATE_TOKEN_VERIFY_TDS = 'POST:/private-api/tokens/verify-tds',
	PRIVATE_TOKEN_DEACTIVATE = 'POST:/private-api/tokens/deactivate',
	PRIVATE_TOKEN_CARD_ACTIVATE = 'POST:/private-api/tokens/card/activate',
	PRIVATE_TOKEN_POST = 'POST:/private-api/get-token',
	PRIVATE_TOKEN_GET_MASSIVE = 'POST:/private-api/tokens-massive',
	PRIVATE_CREATE_GET_BY_HASH = 'POST:/private-api/get-by-hash',
	PRIVATE_DECRYPT_TOKEN_FIS = 'POST:/private-api/decrypt-token-fis',
	PRIVATE_CVV_AND_EXPIRY = 'POST:/private-api/cvv-and-expiry',
	PRIVATE_UPDATE_CHARGE_ID_FOR_3DS = 'POST:/private-api/update-charge-id-for-3ds',
}

export enum CLEAN_PATHS {
	TOKEN_GET = '/v2/tokens/{id}',
	TOKEN_UPDATE = '/v2/tokens/{id}',
	TOKEN_THREEDS = '/v2/tokens/threeds-token',
	TOKEN_CREATE = '/v2/tokens',
	TOKEN_YAPE_POST = '/v2/tokens/yape',
	TOKEN_LIST = '/v2/tokens',
	PRIVATE_TOKEN_VERIFY = '/private-api/tokens/verify',
	PRIVATE_TOKEN_SEND_WEBHOOK = '/private-api/tokens/send-webhook',
	PRIVATE_TOKEN_VERIFY_TDS = '/private-api/tokens/verify-tds',
	PRIVATE_TOKEN_DEACTIVATE = '/private-api/tokens/deactivate',
	PRIVATE_TOKEN_CARD_ACTIVATE = '/private-api/tokens/card/activate',
	PRIVATE_TOKEN_POST = '/private-api/get-token',
	PRIVATE_TOKEN_GET_MASSIVE = '/private-api/tokens-massive',
	PRIVATE_CREATE_GET_BY_HASH = '/private-api/get-by-hash',
	PRIVATE_DECRYPT_TOKEN_FIS = '/private-api/decrypt-token-fis',
	PRIVATE_CVV_AND_EXPIRY = '/private-api/cvv-and-expiry',
	PRIVATE_UPDATE_CHARGE_ID_FOR_3DS = '/private-api/update-charge-id-for-3ds',
	VALIDATE_IIN = '/v2/validate-iin',
}

export enum PARAMETER_YAPE_OTP {
	MAX_LENGTH = 6,
	MIN_LENGTH = 6,
}
export enum PARAMETER_YAPE_PHONE_NUMBER {
	MAX_LENGTH = 9,
	MIN_LENGTH = 9,
}
export enum PARAMETER_YAPE_AMOUNT {
	MIN_LENGTH = 300,
	MAX_LENGTH = 150000,
}
export enum PARAMETER_YAPE_NUMBER_PHONE_RANGE {
	MIN_LENGTH = 900000000,
	MAX_LENGTH = 999999999,
}
export enum VALUE {
	ALLOW = '*',
	CHARGE = 'CHARGE',
	CHARGE_PRIVATE = 'CHARGE-PRIVATE',
	CARD = 'CARD',
	CARD_PRIVATE = 'CARD-PRIVATE',
	TDS = 'TDS',
	REFUND = 'REFUND',
	APPLICATION_JSON = 'application/json',
	PRE_AUTHORIZATION = 'PRE-AUTHORIZATION',
}

export enum STATUS_CVV_AND_EXPIRY {
	ACTIVE = 'ACTIVE',
	NOT_ACTIVE = 'NO_ACTIVE',
	NOT_DEFINED = 'NOT_DEFINED',
}
export enum CURRENT_ENV {
	LOCAL = 'local',
	DEV = 'dev',
	QA = 'qas',
	PROD = 'prd',
}
export enum LAMBDA {
	FN_CORE_PCI = 'fn-core-pci',
	FN_BRIDGE_BCP_YAPE = 'fn-yape-integrator',
	FN_CONTROL_ECOMMERCE = 'fn-control-ecommerce',
}
export enum PATHS_INVOKE {
	TOKEN_VERIFY_BY_3DS = '/private-api/tokens/verify-tds',
	TOKEN_DECRYPT = '/private-api/decrypt-token-fis',
	TRAFFIC_CONTROL = '/private-api/control/authorizer',
}
export enum LAMBDA_METHOD {
	PROXY = '/{proxy+}',
}
export enum METHOD_HTTP {
	POST = 'POST',
	GET = 'GET',
	PATCH = 'PATCH',
	OPTIONS = 'OPTIONS',
}
export enum POSITION {
	FIRST = 0,
	SECOND = 1,
	THIRD = 2,
	FOURTH = 3,
	FIFTH = 4,
	SIXTH = 5,
	SEVENTH = 6,
	EIGHTH = 7,
	NINTH = 8,
	TENTH = 9,
}

export enum TIMEOUT {
	PROVIDER = 99001,
	REDIS = 10000,
}
export enum CURRENCY {
	USD = 'USD',
	PEN = 'PEN',
}
export enum WEBHOOKS_ORIGIN {
	SEND = 'send',
}
export enum PRODUCT_SUPPORT_WEBHOOKS {
	ONLINE = 'online',
	LINK = 'link',
}

export enum PRODUCTS_MERCHANT {
	ONLINE = 'online',
	LINK = 'link',
}

export enum PRODUCTS_MERCHANT_PCI_TOKEN_CULQI {
	ONLINE = '2',
	LINK = '3',
}

export enum HTTP {
	STATUS_CODE_201 = 201,
	STATUS_CODE_200 = 200,
	STATUS_CODE_400 = 400,
	STATUS_CODE_401 = 401,
	STATUS_CODE_403 = 403,
	STATUS_CODE_404 = 404,
	STATUS_CODE_440 = 440,
	STATUS_CODE_441 = 441,
	STATUS_CODE_500 = 500,
	STATUS_CODE_671 = 671,
	STATUS_CODE_679 = 679,
}
export enum TEXT_DECODER {
	UTC_8 = 'utf-8',
}
export enum TDS_TYPE_VERSION {
	CYBERSOURCE = 'CYBERSOURCE',
	FIS = 'FIS',
}
export enum NUM {
	ZERO = 0,
	ONE = 1,
	TWO = 2,
	THREE = 3,
	FOUR = 4,
	FIVE = 5,
	SIX = 6,
	SEVEN = 7,
	EIGHT = 8,
	NINE = 9,
	TEN = 10,
	TWELVE = 12,
	THIRTEEN = 13,
	FIFTEEN = 15,
	SIXTEEN = 16,
	NINE_TEEN = 19,
	TWENTY_FIVE = 25,
	FIFTY = 50,
	ONE_HUNDRED = 100,
	TEN_THOUSND = 10000,
	ONE_HUNDRED_THOUSAND = 100000,
	ONE_TRILLION = 1000000000000,
	TEN_CUATRILLION = 10000000000000000,
}

export enum ORIGIN {
	CHECKOUT = 'checkout',
	SHOPIFY = 'shopify',
	EXPRESS = 'express',
	API = 'api',
}
export enum CARD_TYPE_REDIS {
	CREDIT = 'CRE',
	PREPAID = 'PRE',
	DEBIT = 'DEB',
}
export enum CARD_TYPE {
	CREDIT = 'Crédito',
	PREPAID = 'Prepago',
	DEBIT = 'Débito',
	INTERNATIONAL = 'Internacional',
}

export enum CARD_BRAND {
	AMEX = 'AMEX',
	DINERS = 'DINERS',
	MASTERCARD = 'MC',
	VISA = 'VISA',
}

export enum BROWSER {
	OPERA = 'Opera',
	CHROME = 'Chrome',
	SAFARI = 'Safari',
	FIREFOX = 'Firefox',
	INTERNET_EXPLORER = 'IE',
	UNKNOWN = 'Unknown',
}

export enum BRAND_CODE_TYPE_REDIS {
	VISA = '04',
	MASTERCARD = '05',
	DINERS = '07',
	AMEX = '03',
	DISCOVER = '08',
	JCB = '09',
	PAGO_EFECTIVO = '99',
}
export enum BRAND_CODE_TYPE {
	VISA = 'Visa',
	MASTERCARD = 'Mastercard',
	DINERS = 'Diners',
	AMEX = 'Amex',
	DISCOVER = 'Discover',
	JCB = 'JCB',
	PAGO_EFECTIVO = 'Pago Efectivo',
}

export enum MERCHANT_STATUS {
	REGISTERED = 'REG',
	REMOVED = 'ELI',
	REFUSED = 'REC',
	ACTIVE = 'ACT',
	SUSPENDED = 'SUS',
	CERRADO = 'CER',
	LOCKED = 'BLO',
	DISENFILIATED = 'DES',
}
export enum PARAM {
	TOKEN_FIS_ID = 'token_fis',
	ID = 'id',
	TOKEN_ID = 'token_id',
	OPT = 'otp',
	AMOUNT = 'amount',
	NUMBER_PHONE = 'number_phone',
	METADATA = 'metadata',
	CARD_NUMBER = 'card_number',
	CVV = 'cvv',
	EMAIL = 'email',
	FINGERPRINT = 'fingerprint',
	EXPIRATION_YEAR = 'expiration_year',
	EXPIRATION_MONTH = 'expiration_month',
	TRANSACTION_REF = 'transaction_ref',
	HASH_CARD = '',
}

export enum REDIS_STATUS_EXPIRED {
	SUCCESSFULLY = 1,
	ERROR = 0,
}
export enum REDIS_STATUS_DELETED {
	SUCCESSFULLY = 1,
	ERROR = 0,
}
export enum BOOLEAN_STRING {
	TRUE = 'true',
	FALSE = 'false',
}
export enum CRYPTO {
	SHA256 = 'sha256',
	HEX = 'hex',
}
export enum MERCHANT_PRODUCT {
	ONLINE = 'online',
	CULQILINK = 'culqilink',
}
export enum BOOLEAN {
	TRUE = 1,
	FALSE = 0,
}
export enum BOOLEAN_STRING_NUMBER {
	TRUE = '1',
	FALSE = '0',
}
export enum SESSION_TYPE {
	APPLICATION = 'APPLICATION',
	PERSON = 'PERSON',
}
export enum FIELDS_VALIDATOR {
	FIS_ID_MAX_LENGTH = 50,
	FIS_ID_MIN_LENGTH = 1,
}
export enum SOURCE_TOKEN {
	CARD = 0,
	YAPE = 1,
	PLIN = 2,
}

export enum BINS_LENGTH {
	SIX = 6,
	SEVEN = 7,
	EIGHT = 8,
	NINE = 9,
	TEN = 10,
}
