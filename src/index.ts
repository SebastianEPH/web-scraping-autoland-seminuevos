import 'reflect-metadata';
import { Container } from 'inversify';
import { createContainer } from './container';
import { TYPES } from './type';
import { Controller } from './controller/controller';

const container: Container = createContainer();
const isntancia = container.get<Controller>(TYPES.Handler);
isntancia.generateData();
