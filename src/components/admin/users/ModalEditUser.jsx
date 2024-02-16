import React from 'react'
import Modal from 'react-bootstrap/Modal';
import FormEditUser from './FormEditUser';

const ModalEditUser = ({ showEdit, handleClose, setShowEdit, idUser }) => {

    return (
        <Modal show={showEdit} onHide={handleClose} className='back'>
            <div className='header-container glass'>
                <div className="modal-header mx-5 border border-top-0 border-end-0 border-start-0 py-0">
                    <div className='my-5 '>
                        <h4 className=" titulo-registro ms-4 title-modal">Editar Usuario</h4>
                    </div>
                </div>
            </div>
            <Modal.Body className='p-5 glass'>
                <FormEditUser show={showEdit} setShow={setShowEdit} handleClose={handleClose} idUser={idUser} />
            </Modal.Body>
        </Modal>
    )
}

export default ModalEditUser