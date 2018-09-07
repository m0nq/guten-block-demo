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

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

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
	icon: icon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	keywords: [
		__( 'Banner', 'cirquitree' ),
		__( 'CTR', 'cirquitree' ),
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 * @returns a block for the editor
	 */
	edit: props => {
		const { className, isSelected } = props;
		return (
			<div className={ className }>
				<h2>{ __( 'Static Call to Action', 'cirquitree' ) }</h2>
				<p>{ __( 'This is really important!' ) }</p>
				{
					isSelected && <p className="sorry warning">{ __( 'Sorry! You can\'t edit this block' ) }</p>
				}
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 * @returns markup for front end
	 */
	save: props => {
		return (
			<div>
				<h2>{ __( 'Call to Action', 'cirquitree' ) }</h2>
				<p>{ __( 'This is really important!', 'cirquitree' ) }</p>
			</div>
		);
	},
} )
;
