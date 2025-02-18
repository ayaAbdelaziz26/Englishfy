import React, { useState } from 'react'
import './resetPass.css'
import { useSearchParams } from 'react-router-dom';
import Success from '../../Components/Success/Success';

const ResetPass = () => {

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const [newPassword, setNewPassword] = useState('');


    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleResetPass = async (e) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            setMessage("Password must be at least 6 characters long.");
            setSeverity("error");
            setOpenSnackbar(true)
            return;
        }

        const url = 'http://localhost:5000/api/v1/admin/auth/reset-password';
        const forgetData = {
             token:token,
             newPassword:newPassword
            };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(forgetData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Password reset successfully!')
                setSeverity('success')
                window.location.href = "/login";
            } else {
                setMessage('Something went wrong!')
                setSeverity('error')
            }
        } catch (error) {
            setMessage("Network error. Try again.");
            setSeverity('error');
        } finally {
            setOpenSnackbar(true)
        }
    };


    return (
        <div className='reset-pass'>
            <form className='reset-pass-popup'>
                <div className="reset-pass-input">
                    <label htmlFor="">Enter new password:</label>
                    <input type="password"
                        id="newPassword"
                        value={newPassword}
                        required
                        onChange={(e) => setNewPassword(e.target.value)} />
                </div>

                <button onClick={handleResetPass}>Reset</button>
            </form>

            <Success message={message} color={severity} open={openSnackbar} setOpen={setOpenSnackbar} />
        </div>
    )
}
export default ResetPass;