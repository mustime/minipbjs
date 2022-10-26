/*
 * Copyright (c) 2022, Irvin Pang <halo.irvin@gmail.com>
 * All rights reserved.
 * 
 * licensed under the MIT License
 */

import protobuf from 'protobufjs';

export default abstract class RootVisitor {
    protected _exclusiveNamespaces: string[];

    public set exclude(list: string[]) {
        this._exclusiveNamespaces = list;
    }

    public visit(root: protobuf.Root): void {
        // resolve before visit
        root.resolveAll();

        // fix exclude list with --root prefix
        let list = this._exclusiveNamespaces.concat();
        for (let name of list) {
            this._exclusiveNamespaces.push(`${root.name}.${name}`);
        }

        this._onEnterRoot(root);
        this._visitNamespace(root, true);
        this._onExitRoot(root);
    }

    protected _visitNamespace(ns: protobuf.NamespaceBase, isLastOne: boolean): void {
        if (!ns.name) throw new Error('namespace needs a name');
        if (this._exclusiveNamespaces.includes(ns.fullName)) return;

        this._onEnterNamespace(ns, isLastOne);
        if (ns.nestedArray.length) {
            this._visitNested(ns);
        }
        this._onExitNamespace(ns, isLastOne);
    }

    protected _visitNested(ns: protobuf.NamespaceBase): void {
        this._onEnterNested(ns, true);
        // sort before iteration to avoid meanless modification to VCS
        ns.nestedArray.sort((a, b) => a.name.localeCompare(b.name));
        ns.nestedArray.forEach((nested, index, arr) => {
            const isLastOne = index === arr.length - 1;
            if (nested instanceof protobuf.Type) {
                this._visitType(nested, isLastOne);
            } else if (nested instanceof protobuf.Service) {
                this._visitService(nested, isLastOne);
            } else if (nested instanceof protobuf.Enum) {
                this._visitEnum(nested, isLastOne);
            } else if (nested instanceof protobuf.Namespace) {
                this._visitNamespace(nested, isLastOne);
            } else {
                console.warn(`nested type ${nested.fullName} is not support yet.`);
            }
        });
        this._onExitNested(ns, true);
    }

    protected _visitType(type: protobuf.Type, isLastOne: boolean) {
        this._onEnterType(type, isLastOne);
        // type itself, is a namespace. check its nested types
        if (type.nestedArray.length) {
            this._visitNested(type);
        }
        this._onExitType(type, isLastOne);
    }

    protected _visitService(service: protobuf.Service, isLastOne: boolean) {
        this._onEnterService(service, isLastOne);
        this._onExitService(service, isLastOne);
    }

    protected _visitEnum(e: protobuf.Enum, isLastOne: boolean) {
        this._onEnterEnum(e, isLastOne);
        this._onExitEnum(e, isLastOne);
    }

    protected _onEnterRoot(root: protobuf.Root): void { /* EMPTY */ }
    protected _onExitRoot(root: protobuf.Root): void { /* EMPTY */ }

    protected _onEnterNamespace(ns: protobuf.NamespaceBase, isLastOne: boolean): void { /* EMPTY */ }
    protected _onExitNamespace(ns: protobuf.NamespaceBase, isLastOne: boolean): void { /* EMPTY */ }

    protected _onEnterNested(ns: protobuf.NamespaceBase, isLastOne: boolean): void { /* EMPTY */ }
    protected _onExitNested(ns: protobuf.NamespaceBase, isLastOne: boolean): void { /* EMPTY */ }

    protected _onEnterType(type: protobuf.Type, isLastOne: boolean): void { /* EMPTY */ }
    protected _onExitType(type: protobuf.Type, isLastOne: boolean): void { /* EMPTY */ }

    protected _onEnterService(service: protobuf.Service, isLastOne: boolean): void { /* EMPTY */ }
    protected _onExitService(service: protobuf.Service, isLastOne: boolean): void { /* EMPTY */ }

    protected _onEnterEnum(e: protobuf.Enum, isLastOne: boolean): void { /* EMPTY */ }
    protected _onExitEnum(e: protobuf.Enum, isLastOne: boolean): void { /* EMPTY */ }
}