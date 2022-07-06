import { baseKeymap } from "prosemirror-commands"
import {
    InputRule, inputRules, wrappingInputRule, textblockTypeInputRule,
    smartQuotes, emDash, ellipsis
} from "prosemirror-inputrules"
import { EditorState, Transaction } from 'prosemirror-state'
import { Mark, MarkType, NodeType, Schema } from "prosemirror-model"

/**
 * Build an input rule for automatically marking a string when a given
 * pattern is typed.
 *
 * References:
 * https://github.com/benrbray/prosemirror-math/blob/master/src/plugins/math-inputrules.ts
 * https://github.com/ProseMirror/prosemirror-inputrules/blob/master/src/rulebuilders.js
 */
function markingInputRule(
    pattern,
    markTypeOrMarkTypes
) {
    return new InputRule(
        pattern,
        (state, match, start, end) => {
            let marks = []
            if (Array.isArray(markTypeOrMarkTypes)) {
                const markTypes = markTypeOrMarkTypes
                marks = markTypes.map(mt => mt.create())
            } else {
                const markType = markTypeOrMarkTypes
                marks = [markType.create()]
            }

            const textNode = state.schema.text(match[1], marks)
            let tr = state.tr.replaceRangeWith(start, end, textNode)
            marks.forEach(m => {
                tr = tr.removeStoredMark(m)
            })
            return tr
        }
    )
}

function strongRuleDoubleStars(markType) {
    return markingInputRule(/(?<=[^*\n]|^)\*\*([^*\n]+)\*\*$/, markType);
}

function strongEmphasisRuleTripleStars(strongMarkType, emMarkType) {
    return markingInputRule(/(?<=[^*\n]|^)\*\*\*([^*\n]+)\*\*\*$/, [strongMarkType, emMarkType]);
}

function strongRuleDoubleUnderscores(markType) {
    return markingInputRule(/(?<=[^_\n]|^)__([^_\n]+)__$/, markType);
}

function emphasisSingleStar(markType) {
    return markingInputRule(/(?<=[^*\n]|^)\*([^*\n]+)\*$/, markType);
}

function emphasisSingleUnderscore(markType) {
    return markingInputRule(/(?<=[^_\n]|^)_([^_\n]+)_$/, markType);
}

/// Given a blockquote node type, returns an input rule that turns `"> "`
/// at the start of a textblock into a blockquote.
function blockQuoteRule(nodeType) {
    return wrappingInputRule(/^\s*>\s$/, nodeType)
}

/// Given a list node type, returns an input rule that turns a number
/// followed by a dot at the start of a textblock into an ordered list.
function orderedListRule(nodeType) {
    return wrappingInputRule(/^(\d+)\.\s$/, nodeType, match => ({ order: +match[1] }),
        (match, node) => node.childCount + node.attrs.order == +match[1])
}

/// Given a list node type, returns an input rule that turns a bullet
/// (dash, plush, or asterisk) at the start of a textblock into a
/// bullet list.
function bulletListRule(nodeType) {
    return wrappingInputRule(/^\s*([-+*])\s$/, nodeType)
}

/// Given a code block node type, returns an input rule that turns a
/// textblock starting with three backticks into a code block.
function codeBlockRule(nodeType) {
    return textblockTypeInputRule(/^```$/, nodeType)
}

/// Given a node type and a maximum level, creates an input rule that
/// turns up to that number of `#` characters followed by a space at
/// the start of a textblock into a heading whose level corresponds to
/// the number of `#` signs.
function headingRule(nodeType, maxLevel) {
    return textblockTypeInputRule(new RegExp("^(#{1," + maxLevel + "})\\s$"),
        nodeType, match => ({ level: match[1].length }))
}

/// A set of input rules for creating the basic block quotes, lists,
/// code blocks, and heading.
export function buildInputRules(schema) {
    let rules = smartQuotes.concat(ellipsis, emDash), type
    if (type = schema.nodes.blockquote) rules.push(blockQuoteRule(type))
    if (type = schema.nodes.ordered_list) rules.push(orderedListRule(type))
    if (type = schema.nodes.bullet_list) rules.push(bulletListRule(type))
    if (type = schema.nodes.code_block) rules.push(codeBlockRule(type))
    if (type = schema.nodes.heading) rules.push(headingRule(type, 6))
    if (type = schema.marks.strong) rules.push(strongRuleDoubleStars(type))
    if (type = schema.marks.strong) rules.push(strongRuleDoubleUnderscores(type))
    if (type = schema.marks.em) rules.push(emphasisSingleStar(type))
    if (type = schema.marks.em) rules.push(emphasisSingleUnderscore(type))
    if (schema.marks.strong && schema.marks.em) rules.push(strongEmphasisRuleTripleStars(schema.marks.strong, schema.marks.em))
    return inputRules({ rules })
}