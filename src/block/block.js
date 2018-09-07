/**
 * BLOCK: guten-block-demo
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import icon from './icon';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

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
		src: icon,
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
	},

	edit: props => {
		const { attributes: { message }, className, setAttributes } = props;
		console.log( 'Output of props.message is -> ', message );

		const onChangeMessage = message => {
			setAttributes( { message } );
		};

		return (
			<div className={ className }>
				<h2>{ __( 'Call to Action', 'jsforwpblocks' ) }</h2>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Add your custom message', 'jsforwpblocks' ) }
					onChange={ newValue => setAttributes( { message: newValue } ) }
					value={ message }
				/>
			</div>
		);
	},

	save: props => {
		const { attributes: { message } } = props;
		return (
			<div>
				<h2>{ __( 'Call to Action', 'jsforwpblocks' ) }</h2>
				<div className="message-body">
					{ message }
				</div>
			</div>
		);
	},
},
);
