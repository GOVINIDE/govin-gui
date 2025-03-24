import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';

const CheckUpdateModal = ({ onClose, message }) => {
    const fileUrl = 'https://drive.google.com/drive/folders/1f1FBFC2GwCUpOt9CmlSGfW3Jubtq2vIU?usp=drive_link';

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button style={styles.closeButton} onClick={onClose}>×</button>
                <Box style={styles.box}>
                    <p style={styles.message}>
                        {message === "noupdate" ? "Govin is updated" : "A new update is available!"}
                    </p>
                    {message === "update" && (
                        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                            <button style={styles.downloadButton}>Download</button>
                        </a>
                    )}
                </Box>
            </div>
        </div>
    );
};

CheckUpdateModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#333',
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '10px',
        color: 'black',  // Ensure the text color is always black
    },
    downloadButton: {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '15px 30px',
        fontSize: '18px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default CheckUpdateModal;
