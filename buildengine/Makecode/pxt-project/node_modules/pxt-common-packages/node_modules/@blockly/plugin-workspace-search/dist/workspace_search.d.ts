/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as Blockly from 'blockly/core';
/**
 * Class for workspace search.
 */
export declare class WorkspaceSearch implements Blockly.IPositionable {
    private workspace;
    /**
     * The unique id for this component.
     */
    id: string;
    /**
     * HTML container for the search bar.
     */
    private htmlDiv;
    /**
     * The div that holds the search bar actions.
     */
    protected actionDiv: HTMLElement | null;
    /**
     * The text input for the search bar.
     */
    private inputElement;
    /**
     * The placeholder text for the search bar input.
     */
    private textInputPlaceholder;
    /**
     * A list of blocks that came up in the search.
     */
    protected blocks: Blockly.BlockSvg[];
    /**
     * Index of the currently "selected" block in the blocks array.
     */
    protected currentBlockIndex: number;
    /**
     * The search text.
     */
    protected searchText: string;
    /**
     * Whether to search as input changes as opposed to on enter.
     */
    searchOnInput: boolean;
    /**
     * Whether search should be case sensitive.
     */
    caseSensitive: boolean;
    /**
     * Whether search should preserve the currently selected block by default.
     */
    preserveSelected: boolean;
    /**
     * Array holding info needed to unbind events.
     * Used for disposing.
     */
    private boundEvents;
    /**
     * Class for workspace search.
     *
     * @param workspace The workspace the search bar sits in.
     */
    constructor(workspace: Blockly.WorkspaceSvg);
    /**
     * Initializes the workspace search bar.
     */
    init(): void;
    /**
     * Disposes of workspace search.
     * Unlink from all DOM elements and remove all event listeners
     * to prevent memory leaks.
     */
    dispose(): void;
    /**
     * Creates and injects the search bar's DOM.
     */
    protected createDom(): void;
    /**
     * Helper method for adding an event.
     *
     * @param node Node upon which to listen.
     * @param name Event name to listen to (e.g. 'mousedown').
     * @param thisObject The value of 'this' in the function.
     * @param func Function to call when event is triggered.
     */
    private addEvent;
    /**
     * Add a button to the action div. This must be called after the init function
     * has been called.
     *
     * @param btn The button to add the event listener to.
     * @param onClickFn The function to call when the user clicks on
     *     or hits enter on the button.
     */
    addActionBtn(btn: HTMLButtonElement, onClickFn: () => void): void;
    /**
     * Creates the text input for the search bar.
     *
     * @returns A text input for the search bar.
     */
    protected createTextInput(): HTMLInputElement;
    /**
     * Creates the button used to get the next block in the list.
     *
     * @returns The next button.
     */
    protected createNextBtn(): HTMLButtonElement;
    /**
     * Creates the button used to get the previous block in the list.
     *
     * @returns The previous button.
     */
    protected createPreviousBtn(): HTMLButtonElement;
    /**
     * Creates the button used for closing the search bar.
     *
     * @returns A button for closing the search bar.
     */
    protected createCloseBtn(): HTMLButtonElement;
    /**
     * Creates a button for the workspace search bar.
     *
     * @param className The class name for the button.
     * @param text The text to display to the screen reader.
     * @returns The created button.
     */
    private createBtn;
    /**
     * Add event listener for clicking and keydown on the given button.
     *
     * @param btn The button to add the event listener to.
     * @param onClickFn The function to call when the user clicks on
     *      or hits enter on the button.
     */
    private addBtnListener;
    /**
     * Returns the bounding rectangle of the UI element in pixel units relative to
     * the Blockly injection div.
     *
     * @returns The component’s bounding box. Null in this
     *     case since we don't need other elements to avoid the workspace search
     *     field.
     */
    getBoundingRectangle(): Blockly.utils.Rect | null;
    /**
     * Positions the workspace search field.
     * It is positioned in the opposite corner to the corner the
     * categories/toolbox starts at.
     *
     * @param metrics The workspace metrics.
     * @param savedPositions List of rectangles that
     *     are already on the workspace.
     */
    position(metrics: Blockly.MetricsManager.UiMetrics, savedPositions: Blockly.utils.Rect[]): void;
    /**
     * Handles input value change in search bar.
     */
    private onInput;
    /**
     * Handles a key down for the search bar.
     *
     * @param e The key down event.
     */
    private onKeyDown;
    /**
     * Opens the search bar when Control F or Command F are used on the workspace.
     *
     * @param e The key down event.
     */
    private onWorkspaceKeyDown;
    /**
     * Selects the previous block.
     */
    previous(): void;
    /**
     * Selects the next block.
     */
    next(): void;
    /**
     * Sets the placeholder text for the search bar text input.
     *
     * @param placeholderText The placeholder text.
     */
    setSearchPlaceholder(placeholderText: string): void;
    /**
     * Changes the currently "selected" block and adds extra highlight.
     *
     * @param index Index of block to set as current. Number is wrapped.
     */
    protected setCurrentBlock(index: number): void;
    /**
     * Opens the search bar.
     */
    open(): void;
    /**
     * Closes the search bar.
     */
    close(): void;
    /**
     * Shows or hides the workspace search bar.
     *
     * @param show Whether to set the search bar as visible.
     */
    private setVisible;
    /**
     * Searches the workspace for the current search term and highlights matching
     * blocks.
     *
     * @param searchText The search text.
     * @param preserveCurrent Whether to preserve the current block
     *    if it is included in the new matching blocks.
     */
    searchAndHighlight(searchText: string, preserveCurrent?: boolean): void;
    /**
     * Returns pool of blocks to search from.
     *
     * @param workspace The workspace to get blocks from.
     * @returns The search pool of blocks to use.
     */
    private getSearchPool;
    /**
     * Returns whether the given block matches the search text.
     *
     * @param block The block to check.
     * @param searchText The search text. Note if the search is case
     *    insensitive, this will be passed already converted to lowercase letters.
     * @param caseSensitive Whether the search is caseSensitive.
     * @returns True if the block is a match, false otherwise.
     */
    protected isBlockMatch(block: Blockly.BlockSvg, searchText: string, caseSensitive: boolean): boolean;
    /**
     * Returns blocks that match the given search text.
     *
     * @param workspace The workspace to search.
     * @param searchText The search text.
     * @param caseSensitive Whether the search should be case sensitive.
     * @returns The blocks that match the search
     *    text.
     */
    protected getMatchingBlocks(workspace: Blockly.WorkspaceSvg, searchText: string, caseSensitive: boolean): Blockly.BlockSvg[];
    /**
     * Clears the selection group and current block.
     */
    clearBlocks(): void;
    /**
     * Adds "current selection" highlight to the provided block.
     * Highlights the provided block as the "current selection".
     *
     * @param currentBlock The block to highlight.
     */
    protected highlightCurrentSelection(currentBlock: Blockly.BlockSvg): void;
    /**
     * Removes "current selection" highlight from provided block.
     *
     * @param currentBlock The block to unhighlight.
     */
    protected unhighlightCurrentSelection(currentBlock: Blockly.BlockSvg): void;
    /**
     * Adds highlight to the provided blocks.
     *
     * @param blocks The blocks to highlight.
     */
    protected highlightSearchGroup(blocks: Blockly.BlockSvg[]): void;
    /**
     * Removes highlight from the provided blocks.
     *
     * @param blocks The blocks to unhighlight.
     */
    protected unhighlightSearchGroup(blocks: Blockly.BlockSvg[]): void;
}
//# sourceMappingURL=workspace_search.d.ts.map