/**
 * @module botbuilder-dialogs-declarative
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */


import { debug } from "util";
import { IResource } from "./resource";

const path = require('path');
const fs = require('fs');

export interface IResourceProvider {
    id(): string;
    getResource(id: string): Promise<IResource>;
    getResources(ex: string): Promise<IResource[]>;
}