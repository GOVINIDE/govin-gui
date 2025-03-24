// import React from 'react';
// import PropTypes from 'prop-types';
// import Box from '../box/box.jsx';
// import Button from '../button/button.jsx';
// import classNames from 'classnames';
// import {defineMessages, FormattedMessage, intlShape} from 'react-intl';

// import {STAGE_SIZE_MODES} from '../../lib/layout-constants';

// import styles from './hardware-header-test.css';

// import uploadIcon from './icon--upload.svg';
// // Changes done on 14 dec to add maxmimise button



// const messages = defineMessages({
//     uploadMessage: {
//         defaultMessage: 'Upload',
//         description: 'Button to upload program',
//         id: 'gui.hardwareHeader.upload'
//     }

// });

// const HardwareHeaderComponentTest = props => {
//     const {
        
//         onUpload,
       
//     } = props;
//     return (
//         <Box>
//             <div className={styles.uploadGroup}>
//                 <div
//                     className={classNames(
//                         styles.uploadButton,
//                     )}
//                     onClick={onUpload}
//                 >
//                     <img
//                         alt={props.intl.formatMessage(messages.uploadMessage)}
//                         className={styles.uploadIcon}
//                         draggable={false}
//                         src={uploadIcon}
//                     />
//                     <FormattedMessage
//                         defaultMessage="Upload"
//                         description="Button to upload program"
//                         id="gui.hardwareHeader.upload"
//                     />
//                 </div>

// {/* 2.0.2 cares */}
//                 {/* <div
//                     className={classNames(
//                         styles.uploadButton,
//                     )}
//                     onClick={onUpload}
//                 >
//                     <img
//                         alt={props.intl.formatMessage(messages.uploadMessage)}
//                         className={styles.uploadIcon}
//                         draggable={false}
//                         src={uploadIcon}
//                     />
//                     <FormattedMessage
//                         defaultMessage="Run"
//                         description="Button to Run program"
//                         id="gui.hardwareHeader.run"
//                     />
//                 </div> */}
//             </div>
           
//         </Box>
//     );
// };

// HardwareHeaderComponentTest.propTypes = {
//     intl: intlShape,
//     onUpload: PropTypes.func.isRequired,
   
   
   
// };


// export default HardwareHeaderComponentTest;

import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import classNames from 'classnames';
import {defineMessages, FormattedMessage, intlShape} from 'react-intl';

import {STAGE_SIZE_MODES} from '../../lib/layout-constants';

import styles from './hardware-header-test.css';

import uploadIcon from './icon--upload.svg';
// Changes done on 14 dec to add maxmimise button



const messages = defineMessages({
    uploadMessage: {
        defaultMessage: 'Upload',
        description: 'Button to upload program',
        id: 'gui.hardwareHeader.upload'
    }

});

const HardwareHeaderComponentTest = props => {
    const {
        
        onUpload,
        onRun,
        onOpen
       
    } = props;
    return (
        <Box>
            <div className={styles.hardwareHeaderWrapperTest}>
                <div
                    className={classNames(
                        styles.uploadButton,
                    )}
                    onClick={onUpload}
                >
                    <img
                        alt={props.intl.formatMessage(messages.uploadMessage)}
                        className={styles.uploadIcon}
                        draggable={false}
                        src={uploadIcon}
                    />
                    <FormattedMessage
                        defaultMessage="Upload"
                        description="Button to upload program"
                        id="gui.hardwareHeader.upload"
                    />
                </div>
            </div>


{/* cares 2.0.2 */}
            <div className={styles.hardwareHeaderWrapperTestRun}>
                <div
                    className={classNames(
                        styles.runButton,
                    )}
                    onClick={onRun}
                >
                    {/* <img
                        alt={props.intl.formatMessage(messages.uploadMessage)}
                        className={styles.uploadIcon}
                        draggable={false}
                        // src={uploadIcon}
                    /> */}
                    <FormattedMessage
                        defaultMessage="Save"
                        description="Button to run program"
                        id="gui.hardwareHeader.save"
                    />
                </div>
            </div>

            <div className={styles.hardwareHeaderWrapperTestOpen}>
                <div
                    className={classNames(
                        styles.openButton,
                    )}
                    onClick={onOpen}
                >
                
                    <FormattedMessage
                        defaultMessage="Load from Computer"
                        description="Button to open a saved program"
                        id="gui.hardwareHeader.open"
                    />
                </div>
            </div>
           
        </Box>
    );
};

HardwareHeaderComponentTest.propTypes = {
    intl: intlShape,
    onUpload: PropTypes.func.isRequired,
    onRun: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired
   
   
   
};


export default HardwareHeaderComponentTest;