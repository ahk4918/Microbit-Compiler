/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export * from './field_colour';
import { Generators } from './blocks/generatorsType';
export * as colourPicker from './blocks/colourPicker';
export * as colourRandom from './blocks/colourRandom';
export * as colourRgb from './blocks/colourRgb';
export * as colourBlend from './blocks/colourBlend';
/**
 * Install all of the blocks defined in this file and all of their
 * dependencies.
 *
 * @param generators The CodeGenerators to install per-block
 *     generators on.
 */
export declare function installAllBlocks(generators?: Generators): void;
//# sourceMappingURL=index.d.ts.map