import React, { useState } from 'react'
import { Modal, PasswordInput, Button } from '@mantine/core';
import { API_changeUserPassword } from '../../../apis/UserRequest';
import { showSuccessNoti, showErrorNoti } from "../../../components/utilities/ShowNotification";
import "./PasswordModal.css";

const PasswordModal = ({ passwordModalOpened, setPasswordModalOpened }) => {
    const [passwordObj, setPasswordObj] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const clearAllInputs = () => {
        setPasswordObj({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
    }
    const handleChange = (e) => {
        setPasswordObj({ ...passwordObj, [e.target.name]: e.target.value.trim() });
    }

    const handleConfirm = async () => {
        //check if passwords matches
        if (passwordObj.newPassword.trim() === "" || passwordObj.newPassword !== passwordObj.confirmPassword) {
            showErrorNoti("Please Try Again", "Please confirm your new password again")
        } else if (passwordObj.currentPassword === passwordObj.newPassword) {
            showErrorNoti("Please Try Again", "Your current & new password can't be the same.");
        } else {
            const result = await API_changeUserPassword(passwordObj);
            if (result.status) {
                showSuccessNoti("Change Password Successfully", "Please relogin.");
                clearAllInputs();
                setPasswordModalOpened(false);
            } else if (result.message.response.status === 401) {
                showErrorNoti("Incorrect Password", "Current Password is Incorrect.");
            } else {
                showErrorNoti("Internal Server Error", "Please try again later.");
            }
        }
    }
    return (
        <Modal
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={passwordModalOpened}
            onClose={() => setPasswordModalOpened(false)}
        >
            <div className="passwordModal">
                <div className="passwordModal-title">
                    Change Password
                </div>
                <div className="passwordInput-section">
                    <PasswordInput
                        name="currentPassword"
                        placeholder="Current Password"
                        label="Current Password"
                        onChange={handleChange}
                        value={passwordObj.currentPassword}
                    />
                    <PasswordInput
                        name="newPassword"
                        placeholder="New Password"
                        label="New Password"
                        onChange={handleChange}
                        value={passwordObj.newPassword}
                    />
                    <PasswordInput
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        label="Confirm Password"
                        onChange={handleChange}
                        value={passwordObj.confirmPassword}
                    />
                </div>
                <div className="changePassword-Confirm">
                    <Button color="green" onClick={handleConfirm}>Confirm</Button>
                    <Button color="red" onClick={() => { setPasswordModalOpened(false) }}>Cancel</Button>
                </div>
            </div>
        </Modal>
    )
}

export default PasswordModal