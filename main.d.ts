declare const components: {
    [key: string]: any;
};
declare function install(app: any): void;
declare const plugin: {
    install: typeof install;
};
export { components, plugin, plugin as default, };
