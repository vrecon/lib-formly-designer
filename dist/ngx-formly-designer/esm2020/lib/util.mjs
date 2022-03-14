export { cloneDeep, get, set, unset } from 'lodash-es';
const keyPathMemberName = '_formlyDesignerKeyPath';
// Source: https://github.com/formly-js/ngx-formly/blob/master/src/core/src/lib/utils.ts
export function getKeyPath(field) {
    /* We store the keyPath in the field for performance reasons. This function will be called frequently. */
    if (!field[keyPathMemberName] || field[keyPathMemberName].key !== field.key) {
        let keyPath = [];
        if (field.key) {
            /* Also allow for an array key, hence the type check  */
            const pathElements = isArray(field.key) ? field.key : field.key.toString().split('.');
            for (let pathElement of pathElements) {
                if (typeof pathElement === 'string') {
                    /* replace paths of the form names[2] by names.2, cfr. angular formly */
                    pathElement = pathElement.replace(/\[(\w+)\]/g, '.$1');
                    keyPath = keyPath.concat(pathElement.split('.'));
                }
                else {
                    keyPath.push(pathElement);
                }
            }
            for (let i = 0; i < keyPath.length; i++) {
                const pathElement = keyPath[i];
                if (typeof pathElement === 'string' && /^\d+$/.test(pathElement)) {
                    keyPath[i] = parseInt(pathElement, 10);
                }
            }
        }
        field[keyPathMemberName] = {
            key: field.key,
            path: keyPath,
        };
    }
    return field[keyPathMemberName].path.slice();
}
export function equalType(a, b) {
    return (!a.fieldArray === !b.fieldArray) && (!a.fieldGroup === !b.fieldGroup);
}
export const isArray = Array.isArray;
// https://stackoverflow.com/a/28953167
export const isEmpty = (val) => {
    if (val == null) {
        return true;
    }
    else if (typeof val === 'function' || typeof val === 'number' || typeof val === 'boolean' ||
        Object.prototype.toString.call(val) === '[object Date]') {
        return false;
    }
    else if (val.length === 0) { // 0 length array or string
        return true;
    }
    else if (typeof val === 'object') {
        // empty object
        let r = true;
        for (const _ in val)
            r = false;
        return r;
    }
    return false;
};
export const isFunction = (val) => typeof val === 'function';
export const isObject = (val) => val != null && typeof val === 'object';
export const isString = (val) => typeof val === 'string' || val instanceof String;
/** Source:  https://stackoverflow.com/a/8809472 */
export const generateUuid = () => {
    let d = new Date().getTime();
    let d2 = (performance?.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        }
        else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1mb3JtbHktZGVzaWduZXIvc3JjL2xpYi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFdkQsTUFBTSxpQkFBaUIsR0FBRyx3QkFBd0IsQ0FBQztBQUVuRCx3RkFBd0Y7QUFDeEYsTUFBTSxVQUFVLFVBQVUsQ0FBQyxLQUErRTtJQUN4Ryx5R0FBeUc7SUFDekcsSUFBSSxDQUFPLEtBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFVLEtBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3pGLElBQUksT0FBTyxHQUF3QixFQUFFLENBQUM7UUFDdEMsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ2Isd0RBQXdEO1lBQ3hELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RGLEtBQUssSUFBSSxXQUFXLElBQUksWUFBWSxFQUFFO2dCQUNwQyxJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTtvQkFDbkMsd0VBQXdFO29CQUN4RSxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3ZELE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDbEQ7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxX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QyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQ2pFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ3hCO2FBQU07WUFDTCxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0QixFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDMUI7UUFDRCxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuXG5leHBvcnQgeyBjbG9uZURlZXAsIGdldCwgc2V0LCB1bnNldCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbmNvbnN0IGtleVBhdGhNZW1iZXJOYW1lID0gJ19mb3JtbHlEZXNpZ25lcktleVBhdGgnO1xuXG4vLyBTb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtbHktanMvbmd4LWZvcm1seS9ibG9iL21hc3Rlci9zcmMvY29yZS9zcmMvbGliL3V0aWxzLnRzXG5leHBvcnQgZnVuY3Rpb24gZ2V0S2V5UGF0aChmaWVsZDogeyBrZXk/OiBzdHJpbmcgfCBudW1iZXIgfCBzdHJpbmdbXSwgZmllbGRHcm91cD86IGFueSwgZmllbGRBcnJheT86IGFueSB9KTogKHN0cmluZyB8IG51bWJlcilbXSB7XG4gIC8qIFdlIHN0b3JlIHRoZSBrZXlQYXRoIGluIHRoZSBmaWVsZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucy4gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBmcmVxdWVudGx5LiAqL1xuICBpZiAoISg8YW55PmZpZWxkKVtrZXlQYXRoTWVtYmVyTmFtZV0gfHwgKDxhbnk+ZmllbGQpW2tleVBhdGhNZW1iZXJOYW1lXS5rZXkgIT09IGZpZWxkLmtleSkge1xuICAgIGxldCBrZXlQYXRoOiAoc3RyaW5nIHwgbnVtYmVyKVtdID0gW107XG4gICAgaWYgKGZpZWxkLmtleSkge1xuICAgICAgLyogQWxzbyBhbGxvdyBmb3IgYW4gYXJyYXkga2V5LCBoZW5jZSB0aGUgdHlwZSBjaGVjayAgKi9cbiAgICAgIGNvbnN0IHBhdGhFbGVtZW50cyA9IGlzQXJyYXkoZmllbGQua2V5KSA/IGZpZWxkLmtleSA6IGZpZWxkLmtleS50b1N0cmluZygpLnNwbGl0KCcuJyk7XG4gICAgICBmb3IgKGxldCBwYXRoRWxlbWVudCBvZiBwYXRoRWxlbWVudHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXRoRWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAvKiByZXBsYWNlIHBhdGhzIG9mIHRoZSBmb3JtIG5hbWVzWzJdIGJ5IG5hbWVzLjIsIGNmci4gYW5ndWxhciBmb3JtbHkgKi9cbiAgICAgICAgICBwYXRoRWxlbWVudCA9IHBhdGhFbGVtZW50LnJlcGxhY2UoL1xcWyhcXHcrKVxcXS9nLCAnLiQxJyk7XG4gICAgICAgICAga2V5UGF0aCA9IGtleVBhdGguY29uY2F0KHBhdGhFbGVtZW50LnNwbGl0KCcuJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGtleVBhdGgucHVzaChwYXRoRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5UGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwYXRoRWxlbWVudCA9IGtleVBhdGhbaV07XG4gICAgICAgIGlmICh0eXBlb2YgcGF0aEVsZW1lbnQgPT09ICdzdHJpbmcnICYmIC9eXFxkKyQvLnRlc3QocGF0aEVsZW1lbnQpKSB7XG4gICAgICAgICAga2V5UGF0aFtpXSA9IHBhcnNlSW50KHBhdGhFbGVtZW50LCAxMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgKDxhbnk+ZmllbGQpW2tleVBhdGhNZW1iZXJOYW1lXSA9IHtcbiAgICAgIGtleTogZmllbGQua2V5LFxuICAgICAgcGF0aDoga2V5UGF0aCxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuICg8YW55PmZpZWxkKVtrZXlQYXRoTWVtYmVyTmFtZV0ucGF0aC5zbGljZSgpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbFR5cGUoYTogRm9ybWx5RmllbGRDb25maWcsIGI6IEZvcm1seUZpZWxkQ29uZmlnKTogYm9vbGVhbiB7XG4gIHJldHVybiAoIWEuZmllbGRBcnJheSA9PT0gIWIuZmllbGRBcnJheSkgJiYgKCFhLmZpZWxkR3JvdXAgPT09ICFiLmZpZWxkR3JvdXApO1xufVxuXG5leHBvcnQgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yODk1MzE2N1xuZXhwb3J0IGNvbnN0IGlzRW1wdHkgPSAodmFsOiBhbnkpOiBib29sZWFuID0+IHtcbiAgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsID09PSAnYm9vbGVhbicgfHxcbiAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2UgaWYgKHZhbC5sZW5ndGggPT09IDApIHsgLy8gMCBsZW5ndGggYXJyYXkgb3Igc3RyaW5nXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBlbXB0eSBvYmplY3RcblxuICAgIGxldCByID0gdHJ1ZTtcbiAgICBmb3IgKGNvbnN0IF8gaW4gdmFsKVxuICAgICAgciA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHI7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnQgY29uc3QgaXNGdW5jdGlvbiA9ICh2YWw6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcblxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0ID0gKHZhbDogYW55KTogYm9vbGVhbiA9PiB2YWwgIT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JztcblxuZXhwb3J0IGNvbnN0IGlzU3RyaW5nID0gKHZhbDogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyB8fCB2YWwgaW5zdGFuY2VvZiBTdHJpbmc7XG5cbi8qKiBTb3VyY2U6ICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvODgwOTQ3MiAqL1xuZXhwb3J0IGNvbnN0IGdlbmVyYXRlVXVpZCA9ICgpID0+IHtcbiAgbGV0IGQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgbGV0IGQyID0gKHBlcmZvcm1hbmNlPy5ub3cgJiYgKHBlcmZvcm1hbmNlLm5vdygpICogMTAwMCkpIHx8IDA7XG4gIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGMgPT4ge1xuICAgIGxldCByID0gTWF0aC5yYW5kb20oKSAqIDE2O1xuICAgIGlmIChkID4gMCkge1xuICAgICAgciA9IChkICsgcikgJSAxNiB8IDA7XG4gICAgICBkID0gTWF0aC5mbG9vcihkIC8gMTYpO1xuICAgIH0gZWxzZSB7XG4gICAgICByID0gKGQyICsgcikgJSAxNiB8IDA7XG4gICAgICBkMiA9IE1hdGguZmxvb3IoZDIgLyAxNik7XG4gICAgfVxuICAgIHJldHVybiAoYyA9PSAneCcgPyByIDogKHIgJiAweDcgfCAweDgpKS50b1N0cmluZygxNik7XG4gIH0pO1xufTtcbiJdfQ==