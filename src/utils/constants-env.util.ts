import {ENV, NODE_ENV} from "../common/enum";
// import 'dotenv/config';

export class Environment {
	/* SERVER CONFIG */
	public static readonly PORT: string = <string>process.env[ENV.PORT];

	public static readonly NODE_ENV: NODE_ENV = <NODE_ENV>process.env[ENV.NODE_ENV]?.trim()?.toLowerCase();

	public static readonly BASE_HOSTING: string = <string>process.env[ENV.BASE_HOSTING];

	/* DATABASE MYSQL */
	declare public static DATABASE_MYSQL_HOST: string;

	declare public static DATABASE_MYSQL_DATABASE: string;

	declare public static DATABASE_MYSQL_USER: string;

	declare public static DATABASE_MYSQL_PASSWORD: string;

	declare public static DATABASE_MYSQL_PORT: number;

	declare public static DATABASE_MYSQL_CONNECTION_LIMIT: number;

	public static load(): void {
		/* DATABASE MYSQL */
		this.DATABASE_MYSQL_HOST = <string>process.env[ENV.DATABASE_MYSQL_HOST];
		this.DATABASE_MYSQL_DATABASE = <string>process.env[ENV.DATABASE_MYSQL_DATABASE];
		this.DATABASE_MYSQL_USER = <string>process.env[ENV.DATABASE_MYSQL_USER];
		this.DATABASE_MYSQL_PASSWORD = <string>process.env[ENV.DATABASE_MYSQL_PASSWORD];
		this.DATABASE_MYSQL_CONNECTION_LIMIT = +(<string>process.env[ENV.DATABASE_MYSQL_CONNECTION_LIMIT]);
		this.DATABASE_MYSQL_PORT = +(<string>process.env[ENV.DATABASE_MYSQL_PORT]);

		/* print all env */
		this.print();
	}

	private static print() {
		console.log(
			'ENV: ',
			Object.entries(Environment).reduce((acc, [key, value]) => {
				acc[key] = value;
				return acc;
			}, {}),
		);
	}
}
