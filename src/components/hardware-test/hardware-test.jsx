import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import classNames from 'classnames';

import {STAGE_SIZE_MODES} from '../../lib/layout-constants';
import HardwareConsole from '../../containers/hardware-console.jsx';

import styles from './hardware-test.css';

import lockIcon from './icon--lock.svg';
import unlockIcon from './icon--unlock.svg';
import CodeEditorTest from '../../containers/code-editor-test.jsx';

const HardwareComponentTest = props => {
    const {
        codeEditorLanguage,
        codeEditorOptions,
        codeEditorTheme,
        codeEditorValue,

        isCodeEditorLocked,
        onCodeEditorWillMount,
        onCodeEditorDidMount,
        onCodeEditorChange,

        onClickCodeEditorLock,
        stageSizeMode
    } = props;
    return (
        <Box className={styles.hardwareWrapper}>
            <Box className={classNames(styles.codeEditorWrapper)}>
                {/* <button
                    className={classNames(styles.button, styles.lockButton)}
                    onClick={onClickCodeEditorLock}
                >
                    <img
                        alt="Lock"
                        className={classNames(styles.lockIcon)}
                        src={isCodeEditorLocked ? lockIcon : unlockIcon}
                    />
                </button> */}

   
                <CodeEditorTest
                    width={(stageSizeMode === STAGE_SIZE_MODES.large) ? 1440 : 1440}
                    value={codeEditorValue}
                    language={codeEditorLanguage}
                    editorWillMount={onCodeEditorWillMount}
                    editorDidMount={onCodeEditorDidMount}
                    onChange={onCodeEditorChange}
                    theme={codeEditorTheme}
                    options={codeEditorOptions}
                />
            </Box>
            <Box
                className={classNames(styles.hardwareConsoleWrapper,
                    (stageSizeMode === STAGE_SIZE_MODES.large) ? styles.hide: styles.narrowWrapper)}
            >
                <HardwareConsole
                    {...props}
                />
            </Box>


  

     
        </Box>
        
    );
};

HardwareComponentTest.propTypes = {
    codeEditorLanguage: PropTypes.string,
    codeEditorOptions: PropTypes.shape({
        highlightActiveIndentGuide: PropTypes.bool,
        cursorSmoothCaretAnimation: PropTypes.bool,
        readOnly: PropTypes.bool,
        contextmenu: PropTypes.bool,
        minimap: PropTypes.shape({
            enabled: PropTypes.bool
        })
    }),
    codeEditorTheme: PropTypes.string,
    codeEditorValue: PropTypes.string,

    isCodeEditorLocked: PropTypes.bool,
    onCodeEditorWillMount: PropTypes.func,
    onCodeEditorDidMount: PropTypes.func,
    onCodeEditorChange: PropTypes.func,
    onCodeEditorChange: PropTypes.func,
    onClickCodeEditorLock: PropTypes.func,
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES))
};

HardwareComponentTest.defaultProps = {
    stageSizeMode: STAGE_SIZE_MODES.hide
};

export default HardwareComponentTest;
