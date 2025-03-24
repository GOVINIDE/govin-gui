// import PropTypes from 'prop-types';
// import React from 'react';
// import bindAll from 'lodash.bindall';

// import {connect} from 'react-redux';
// import {compose} from 'redux';
// import {injectIntl} from 'react-intl';

// import VM from 'openblock-vm';


// import {STAGE_SIZE_MODES} from '../lib/layout-constants';
// import {openUploadProgress} from '../reducers/modals';
// import {showAlertWithTimeout} from '../reducers/alerts';
// import HardwareHeaderComponentTest from '../components/hardware-header-test/hardware-header-test.jsx';


// class HardwareHeaderTest extends React.Component {
//     constructor (props) {
//         super(props);
//         bindAll(this, [
//             'handleUpload'
//         ]);
//     }

//     handleUpload() {
//         if (this.props.peripheralName) {
//             console.log('deviceid',this.props.codeEditorValue)
//             this.props.vm.uploadToPeripheral(this.props.deviceId, this.props.codeEditorValue);
//             this.props.onOpenUploadProgress();
//         } else {
//             this.props.onNoPeripheralIsConnected();
//         }
//     }
    

//     render () {
//         const {
//             ...props
//         } = this.props;
//         return (
//             <HardwareHeaderComponentTest
//                 onUpload={this.handleUpload}
//                 {...props}
//             />
//         );
//     }
// }

// HardwareHeaderTest.propTypes = {
//     codeEditorValue: PropTypes.string,
//     deviceId: PropTypes.string,
//     onNoPeripheralIsConnected: PropTypes.func.isRequired,
//     onOpenUploadProgress: PropTypes.func,
//     onWorkspaceIsEmpty: PropTypes.func.isRequired,
//     peripheralName: PropTypes.string,
//     stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
//     vm: PropTypes.instanceOf(VM).isRequired
// };

// const mapStateToProps = state => ({
//     codeEditorValue: state.scratchGui.code.codeEditorValue,
    

//     deviceId: state.scratchGui.device.deviceId,
//     peripheralName: state.scratchGui.connectionModal.peripheralName,
//     stageSizeMode: state.scratchGui.stageSize.stageSize
// });

// const mapDispatchToProps = dispatch => ({
//     onNoPeripheralIsConnected: () => showAlertWithTimeout(dispatch, 'connectAPeripheralFirst'),
//     onOpenUploadProgress: () => dispatch(openUploadProgress()),
//     onWorkspaceIsEmpty: () => showAlertWithTimeout(dispatch, 'workspaceIsEmpty')
// });

// export default compose(
//     injectIntl,
//     connect(
//         mapStateToProps,
//         mapDispatchToProps
//     )
// )(HardwareHeaderTest);

//v2.0.3 CARES

import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {injectIntl} from 'react-intl';

import { saveAs } from 'file-saver';

import VM from 'openblock-vm';


import {STAGE_SIZE_MODES} from '../lib/layout-constants';
import {openUploadProgress} from '../reducers/modals';
import {showAlertWithTimeout} from '../reducers/alerts';
import HardwareHeaderComponentTest from '../components/hardware-header-test/hardware-header-test.jsx';


class HardwareHeaderTest extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleUpload','handleRun','handleOpen'
        ]);
    }

    handleUpload() {
        if (this.props.peripheralName) {
            console.log('deviceid',this.props.codeEditorValue)
            this.props.vm.uploadToPeripheral(this.props.deviceId, this.props.codeEditorValue);
            this.props.onOpenUploadProgress();
        } else {
            this.props.onNoPeripheralIsConnected();
        }
    }
    


    // handleRun() {
    //     const { codeEditorValue } = this.props; // Correctly get the value from props
    //     if (!codeEditorValue) {
    //         console.error("Code editor value is empty.");
    //         return; // Handle the case where there is no code to save
    //     }
    
    //     const blob = new Blob([codeEditorValue], { type: 'text/plain' });
    //     const element = document.createElement("a");
    //     element.href = URL.createObjectURL(blob);
    //     element.download = "code.txt";
    //     document.body.appendChild(element);
    //     element.click();
    //     document.body.removeChild(element);
    // }
    
    handleRun() {
        const { codeEditorValue } = this.props;
        const blob = new Blob([codeEditorValue], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'code.py');
        }

//CARES v2.0.5
    handleOpen() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.py';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file && file.name.endsWith('.py')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target.result;
                    this.props.updateCodeEditorValue(content);  
                    // this.props.codeEditorValue(content);  // Dispatch content to Redux
                };
                reader.readAsText(file);
            } else {
                console.error('Please select a valid .txt file.');
            }
        };
        
        input.click();
    }
    

    // handleOpen() {
    //     // Create a hidden input element dynamically
    //     const input = document.createElement('input');
    //     input.type = 'file';
    //     input.accept = '.txt';
    
    //     // Set up the event listener to load the selected file
    //     input.onchange = (e) => {
    //         const file = e.target.files[0];  // Get the selected file
    //         if (file && file.name.endsWith('.txt')) {
    //             const reader = new FileReader();
    //             reader.onload = (e) => {
    //                 this.setState({ code: e.target.result });  // Load the file content into the state
    //             };
    //             reader.readAsText(file);  // Read the text file
    //         } else {
    //             console.error('Please select a valid .txt file.');
    //         }
    //     };
    
    //     // Programmatically trigger the input file dialog
    //     input.click();
    // }
    
    
    render () {
        const {
            ...props
        } = this.props;
        return (
            <HardwareHeaderComponentTest
                onUpload={this.handleUpload}
                onRun={this.handleRun}
                onOpen={this.handleOpen}
                {...props}
            />
        );
    }
}

HardwareHeaderTest.propTypes = {
    codeEditorValue: PropTypes.string,
    deviceId: PropTypes.string,
    onNoPeripheralIsConnected: PropTypes.func.isRequired,
    onOpenUploadProgress: PropTypes.func,
    onWorkspaceIsEmpty: PropTypes.func.isRequired,
    peripheralName: PropTypes.string,
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    codeEditorValue: state.scratchGui.code.codeEditorValue,
    

    deviceId: state.scratchGui.device.deviceId,
    peripheralName: state.scratchGui.connectionModal.peripheralName,
    stageSizeMode: state.scratchGui.stageSize.stageSize
});

const mapDispatchToProps = dispatch => ({
    onNoPeripheralIsConnected: () => showAlertWithTimeout(dispatch, 'connectAPeripheralFirst'),
    onOpenUploadProgress: () => dispatch(openUploadProgress()),
    onWorkspaceIsEmpty: () => showAlertWithTimeout(dispatch, 'workspaceIsEmpty'),
    // updateCodeEditorValue: (value) => dispatch({ type: 'SET_CODE_EDITOR_VALUE', value })
    updateCodeEditorValue: (value) => dispatch({ type: 'scratch-gui/code/UPDATE_CODE', value })
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(HardwareHeaderTest);