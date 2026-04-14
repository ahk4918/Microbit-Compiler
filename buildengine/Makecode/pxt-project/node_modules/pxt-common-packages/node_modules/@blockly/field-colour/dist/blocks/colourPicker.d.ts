/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Block } from 'blockly/core';
import { JavascriptGenerator, Order as JavascriptOrder } from 'blockly/javascript';
import { DartGenerator, Order as DartOrder } from 'blockly/dart';
import { LuaGenerator, Order as LuaOrder } from 'blockly/lua';
import { PhpGenerator, Order as PhpOrder } from 'blockly/php';
import { PythonGenerator, Order as PythonOrder } from 'blockly/python';
import { Generators } from './generatorsType';
/** The name this block is registered under. */
export declare const BLOCK_NAME = "colour_picker";
/**
 * Javascript block generator function.
 *
 * @param block The Block instance to generate code for.
 * @param generator The JavascriptGenerator calling the function.
 * @returns A tuple containing the code string and precedence.
 */
export declare function toJavascript(block: Block, generator: JavascriptGenerator): [string, JavascriptOrder];
/**
 * Dart block generator function.
 *
 * @param block The Block instance to generate code for.
 * @param generator The DartGenerator calling the function.
 * @returns A tuple containing the code string and precedence.
 */
export declare function toDart(block: Block, generator: DartGenerator): [string, DartOrder];
/**
 * Lua block generator function.
 *
 * @param block The Block instance to generate code for.
 * @param generator The LuaGenerator calling the function.
 * @returns A tuple containing the code string and precedence.
 */
export declare function toLua(block: Block, generator: LuaGenerator): [string, LuaOrder];
/**
 * PHP block generator function.
 *
 * @param block The Block instance to generate code for.
 * @param generator The PhpGenerator calling the function.
 * @returns A tuple containing the code string and precedence.
 */
export declare function toPhp(block: Block, generator: PhpGenerator): [string, PhpOrder];
/**
 * Python block generator function.
 *
 * @param block The Block instance to generate code for.
 * @param generator The PythonGenerator calling the function.
 * @returns A tuple containing the code string and precedence.
 */
export declare function toPython(block: Block, generator: PythonGenerator): [string, PythonOrder];
/** The colour_picker BlockDefinition. */
export declare const blockDefinition: any;
/**
 * Install the `colour_picker` block and all of its dependencies.
 *
 * @param gens The CodeGenerators to install per-block
 *     generators on.
 */
export declare function installBlock(gens?: Generators): void;
//# sourceMappingURL=colourPicker.d.ts.map