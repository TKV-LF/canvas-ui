import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const FormDialog = ({ open, onClose, onSubmit, title, fields }) => {
    const [formValues, setFormValues] = useState({});

    const handleFormChange = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formValues);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    width: '900px', // Set the desired width here
                },
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div key={field.name} className="mb-4">
                            {}
                            <TextField
                                fullWidth
                                variant="outlined"
                                label={field.label}
                                name={field.name}
                                value={formValues[field.name] || ''}
                                onChange={handleFormChange}
                            />
                        </div>
                    ))}
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                    Huỷ
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormDialog;
