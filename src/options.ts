/*
 * Copyright (c) 2021-2022, Irvin Pang <halo.irvin@gmail.com>
 * All rights reserved.
 * 
 * licensed under the MIT License
 */

export default interface IOptions {
    create?: boolean;
    decode?: boolean;
    encode?: boolean;
    delimited?: boolean;
    verify?: boolean;
    convert?: boolean;
    es6?: boolean;
    root?: string;
    comments?: boolean;
    forceLong?: boolean;
    forceNumber?: boolean;
    forceMessage?: boolean;
    forceEnumString?: boolean;
}