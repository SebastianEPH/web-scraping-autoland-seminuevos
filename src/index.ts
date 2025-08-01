import 'reflect-metadata';
import { Container } from 'inversify';
import { createContainer } from './container';
import { TYPES } from './type';
import { Controller } from './controller/controller';
import { Environment } from './utils/constants-env.util';
Environment.load();

const container: Container = createContainer();
const isntancia = container.get<Controller>(TYPES.Handler);
isntancia.generateData();

// isntancia.testSaveDatabase().catch((err) => {
// 	console.log(err);
// });

// import { AutolandSeminuevosModel } from './models/autoland-seminuevos.model';
// import { VehiclesAutoLandInformation } from './interface/autoland-provider.interface';

// ddd.forEach((vahicule) => {
// 	// console.log(vahicule.marca)v 361958
// 	// if (vahicule.id ===361958) {
// 	console.log(new AutolandSeminuevosModel().fromWeb(vahicule));
// 	// }
// });
