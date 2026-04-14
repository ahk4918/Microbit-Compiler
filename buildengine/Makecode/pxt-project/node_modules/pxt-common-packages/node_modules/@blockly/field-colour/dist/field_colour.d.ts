/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Colour input field.
 */
import * as Blockly from 'blockly/core';
/**
 * Class for a colour input field.
 */
export declare class FieldColour extends Blockly.Field<string> {
    /** The field's colour picker element. */
    private picker;
    /** Index of the currently highlighted element. */
    private highlightedIndex;
    /**
     * Array holding info needed to unbind events.
     * Used for disposing.
     * Ex: [[node, name, func], [node, name, func]].
     */
    private boundEvents;
    /**
     * Serializable fields are saved by the serializer, non-serializable fields
     * are not.  Editable fields should also be serializable.
     */
    SERIALIZABLE: boolean;
    /** Mouse cursor style when over the hotspot that initiates the editor. */
    CURSOR: string;
    /**
     * Used to tell if the field needs to be rendered the next time the block is
     * rendered.  Colour fields are statically sized, and only need to be
     * rendered at initialization.
     */
    protected isDirty_: boolean;
    /**
     * An array of colour strings for the palette.
     * Copied from goog.ui.ColorPicker.SIMPLE_GRID_COLORS
     */
    private colours;
    /**
     * An array of tooltip strings for the palette.  If not the same length as
     * COLOURS, the colour's hex code will be used for any missing titles.
     */
    private titles;
    /**
     * Number of columns in the palette.
     */
    private columns;
    /**
     * @param value The initial value of the field.  Should be in '#rrggbb'
     *     format.  Defaults to the first value in the default colour array.  Also
     *     accepts Field.SKIP_SETUP if you wish to skip setup (only used by
     *     subclasses that want to handle configuration and setting the field
     *     value after their own constructors have run).
     * @param validator A function that is called to validate changes to the
     *     field's value.  Takes in a colour string & returns a validated colour
     *     string ('#rrggbb' format), or null to abort the change.
     * @param config A map of options used to configure the field.
     *     See the [field creation documentation]{@link
     * https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/colour}
     * for a list of properties this parameter supports.
     */
    constructor(value?: string | typeof Blockly.Field.SKIP_SETUP, validator?: FieldColourValidator, config?: FieldColourConfig);
    /**
     * Configure the field based on the given map of options.
     *
     * @param config A map of options to configure the field based on.
     */
    protected configure_(config: FieldColourConfig): void;
    /**
     * Create the block UI for this colour field.
     *
     * @internal
     */
    initView(): void;
    /**
     * Defines whether this field should take up the full block or not.
     *
     * @returns True if this field should take up the full block. False otherwise.
     */
    protected isFullBlockField(): boolean;
    /**
     * @returns True if the source block is a value block with a single editable
     *     field.
     * @internal
     */
    blockIsSimpleReporter(): boolean;
    /**
     * Updates text field to match the colour/style of the block.
     *
     * @internal
     */
    applyColour(): void;
    /**
     * Returns the height and width of the field.
     *
     * This should *in general* be the only place render_ gets called from.
     *
     * @returns Height and width.
     */
    getSize(): Blockly.utils.Size;
    /**
     * Updates the colour of the block to reflect whether this is a full
     * block field or not.
     */
    protected render_(): void;
    /**
     * Updates the size of the field based on whether it is a full block field
     * or not.
     *
     * @param margin margin to use when positioning the field.
     */
    protected updateSize_(margin?: number): void;
    /**
     * Ensure that the input value is a valid colour.
     *
     * @param newValue The input value.
     * @returns A valid colour, or null if invalid.
     */
    protected doClassValidation_(newValue: string): string | null | undefined;
    protected doClassValidation_(newValue?: string): string | null;
    /**
     * Get the text for this field.  Used when the block is collapsed.
     *
     * @returns Text representing the value of this field.
     */
    getText(): string;
    /**
     * Set a custom colour grid for this field.
     *
     * @param colours Array of colours for this block, or null to use default
     *     (FieldColour.COLOURS).
     * @param titles Optional array of colour tooltips, or null to use default
     *     (FieldColour.TITLES).
     * @returns Returns itself (for method chaining).
     */
    setColours(colours: string[], titles?: string[]): FieldColour;
    /**
     * Set a custom grid size for this field.
     *
     * @param columns Number of columns for this block, or 0 to use default
     *     (FieldColour.COLUMNS).
     * @returns Returns itself (for method chaining).
     */
    setColumns(columns: number): FieldColour;
    /** Create and show the colour field's editor. */
    protected showEditor_(): void;
    /**
     * Handle a click on a colour cell.
     *
     * @param e Mouse event.
     */
    private onClick;
    /**
     * Handle a key down event.  Navigate around the grid with the
     * arrow keys.  Enter selects the highlighted colour.
     *
     * @param e Keyboard event.
     */
    private onKeyDown;
    /**
     * Move the currently highlighted position by dx and dy.
     *
     * @param dx Change of x.
     * @param dy Change of y.
     */
    private moveHighlightBy;
    /**
     * Handle a mouse move event.  Highlight the hovered colour.
     *
     * @param e Mouse event.
     */
    private onMouseMove;
    /** Handle a mouse enter event.  Focus the picker. */
    private onMouseEnter;
    /**
     * Handle a mouse leave event.  Blur the picker and unhighlight
     * the currently highlighted colour.
     */
    private onMouseLeave;
    /**
     * Returns the currently highlighted item (if any).
     *
     * @returns Highlighted item (null if none).
     */
    private getHighlighted;
    /**
     * Update the currently highlighted cell.
     *
     * @param cell The new cell to highlight.
     * @param index The index of the new cell.
     */
    private setHighlightedCell;
    /** Create a colour picker dropdown editor. */
    private dropdownCreate;
    /** Disposes of events and DOM-references belonging to the colour editor. */
    private dropdownDispose;
    /**
     * Construct a FieldColour from a JSON arg object.
     *
     * @param options A JSON object with options (colour).
     * @returns The new field instance.
     * @nocollapse
     * @internal
     */
    static fromJson(options: FieldColourFromJsonConfig): FieldColour;
}
/**
 * Register the field and any dependencies.
 */
export declare function registerFieldColour(): void;
/**
 * Config options for the colour field.
 */
export interface FieldColourConfig extends Blockly.FieldConfig {
    colourOptions?: string[];
    colourTitles?: string[];
    columns?: number;
}
/**
 * fromJson config options for the colour field.
 */
export interface FieldColourFromJsonConfig extends FieldColourConfig {
    colour?: string;
}
/**
 * A function that is called to validate changes to the field's value before
 * they are set.
 *
 * @see {@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/validators#return_values}
 * @param newValue The value to be validated.
 * @returns One of three instructions for setting the new value: `T`, `null`,
 * or `undefined`.
 *
 * - `T` to set this function's returned value instead of `newValue`.
 *
 * - `null` to invoke `doValueInvalid_` and not set a value.
 *
 * - `undefined` to set `newValue` as is.
 */
export type FieldColourValidator = Blockly.FieldValidator<string>;
//# sourceMappingURL=field_colour.d.ts.map