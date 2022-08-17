import { showNotification } from '@mantine/notifications';

//custom mantine notifications
export const showSuccessNoti = (title, message) => {
    showNotification({ title: title, message: message, color: "green", autoClose: 3500, radius: "md" })
}

export const showErrorNoti = (title, message) => {
    showNotification({ title: title, message: message, color: "red", autoClose: 3500, radius: "md" })
}