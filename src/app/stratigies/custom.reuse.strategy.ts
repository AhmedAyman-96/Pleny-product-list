import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {
    public static handlers: { [key: string]: DetachedRouteHandle } = {}; // routes to reuse/cache

    private static waitDelete: string | null;

    public static deleteRouteSnapshots(): void {
        CustomReuseStrategy.handlers = {};
    }

    public static deleteRouteSnapshot(name: string): void {
        if (CustomReuseStrategy.handlers[name]) {
            delete CustomReuseStrategy.handlers[name];
        } else {
            CustomReuseStrategy.waitDelete = name;
        }
    }

    // decide if the route should be stored
    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (!route) {
            CustomReuseStrategy.deleteRouteSnapshots();
            return false;
        }
        if (route.params && Object.keys(route.params).length > 0) {
            return false; // route has parameters, no storing
        }
        return true;
    }

    // store the information for the route we're destructing
    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        if (
            CustomReuseStrategy.waitDelete &&
            CustomReuseStrategy.waitDelete === this.getRouteUrl(route)
        ) {
            CustomReuseStrategy.waitDelete = null;
            return;
        }
        CustomReuseStrategy.handlers[this.getRouteUrl(route)] = handle;
    }

    // return true if we have a stored route object for the next route
    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!CustomReuseStrategy.handlers[this.getRouteUrl(route)];
    }

    // if we returned true in shouldAttach(), now return the actual route data for restoration
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        if (!route.routeConfig) {
            return null;
        }

        return CustomReuseStrategy.handlers[this.getRouteUrl(route)];
    }

    // reuse the route if we're going to and from the same route
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return (
            future.routeConfig === curr.routeConfig &&
            JSON.stringify(future.params) === JSON.stringify(curr.params)
        );
    }

    // helper method to return a path
    private getRouteUrl(route: any) {
        return route['_routerState'].url.replace(/\//g, '_');
    }
}