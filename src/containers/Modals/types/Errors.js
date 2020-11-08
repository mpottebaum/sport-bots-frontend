import React from 'react'

import Modal from '../cmps/Modal'

const Errors = ({ errors, onClose }) => (
    <Modal onClose={onClose} title={'ERRORS'}>
        <ul>
            {errors && (
                errors.map(error => <li>{error}</li>)
            )}
        </ul>
    </Modal>
)

export default Errors