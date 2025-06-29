import Logger, {stdSerializers} from "bunyan";
import {LOG_MODE, LOG_TYPE} from "../common/enum";
import format from 'bunyan-format';

type Constructor = new (...args: any[]) => {};

function logClassAndMethod<T extends Constructor>(target: T, methodName?: keyof T): void {
    const className = target.name;
    const methodNameToLog = methodName ? methodName.toString() : '';

    const log = Logger.createLogger({
        name: `=> ${className}`,
        level: LOG_TYPE.INFO,
        stream: format({ outputMode: LOG_MODE.SHORT, levelInString: false }),
        serializers: stdSerializers,
        src: true,
    });
    log.info(` ${methodNameToLog}`);
}

export function logger(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]): any {
        logClassAndMethod(target.constructor, propertyKey);
        return originalMethod.apply(this, args);
    };
}
