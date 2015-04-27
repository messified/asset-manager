let ImageUploadFormInput = React.createClass({
	getInitialState() {
		return {
			isFileAdded: false,
			isFileSaving: false,
			fileName: ''
		}
	},
	addFile(event) {
    this.setState({
    	isFileAdded: true,
    	fileName: event.target.files[0].name,
    });
	},
	saveFile() {
		this.setState({
			isFileSaving: true
		});

		$.post( "/api/assets/save", {
			fileName: this.props.page + Math.round(+new Date()/1000)
		}, function(data) {
		  $('#success-modal').modal('show');
		  this.setState({
				isFileSaving: false,
				isFileAdded: false,
				fileName: ''
			});
		}.bind(this));
	},
	mapPageNameToUserFriendlyString() {
		let map = {
			'hl-login-background': 'Hautelook Log In Background',
			'hl-logout-background': 'Hautelook Log Out Background',
			'hl-invites-banner': 'Hautelook Invites Page Banner'
		}

		return map[this.props.page];
	},
	renderSelectionButton() {
		if (this.props.page && !this.state.isFileSaving) {
			return(
				<input type="file" required accept="image/*" onChange={ this.addFile } />
			) 
		}

		return(
			<input type="file" required accept="image/*" disabled className="faded" onChange={ this.addFile } />
		) 
	},

	renderSelectionHelper() {
		if (this.state.isFileAdded && this.state.isFileSaving) {
			return(
				<div>
					<h4 className="no-top-margin">{ this.mapPageNameToUserFriendlyString() }</h4>
					<div>{ this.state.fileName }</div>
					<div className="positive ui loading button">Image Saving</div>
				</div>
			)
		}

		if (this.state.isFileAdded) {
			return(
				<div>
					<h4 className="no-top-margin">{ this.mapPageNameToUserFriendlyString() }</h4>
					<h5>{ this.state.fileName }</h5>
					<div className="positive ui button" onClick={ this.saveFile }>Add Image</div>
				</div>
			)
		}

		if (this.props.page) {
			return(
				<div>
					<h4 className="no-top-margin">{ this.mapPageNameToUserFriendlyString() }</h4>
					<h5>Maximum file size</h5>
					<div>xxx kb</div>
					<h5>Image Dimensions</h5>
					<div>width: xxx px</div>
					<div>height: xxx px</div>
				</div>
			)
		}

		return(
			<div></div>
		)
	},

	render() {
		return(
			<div>
		    <div className="left floated four wide column">
		      <label className="image-input-button">
		        { this.renderSelectionButton() }
		        <div className="ui middle aligned statistic">
		          <div className="value">
		            <img className="image" src="/images/icon_upload.png"></img>
		          </div>
		          <div className="label">
		            Upload Image
		          </div>
		        </div>
		      </label>
		    </div>
		    <div className="left floated four wide column">
		      { this.renderSelectionHelper() }
		    </div>
				<div className="ui modal" id="success-modal">
				  <div className="header">
				    File Saved
				  </div>
				  <div className="content">
				    <div className="description">
				      Your file has been uploaded
				    </div>
				  </div>
				  <div className="actions">
				    <div className="ui button">OK</div>
				  </div>
				</div>
	    </div>
		)
	}

});

let ImageUploadForm = React.createClass({
	getInitialState() {
		return {
			page: ''
		}
	},
  componentDidMount () {
    $('#upload-form-dropdown').dropdown();
  },
  dropdownChanged(event) {
  	var page = $(event.target).data('value');
  	this.setState({
  		page: page
  	});
  },
  renderListItem(item, key) {
    let fileName = item.fileName;
    let pageName = item.pageName;
    let fileSize = item.fileSize;
    let dateUploaded = item.dateUploaded;

    return(
      <tr key={key}>
        <td>
          <div className="ui items">
            <div className="item">
              <div className="image">
                <img src="http://placehold.it/150x150"></img>
              </div>
              <div className="middle aligned content">
                {{fileName}}
              </div>
            </div>
          </div>
        </td>
        <td>{{pageName}}</td>
        <td>{{fileSize}}</td>
        <td>{{dateUploaded}}</td>
      </tr>
    )
  },

  render() {
    return(
      <div className="sixteen wide column">
        <h2>Add an image</h2>
        <h3>
          Step 1. <span className="lightweight-font">Select the destination page for the image</span>
        </h3>
				<div className="ui selection dropdown" id="upload-form-dropdown">
			    <input type="hidden" name="page" />
			    <div className="default text">Select Page</div>
			    <i className="dropdown icon"></i>
			    <div className="menu">
	          <div className="item" data-value="hl-login-background" onClick={ this.dropdownChanged }>Hautelook Log In Background</div>
	          <div className="item" data-value="hl-logout-background" onClick={ this.dropdownChanged }>Hautelook Log Out Background</div>
	          <div className="item" data-value="hl-invites-banner" onClick={ this.dropdownChanged }>Hautelook Invites Page Banner</div>
			    </div>
			  </div>
        <h3 className={this.state.page ? '' : 'faded'}>
          Step 2. <span className="lightweight-font">Upload Image</span>
        </h3>
				<ImageUploadFormInput page={ this.state.page } />
  			<div className="one column clearing row">
  				<div className="ui clearing hidden divider"></div>
  			</div>
        <h2>Uploaded Images</h2>
        <table className="ui very basic table uploaded-images-table">
          <thead>
            <tr>
              <th className="six wide">Image</th>
              <th className="six wide">Page</th>
              <th className="two wide">File Size</th>
              <th className="two wide">Date Added</th>
            </tr>
          </thead>
          <tbody>
            { this.props.assetList.map(this.renderListItem) }
          </tbody>
        </table>
      </div>
    );
  }
});

let ImageUploadFormContainer = React.createClass({
  render() {
    return(
 			<ImageUploadForm assetList={this.props.assetList} />
    );
  }
});

let App = React.createClass({
  getInitialState () {
    return { assetList: assetList };
  },
  render() {
    return (
      <div className="twelve wide centered column">
  			<h1 className="two column row">
  	      <div className="right floated column">Image Upload</div>
  	      <div className="left floated column">
            <img className="ui middle aligned image" src="/images/logos.png"></img>
  				</div>
  	    </h1>
  			<div className="one column row">
  				<div className="ui clearing divider"></div>
  			</div>
        <ImageUploadFormContainer assetList={this.state.assetList} />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('react-app'));
