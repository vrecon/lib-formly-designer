import { FormlyFieldConfig } from '@ngx-formly/core';
export { cloneDeep, get, set, unset } from 'lodash-es';
export declare function getKeyPath(field: {
    key?: string | number | string[];
    fieldGroup?: any;
    fieldArray?: any;
}): (string | number)[];
export declare function equalType(a: FormlyFieldConfig, b: FormlyFieldConfig): boolean;
export declare const isArray: (arg: any) => arg is any[];
export declare const isEmpty: (val: any) => boolean;
export declare const isFunction: (val: any) => boolean;
export declare const isObject: (val: any) => boolean;
export declare const isString: (val: any) => boolean;
/** Source:  https://stackoverflow.com/a/8809472 */
export declare const generateUuid: () => string;
