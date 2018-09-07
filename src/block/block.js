/**
 * BLOCK: guten-block-demo
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import classnames from 'classnames';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
} = wp.editor;

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
		src: 'editor-alignleft',
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
	},

	edit: props => {
		const {
			attributes: { textAlignment, message },
			className, setAttributes, isSelected,
		} = props;

		console.log( textAlignment );

		return (
			<div className={ className }>
				{ isSelected &&
				<BlockControls>
					<AlignmentToolbar
						value={ textAlignment }
						onChange={ newValue => setAttributes( { textAlignment: newValue } ) }
					/>
				</BlockControls>
				}
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Enter your message here..', 'jsforwpblocks' ) }
					value={ message }
					style={ { textAlign: textAlignment } }
					onChange={ message => setAttributes( { message } ) }
				/>
			</div>
		);
	},

	save: props => {
		const { textAlignment, message } = props.attributes;
		return (
			<div className="message-body" style={ { textAlign: textAlignment } }>
				{ message }
			</div>
		);
	},
} );
