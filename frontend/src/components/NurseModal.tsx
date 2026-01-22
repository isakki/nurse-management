import React, { useState, useEffect } from 'react';
import { Nurse } from '../services/nurse.service';
import '../assets/styles/nurse-modal.css';

interface NurseModalProps {
    isOpen: boolean;
    nurse: Nurse | null;
    onClose: () => void;
    onSubmit: (nurse: Nurse) => Promise<void>;
    isLoading: boolean;
}

const NurseModal: React.FC<NurseModalProps> = ({ isOpen, nurse, onClose, onSubmit, isLoading }) => {
    const [formData, setFormData] = useState<Nurse>({
        name: '',
        licenseNumber: '',
        dob: '',
        age: 0
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (nurse && nurse.id) {
            setFormData({
                ...nurse,
                dob: nurse.dob.split('T')[0] // Format date for input
            });
        } else {
            setFormData({
                name: '',
                licenseNumber: '',
                dob: '',
                age: 0
            });
        }
        setErrors({});
    }, [nurse, isOpen]);

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.licenseNumber.trim()) {
            newErrors.licenseNumber = 'License number is required';
        }
        if (!formData.dob) {
            newErrors.dob = 'Date of birth is required';
        }
        if (formData.age <= 0) {
            newErrors.age = 'Age must be greater than 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'age') {
            setFormData({
                ...formData,
                [name]: parseInt(value) || 0
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
        // Clear error for this field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await onSubmit(formData);
            handleClose();
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            licenseNumber: '',
            dob: '',
            age: 0
        });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{nurse && nurse.id ? 'Edit Nurse' : 'Add New Nurse'}</h2>
                    <button 
                        type="button" 
                        className="close-btn" 
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="nurse-form">
                    <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter nurse name"
                            disabled={isLoading}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="licenseNumber">License Number *</label>
                        <input
                            type="text"
                            id="licenseNumber"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            placeholder="Enter license number"
                            disabled={isLoading}
                        />
                        {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth *</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        {errors.dob && <span className="error-message">{errors.dob}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age *</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Enter age"
                            min="0"
                            disabled={isLoading}
                        />
                        {errors.age && <span className="error-message">{errors.age}</span>}
                    </div>

                    <div className="modal-actions">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NurseModal;
