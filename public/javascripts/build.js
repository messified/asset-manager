'use strict';

var ImageUploadFormInput = React.createClass({
	displayName: 'ImageUploadFormInput',

	getInitialState: function getInitialState() {
		return {
			isFileAdded: false,
			isFileSaving: false,
			fileName: ''
		};
	},
	addFile: function addFile(event) {
		this.setState({
			isFileAdded: true,
			fileName: event.target.files[0].name });
	},
	saveFile: function saveFile() {
		this.setState({
			isFileSaving: true
		});

		$.post('/api/assets/save', {
			fileName: this.props.page + Math.round(+new Date() / 1000)
		}, (function (data) {
			$('#success-modal').modal('show');
			this.setState({
				isFileSaving: false,
				isFileAdded: false,
				fileName: ''
			});
		}).bind(this));
	},
	mapPageNameToUserFriendlyString: function mapPageNameToUserFriendlyString() {
		var map = {
			'hl-login-background': 'Hautelook Log In Background',
			'hl-logout-background': 'Hautelook Log Out Background',
			'hl-invites-banner': 'Hautelook Invites Page Banner'
		};

		return map[this.props.page];
	},
	renderSelectionButton: function renderSelectionButton() {
		if (this.props.page && !this.state.isFileSaving) {
			return React.createElement('input', { type: 'file', required: true, accept: 'image/*', onChange: this.addFile });
		}

		return React.createElement('input', { type: 'file', required: true, accept: 'image/*', disabled: true, className: 'faded', onChange: this.addFile });
	},

	renderSelectionHelper: function renderSelectionHelper() {
		if (this.state.isFileAdded && this.state.isFileSaving) {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h4',
					{ className: 'no-top-margin' },
					this.mapPageNameToUserFriendlyString()
				),
				React.createElement(
					'div',
					null,
					this.state.fileName
				),
				React.createElement(
					'div',
					{ className: 'positive ui loading button' },
					'Image Saving'
				)
			);
		}

		if (this.state.isFileAdded) {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h4',
					{ className: 'no-top-margin' },
					this.mapPageNameToUserFriendlyString()
				),
				React.createElement(
					'h5',
					null,
					this.state.fileName
				),
				React.createElement(
					'div',
					{ className: 'positive ui button', onClick: this.saveFile },
					'Add Image'
				)
			);
		}

		if (this.props.page) {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h4',
					{ className: 'no-top-margin' },
					this.mapPageNameToUserFriendlyString()
				),
				React.createElement(
					'h5',
					null,
					'Maximum file size'
				),
				React.createElement(
					'div',
					null,
					'xxx kb'
				),
				React.createElement(
					'h5',
					null,
					'Image Dimensions'
				),
				React.createElement(
					'div',
					null,
					'width: xxx px'
				),
				React.createElement(
					'div',
					null,
					'height: xxx px'
				)
			);
		}

		return React.createElement('div', null);
	},

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: 'left floated four wide column' },
				React.createElement(
					'label',
					{ className: 'image-input-button' },
					this.renderSelectionButton(),
					React.createElement(
						'div',
						{ className: 'ui middle aligned statistic' },
						React.createElement(
							'div',
							{ className: 'value' },
							React.createElement('img', { className: 'image', src: '/images/icon_upload.png' })
						),
						React.createElement(
							'div',
							{ className: 'label' },
							'Upload Image'
						)
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'left floated four wide column' },
				this.renderSelectionHelper()
			),
			React.createElement(
				'div',
				{ className: 'ui modal', id: 'success-modal' },
				React.createElement(
					'div',
					{ className: 'header' },
					'File Saved'
				),
				React.createElement(
					'div',
					{ className: 'content' },
					React.createElement(
						'div',
						{ className: 'description' },
						'Your file has been uploaded'
					)
				),
				React.createElement(
					'div',
					{ className: 'actions' },
					React.createElement(
						'div',
						{ className: 'ui button' },
						'OK'
					)
				)
			)
		);
	}

});

var ImageUploadForm = React.createClass({
	displayName: 'ImageUploadForm',

	getInitialState: function getInitialState() {
		return {
			page: ''
		};
	},
	componentDidMount: function componentDidMount() {
		$('#upload-form-dropdown').dropdown();
	},
	dropdownChanged: function dropdownChanged(event) {
		var page = $(event.target).data('value');
		this.setState({
			page: page
		});
	},
	renderListItem: function renderListItem(item, key) {
		var fileName = item.fileName;
		var pageName = item.pageName;
		var fileSize = item.fileSize;
		var dateUploaded = item.dateUploaded;

		return React.createElement(
			'tr',
			{ key: key },
			React.createElement(
				'td',
				null,
				React.createElement(
					'div',
					{ className: 'ui items' },
					React.createElement(
						'div',
						{ className: 'item' },
						React.createElement(
							'div',
							{ className: 'image' },
							React.createElement('img', { src: 'http://placehold.it/150x150' })
						),
						React.createElement(
							'div',
							{ className: 'middle aligned content' },
							{ fileName: fileName }
						)
					)
				)
			),
			React.createElement(
				'td',
				null,
				{ pageName: pageName }
			),
			React.createElement(
				'td',
				null,
				{ fileSize: fileSize }
			),
			React.createElement(
				'td',
				null,
				{ dateUploaded: dateUploaded }
			)
		);
	},

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'sixteen wide column' },
			React.createElement(
				'h2',
				null,
				'Add an image'
			),
			React.createElement(
				'h3',
				null,
				'Step 1. ',
				React.createElement(
					'span',
					{ className: 'lightweight-font' },
					'Select the destination page for the image'
				)
			),
			React.createElement(
				'div',
				{ className: 'ui selection dropdown', id: 'upload-form-dropdown' },
				React.createElement('input', { type: 'hidden', name: 'page' }),
				React.createElement(
					'div',
					{ className: 'default text' },
					'Select Page'
				),
				React.createElement('i', { className: 'dropdown icon' }),
				React.createElement(
					'div',
					{ className: 'menu' },
					React.createElement(
						'div',
						{ className: 'item', 'data-value': 'hl-login-background', onClick: this.dropdownChanged },
						'Hautelook Log In Background'
					),
					React.createElement(
						'div',
						{ className: 'item', 'data-value': 'hl-logout-background', onClick: this.dropdownChanged },
						'Hautelook Log Out Background'
					),
					React.createElement(
						'div',
						{ className: 'item', 'data-value': 'hl-invites-banner', onClick: this.dropdownChanged },
						'Hautelook Invites Page Banner'
					)
				)
			),
			React.createElement(
				'h3',
				{ className: this.state.page ? '' : 'faded' },
				'Step 2. ',
				React.createElement(
					'span',
					{ className: 'lightweight-font' },
					'Upload Image'
				)
			),
			React.createElement(ImageUploadFormInput, { page: this.state.page }),
			React.createElement(
				'div',
				{ className: 'one column clearing row' },
				React.createElement('div', { className: 'ui clearing hidden divider' })
			),
			React.createElement(
				'h2',
				null,
				'Uploaded Images'
			),
			React.createElement(
				'table',
				{ className: 'ui very basic table uploaded-images-table' },
				React.createElement(
					'thead',
					null,
					React.createElement(
						'tr',
						null,
						React.createElement(
							'th',
							{ className: 'six wide' },
							'Image'
						),
						React.createElement(
							'th',
							{ className: 'six wide' },
							'Page'
						),
						React.createElement(
							'th',
							{ className: 'two wide' },
							'File Size'
						),
						React.createElement(
							'th',
							{ className: 'two wide' },
							'Date Added'
						)
					)
				),
				React.createElement(
					'tbody',
					null,
					this.props.assetList.map(this.renderListItem)
				)
			)
		);
	}
});

var ImageUploadFormContainer = React.createClass({
	displayName: 'ImageUploadFormContainer',

	render: function render() {
		return React.createElement(ImageUploadForm, { assetList: this.props.assetList });
	}
});

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return { assetList: assetList };
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'twelve wide centered column' },
			React.createElement(
				'h1',
				{ className: 'two column row' },
				React.createElement(
					'div',
					{ className: 'right floated column' },
					'Image Upload'
				),
				React.createElement(
					'div',
					{ className: 'left floated column' },
					React.createElement('img', { className: 'ui middle aligned image', src: '/images/logos.png' })
				)
			),
			React.createElement(
				'div',
				{ className: 'one column row' },
				React.createElement('div', { className: 'ui clearing divider' })
			),
			React.createElement(ImageUploadFormContainer, { assetList: this.state.assetList })
		);
	}
});

React.render(React.createElement(App, null), document.getElementById('react-app'));
//# sourceMappingURL=build.js.map