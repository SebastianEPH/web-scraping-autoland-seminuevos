export enum Column {
	id = 'id',
	note = 'note',
	year = 'year',
	code = 'code',
	email = 'email',
	level = 'level',
	grade = 'grade',
	status = 'status',
	password = 'password',
	username = 'username',
	lastname = 'lastname',
	name = 'name',
	person_id = 'person_id',
	middlename = 'middlename',
	is_archived = 'is_archived',
	email_history = 'email_history',
	username_history = 'username_history',
	password_history = 'password_history',
	already_obsolete = 'already_obsolete',
	password_variations = 'password_variations',
	record_update_date = 'record_update_date',
	record_create_date = 'record_create_date',
	surname = 'surname',
	fullname = 'fullname',
	name_short = 'name_short',
	dni = 'dni',
	date_birth = 'date_birth',
}
export enum HEADERS {
	VERIFY = 'Application',
	ACCESS_CONTROL_ALLOW_HEADERS = 'Access-Control-Allow-Headers',
	ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin',
	ACCESS_CONTROL_ALLOW_METHODS = 'Access-Control-Allow-Methods',
	AUTHORIZATION = 'Authorization',
	CONTENT_TYPE = 'Content-Type',
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

export enum TIMEOUT {
	PROVIDER = 99001,
	REDIS = 10000,
}
export enum CURRENCY {
	USD = 'USD',
	PEN = 'PEN',
}


export enum BOOLEAN_STRING {
	TRUE = 'true',
	FALSE = 'false',
}
export enum ENV {
	PORT = 'PORT',
	NODE_ENV = 'NODE_ENV',
	BASE_HOSTING = 'BASE_HOSTING',

	/* Database MySQL */
	DATABASE_MYSQL_HOST = 'DATABASE_MYSQL_HOST',
	DATABASE_MYSQL_USER = 'DATABASE_MYSQL_USER',
	DATABASE_MYSQL_PASSWORD = 'DATABASE_MYSQL_PASSWORD',
	DATABASE_MYSQL_ROOT_PASSWORD = 'DATABASE_MYSQL_ROOT_PASSWORD',
	DATABASE_MYSQL_DATABASE = 'DATABASE_MYSQL_DATABASE',
	DATABASE_MYSQL_PORT = 'DATABASE_MYSQL_PORT',
	DATABASE_MYSQL_CONNECTION_LIMIT = 'DATABASE_MYSQL_CONNECTION_LIMIT',
	/* Database PostgreSQL */
	DATABASE_POSTGRESQL_HOST = 'DATABASE_POSTGRESQL_HOST',
	DATABASE_POSTGRESQL_USER = 'DATABASE_POSTGRESQL_USER',
	DATABASE_POSTGRESQL_PASSWORD = 'DATABASE_POSTGRESQL_PASSWORD',
	DATABASE_POSTGRESQL_DATABASE = 'DATABASE_POSTGRESQL_DATABASE',
	DATABASE_POSTGRESQL_CONNECTION_LIMIT = 'DATABASE_POSTGRESQL_CONNECTION_LIMIT',
	/* Database MongoDb */
	DATABASE_MONGODB_HOST = 'DATABASE_MONGODB_HOST',
	DATABASE_MONGODB_URI = 'DATABASE_MONGODB_URI',
}
export enum NODE_ENV {
	LOCAL = 'local',
	DEV = 'development',
	PRODUCTION = 'production',
}
export enum ApiVersion {
	V1 = 'v1',
	V2 = 'v2',
	V3 = 'v3',
}
export enum Header {
	ACCESS_CONTROL_ALLOW_HEADERS = 'Access-Control-Allow-Headers',
	ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin',
	ACCESS_CONTROL_ALLOW_METHODS = 'Access-Control-Allow-Methods',
	AUTHORIZATION = 'Authorization',
	CONTENT_TYPE = 'Content-Type',
	USER_AGENT = 'User-Agent',
	X_FORWARDED_FOR = 'x-forwarded-for',
}
export enum HeaderValue {
	ALLOW = '*',
	APPLICATION_JSON = 'application/json',
}
export enum HTTP {
	STATUS_CODE_201 = 201,
	STATUS_CODE_200 = 200,
	STATUS_CODE_400 = 400,
	STATUS_CODE_401 = 401,
	STATUS_CODE_403 = 403,
	STATUS_CODE_404 = 404,
	STATUS_CODE_500 = 500,
}
export enum TAG {
	ERROR_UTIL = 'Util ErrorUtil             | ',
	CONTROLLER_PERSON = 'PersonController           | ',
}

export enum LOG_TYPE {
	INFO = 'info',
	TRACE = 'trace',
	DEBUG = 'debug',
	FATAL = 'fatal',
	WARN = 'warn',
}
export enum LOG_MODE {
	SHORT = 'short',
	LONG = 'long',
	SIMPLE = 'simple',
	JSON = 'json',
	BUNYAN = 'bunyan',
	INSPECT = 'inspect',
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
	SIXTEEN = 16,
	NINE_TEEN = 19,
	TWENTY_THREE = 23,
	TWENTY_FOUR = 24,
	TWENTY_FIVE = 25,
	THIRTY_SIX = 36,
	FIFTY = 50,
	FIFTY_NINE = 59,
	SIXTY = 60,
	EIGHTY = 80,
	ONE_HUNDRED = 100,
	TWO_HUNDRED = 200,
	FIVE_HUNDRED_TWELVE = 512,
	NINE_HUNDRED_NINETY_NINE = 999,
	ONE_THOUSAND_TWENTY_FOUR = 1024,
	TEN_THOUSND = 10000,
	ONE_HUNDRED_THOUSAND = 100000,
	ONE_TRILLION = 1000000000000,
	TEN_CUATRILLION = 10000000000000000,
}
export enum POSITION {
	FIRST = 0,
	SECOND = 1,
}
export enum ProviderTimeout {
	ONE_SECONDS = 1000,
	SEVEN_SECONDS = 1000,
}
export enum BooleanDatabase {
	YES = 'true',
	NO = 'false',
}


export enum YEAR {
	_2023 = 2023,
	_2024 = 2024,
	_2025 = 2025,
	_2026 = 2026,
	_2027 = 2027,
	_2028 = 2028,
	_2029 = 2029,
	_2030 = 2030,
	_2031 = 2031,
	_2032 = 2032,
	_2033 = 2033,
	_2034 = 2034,
	_2035 = 2035,
	_2036 = 2036,
	_2037 = 2037,
	_2038 = 2038,
	_2039 = 2039,
	_2040 = 2040,
	_2041 = 2041,
	_2042 = 2042,
	_2043 = 2043,
	_2044 = 2044,
	_2045 = 2045,
	_2046 = 2046,
	_2047 = 2047,
	_2048 = 2048,
	_2049 = 2049,
	_2050 = 2050,
}
export enum UUID {
	VERSION_1 = '1',
	VERSION_2 = '2',
	VERSION_3 = '3',
	VERSION_4 = '4',
	VERSION_5 = '5',
}
