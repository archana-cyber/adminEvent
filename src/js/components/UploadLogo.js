import React, { Component } from 'react'
import { CustomInput, Spinner } from 'reactstrap';
// import headLogo from './../../../../source/images/icon-cobranding.png';
import headLogo from "../../images/avibraLogo.svg"

class UploadLogo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedImage: '',
            logoUpdateSuccessfully: false,
            logoUpdateError: false,
            logoUploading: false,
            showLogoPreview: false
        }
    }

    componentDidMount() {
        if (this.props.logoUrl) {
            this.setState({ showLogoPreview: true })
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.logoUrl && !nextProps.logoUrl.startsWith("data:")) {
            this.setState({ selectedImage: "" })
        }
    }

    handleUploadLogo() {
        const { selectedImage } = this.state;
        if (selectedImage !== '') {
            this.setState({ selectedImage: '', logoUpdateSuccessfully: true, logoUpdateError: false })
        }
    }
    onFileImgSelect(event, field) {
        this.setState({ logoUploading: true, logoUpdateError: false })
        let fsize = event.target.files[0].size;
        let file_size = 0;
        if (fsize >= 1024) {
            file_size = Math.round((fsize / 1024));

            if (file_size <= 150) {
                event.preventDefault();
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    this.setState({
                        selectedImage: reader.result,
                        showLogoPreview: true
                    }, () => {
                        //this.handleUploadLogo();
                        console.log('this.state.selectedImage',event.target, this.state.selectedImage)
                        // this.props.setSelectedLogoImage(event.target.value)
                    });
                }
                this.props.setSelectedLogoImage(event.target.value)
            } else {
                this.setState({ logoUpdateSuccessfully: false, logoUpdateError: true, logoUploading: false })

            }
        } else {
            this.setState({ logoUpdateSuccessfully: false, logoUpdateError: true, logoUploading: false })

        }
    }
   
    render() {
        const { agentData, updateLogoStatus, logoUrl, id } = this.props;
        const { logoUpdateSuccessfully, logoUpdateError, logoUploading, selectedImage, showLogoPreview } = this.state;
        return (
            <div style={{ marginTop: '10px' }}>
                {/* <div className="logo-form-group-outline" style={{ marginBottom: '5px', color: 'rgba(0, 0, 0, 0.54)' }}>
                    {logoUrl ? <img src={logoUrl} height="35" /> : null}
                </div> */}
                <div>
                <div style={{ display: showLogoPreview ? 'block' : 'none' }}>
                        {(selectedImage == '' && logoUrl == '') ? null :
                            <div style={styles.previewUpdateLogo}>
                                <h6 style={{ color: 'grey' }}>Preview</h6>
                                <div style={{ width: '300px', margin: '0 auto' }}>
                                    <div style={{ float: 'left', width: '130px', height: "35px", textAlign: 'right' }}><img src={selectedImage || logoUrl + "?time=" + new Date()} className="img-preview" height="35" style={{ maxWidth: '130px' }} /></div>
                                        {/* <div style={{ float: 'left', width: '15px', height: "35px", fontWeight: 'bold', paddingTop: '10px', marginLeft: '10px', marginRight: '10px' }}>+</div> */}
                                        {/* <div style={{ float: 'left', width: '130px', height: "35px", textAlign: 'left' }}><img src={headLogo} height="35" /></div> */}
                                </div>
                            </div>
                        }
                    </div>
                    <CustomInput key={id} type="file" id="agencyLogoFileBrowser" name="agencyLogo" label="Upload your Logo"
                        onChange={(e) => this.onFileImgSelect(e, 'agencyLogo')} onClick={e => (e.target.value = null)} accept=".jpeg, .png, .jpg" />
                   
                    <div style={{ marginTop: '3px' }}>
                        {/*logoUploading ? <div><Spinner color="secondary" style={{width:'15px',height:'15px'}} /> Uploding...</div> : null*/}
                        {/* {updateLogoStatus == 'updated' && logoUpdateSuccessfully ? <div style={{ color: 'green' }}>Logo updated Successfully.</div> : null}
                        {updateLogoStatus == 'failed' && logoUpdateSuccessfully ? <div style={{ color: 'red' }}>Logo upload failed.</div> : null} */}
                        {logoUpdateError ? <div style={{ color: 'red' }}>Image file size must be less than 150kb.</div> : null}
                    </div>
                   
                </div>
            </div>
        )
    }
}
const styles = {
    previewUpdateLogo: {
        margin: '20px auto 10px',
        textAlign: 'center',
        height: '85px'
    }
}

export default UploadLogo;