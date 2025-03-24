import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ScrollableFeed from 'react-scrollable-feed';

import Box from '../box/box.jsx';
import MenuBarMenu from '../menu-bar/menu-bar-menu.jsx';
import { MenuItem, MenuSection } from '../menu/menu.jsx';
import styles from './hardware-console.css';
import cleanIcon from './clean.svg';
import settingIcon from './setting.svg';
import pauseIcon from './pause.svg';

import saveIcon from './csv.svg';
import startIcon from './start.svg';

const toHexForm = buffer => 
    Array.prototype.map.call(buffer, x => x.toString(16).toUpperCase()).join(' ');

// const highlightErrors = text => {
//     const regex = /(ERROR)/gi; // Regex to match the word "ERROR"
//     const parts = text.split(regex); // Split the text at the word "ERROR"
    

//     return parts.map((part, index) => {
//         // Check if the part is "ERROR" and apply the class
//         if (part.toUpperCase() === 'ERROR') {
//             return <span key={index} className={styles.errorText}>{part}</span>;
//         }
//         return part; // Return the part as is
//     });
// };

//CARES 2.0.3
// const highlightErrors = text => {
//     // Regex to match "ERROR" or "WARNING"
//     const regex = /(ERROR|WARNING)/gi;
//     const parts = text.split(regex); // Split the text at "ERROR" or "WARNING"

//     return parts.map((part, index) => {
//         // Check if the part is "ERROR" or "WARNING" and apply the respective class
//         if (part.toUpperCase() === 'ERROR') {
//             return <span key={index} className={styles.errorText}>{part}</span>;
//         } else if (part.toUpperCase() === 'WARNING') {
//             return <span key={index} className={styles.warningText}>{part}</span>; // Assuming you have a different style for warnings
//         }
//         return part; // Return the part as is
//     });
// };

// CARES 2.0.4
const highlightErrors = text => {
    // Regex to match "ERROR" or "WARNING"
    const regex = /(ERROR|WARNING|<<CONSOLE OUTPUT>>)/gi;
    const parts = text.split(regex); // Split the text at "ERROR" or "WARNING"

    return parts.map((part, index) => {
        // Check if the part is "ERROR" or "WARNING" and apply the respective class
        if (part.toUpperCase() === 'ERROR') {
            return <span key={index} className={styles.errorText}>{part}</span>;
        } else if (part.toUpperCase() === 'WARNING') {
            return <span key={index} className={styles.warningText}>{part}</span>; 
        }
        else if (part.toUpperCase() === '<<CONSOLE OUTPUT>>') {
            return <span key={index} className={styles.outputText}>{part}</span>; 
        }
        return part; // Return the part as is
    });
};

const HardwareConsoleComponent = (props) => {
    const {
        baudrate,
        baudrateList,
        consoleArray,
        eol,
        eolList,
        intl,
        isAutoScroll,
        isHexForm,
        isTimeStamp, //cares 2.0.7
        isPause,
        onClickClean,
        onClickPause,
        onClickSave,
        onClickSerialportMenu,
        onClickHexForm,
        onClickTimeStamp, //cares 2.0.7
        onClickAutoScroll,
        onClickSend,
        onClickReboot, //cares 2.1.2
        onInputChange,
        onKeyPress,
        onKeyDown,
        onRequestSerialportMenu,
        onSelectBaudrate,
        onSelectEol,
        serialportMenuOpen
    } = props;

    return (
        <Box className={styles.hardwareConsoleWrapper}>
            <Box className={styles.consoleArray}>
                <ScrollableFeed forceScroll={isAutoScroll}>
                    <span>
                        {isHexForm 
                            ? toHexForm(consoleArray) 
                            : highlightErrors(new TextDecoder('utf-8').decode(consoleArray))}
                    </span>
                </ScrollableFeed>
            </Box>
            <button
                className={classNames(styles.button, styles.pauseButton)}
                onClick={onClickPause}
            >
                <img
                    alt="Pause"
                    className={classNames(styles.pauseIcon)}
                    src={isPause ? startIcon : pauseIcon}
                />
            </button>
            <button
                className={classNames(styles.button, styles.cleanButton)}
                onClick={onClickClean}
            >
                <img
                    alt="Clean"
                    className={classNames(styles.cleanIcon)}
                    src={cleanIcon}
                />
            </button>

            <button
                className={classNames(styles.button, styles.saveButton)}
                onClick={onClickSave}
            >
                <img
                    alt="Save"
                    className={classNames(styles.saveIcon)}
                    src={saveIcon}
                />
            </button>
            <Box className={styles.consoleMenuWarpper}>
                <input
                    className={styles.consoleInput}
                    onChange={onInputChange}
                    onKeyPress={onKeyPress}
                    onKeyDown={onKeyDown}
                />
                <button
                    className={classNames(styles.button, styles.sendButton)}
                    onClick={onClickSend}
                >
                    <FormattedMessage
                        defaultMessage="Send"
                        description="Button in bottom to send data to serialport"
                        id="gui.hardwareConsole.send"
                    />
                </button>
                {/* cares */}
                <button
                    className={classNames(styles.button, styles.rebootButton)}
                    onClick={onClickReboot}
                >
                    <FormattedMessage
                        defaultMessage="Reboot"
                        description="Button in bottom to soft Reboot Microcontroller"
                        id="gui.hardwareConsole.reboot"
                    />
                </button>

                <button
                    className={classNames(styles.button, styles.settingButton)}
                >
                    <img
                        alt="Setting"
                        className={classNames(styles.settingIcon, {
                            [styles.active]: serialportMenuOpen
                        })}
                        src={settingIcon}
                        onMouseUp={onClickSerialportMenu}
                    />
                    <MenuBarMenu
                        className={classNames(styles.MenuBarMenu)}
                        menuClassName={styles.menu}
                        open={serialportMenuOpen}
                        place={'left'}
                        directiron={'up'}
                        onRequestClose={onRequestSerialportMenu}
                    >
                        <MenuSection>
                            <MenuItem isRtl={props.isRtl}>
                                <FormattedMessage
                                    defaultMessage="Baudrate"
                                    description="Serial baudrate."
                                    id="gui.hardwareConsole.baudrate"
                                />
                                <select onChange={onSelectBaudrate} value={baudrate}>
                                    {baudrateList.map(item => (
                                        <option key={item.key} value={item.key}>
                                            {item.value}
                                        </option>
                                    ))}
                                </select>
                            </MenuItem>
                            <MenuItem isRtl={props.isRtl}>
                                <FormattedMessage
                                    defaultMessage="End of line"
                                    description="End of line."
                                    id="gui.hardwareConsole.endOfLine"
                                />
                                <select onChange={onSelectEol} value={eol}>
                                    {eolList.map(item => (
                                        <option key={item.key} value={item.key}>
                                            {intl.formatMessage(item.value)}
                                        </option>
                                    ))}
                                </select>
                            </MenuItem>
                        </MenuSection>
                        <MenuSection>
                            <MenuItem onClick={onClickHexForm} isRtl={props.isRtl}>
                                <FormattedMessage
                                    defaultMessage="Hex form"
                                    description="Display serial port data in hexadecimal."
                                    id="gui.hardwareConsole.hexform"
                                />
                                <input
                                    type="checkbox"
                                    name="hexform"
                                    checked={isHexForm}
                                    onChange={onClickHexForm} // Handle change
                                />
                            </MenuItem>
                            <MenuItem
                                onClick={onClickTimeStamp}
                                isRtl={props.isRtl}
                             >
                                <FormattedMessage
                                    defaultMessage="Time Stamp"
                                    description="Auto scroll serial port console data."
                                    id="gui.hardwareConsole.timeStamp"
                                />
                                <input
                                    type="checkbox"
                                    name="autoScroll"
                                    checked={isTimeStamp}
                                    onChange={onClickTimeStamp} // cares 2.0.7
                                />
                            </MenuItem>
                            <MenuItem
                                onClick={onClickAutoScroll}
                                isRtl={props.isRtl}
                                bottomLine
                            >
                                <FormattedMessage
                                    defaultMessage="Auto scroll"
                                    description="Auto scroll serial port console data."
                                    id="gui.hardwareConsole.autoScroll"
                                />
                                <input
                                    type="checkbox"
                                    name="autoScroll"
                                    checked={isAutoScroll}
                                    onChange={onClickAutoScroll} // Handle change
                                />
                            </MenuItem>
                         
                        </MenuSection>
                    </MenuBarMenu>
                </button>
            </Box>
        </Box>
    );
};

HardwareConsoleComponent.propTypes = {
    baudrate: PropTypes.string.isRequired,
    baudrateList: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        })
    ),
    consoleArray: PropTypes.instanceOf(Uint8Array),
    eol: PropTypes.string.isRequired,
    eolList: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.shape({
                defaultMessage: PropTypes.string.isRequired,
                description: PropTypes.string,
                id: PropTypes.string.isRequired
            })
        })
    ),
    intl: intlShape,
    isRtl: PropTypes.bool,
    isHexForm: PropTypes.bool.isRequired,
    isTimeStamp:PropTypes.bool.isRequired, //cares 2.0.7
    isPause: PropTypes.bool.isRequired,
    isAutoScroll: PropTypes.bool.isRequired,
    onClickClean: PropTypes.func.isRequired,
    onClickPause: PropTypes.func.isRequired,
    onClickSave: PropTypes.func.isRequired, //CARES
    onClickAutoScroll: PropTypes.func.isRequired,
    onClickHexForm: PropTypes.func.isRequired,
    onClickTimeStamp: PropTypes.func.isRequired, //cares 2.0.7
    onClickSend: PropTypes.func.isRequired,
    onClickReboot: PropTypes.func.isRequired, //cares 2.1.2
    onClickSerialportMenu: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    onRequestSerialportMenu: PropTypes.func.isRequired,
    onSelectBaudrate: PropTypes.func.isRequired,
    onSelectEol: PropTypes.func.isRequired,
    serialportMenuOpen: PropTypes.bool.isRequired
};

export default HardwareConsoleComponent;
