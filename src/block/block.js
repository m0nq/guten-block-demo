/**
 * BLOCK: guten-block-demo
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import classnames from 'classnames';
import icon from './icon';
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.editor;
const {
	Dashicon,
	Toolbar,
	Button,
	Tooltip,
} = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @returns {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'crt/block-guten-block-demo', {
		title: __( 'Example - Block', 'cirquitree' ), // Block title.
		description: __( 'Demo for working with and understanding Gutenberg blocks for WP', 'cirquitree' ),
		category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
		icon: {
			background: 'rgba(254, 243, 224, 0.52)',
			src: 'align-none',
		}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
		keywords: [
			__( 'Banner', 'cirquitree' ),
			__( 'CTR', 'cirquitree' ),
			__( 'Message', 'cirquitree' ),
		],

		attributes: {
			message: {
				type: 'array',
				source: 'children',
				selector: '.message-body',
			},
			textAlignment: {
				type: 'string',
			},
			blockAlignment: {
				type: 'string',
				default: 'wide',
			},
		},

		getEditWrapperProps( { blockAlignment } ) {
			if ('left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment) {
				return { 'data-align': blockAlignment };
			}
		},

		edit: props => {
			const {
				attributes: {
					textAlignment,
					blockAlignment,
					message,
				}, className,
				setAttributes,
			} = props;

			return (
				<div className={className}>
					<BlockControls>
						<BlockAlignmentToolbar
							value={blockAlignment}
							onChange={newValue => setAttributes( { blockAlignment: newValue } )}
						/>
						<AlignmentToolbar
							value={textAlignment}
							onChange={newValue => setAttributes( { textAlignment: newValue } )}
						/>
					</BlockControls>
					<RichText
						tagName="div"
						multiline="p"
						placeholder={__( 'Enter your message here..', 'cirquitree' )}
						value={message}
						style={{ textAlign: textAlignment }}
					/>
				</div>
			);
		},

		save: props => {
			const { blockAlignment, textAlignment, message } = props.attributes;
			return (
				<div
					className={classnames(
						`align${ blockAlignment }`,
						'message-body',
					)}
					style={{ textAlign: textAlignment }}
				>
					{message}
				</div>
			);
		},
	},
);
