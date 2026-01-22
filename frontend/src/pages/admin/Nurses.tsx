import React, { useState, useEffect } from 'react';
import { getAllNurses, createNurse, updateNurse, deleteNurse, Nurse } from '../../services/nurse.service';
import NurseModal from '../../components/NurseModal';
import '../../assets/styles/nurses-page.css';
import * as XLSX from 'xlsx';

type SortField = 'name' | 'licenseNumber' | 'dob' | 'age' | 'createdAt';
type SortDirection = 'asc' | 'desc';

const Nurses: React.FC = () => {
    const [nurses, setNurses] = useState<Nurse[]>([]);
    const [filteredNurses, setFilteredNurses] = useState<Nurse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);
    const [sortField, setSortField] = useState<SortField>('createdAt');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    useEffect(() => {
        fetchNurses();
    }, []);
    
    useEffect(() => {
        applyFiltersAndSort();
    }, [nurses, sortField, sortDirection, searchTerm]);
    
    const fetchNurses = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await getAllNurses();
            setNurses(data);
        } catch (err) {
            setError('Failed to load nurses. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Apply filtering and sorting
    const applyFiltersAndSort = () => {
        let result = [...nurses];
        
        if (searchTerm) {
            result = result.filter(nurse =>
                nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                nurse.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply sorting
        result.sort((a, b) => {
            let aValue: any = a[sortField];
            let bValue: any = b[sortField];
            
            if (sortField === 'age') {
                aValue = Number(aValue);
                bValue = Number(bValue);
            } else if (sortField === 'dob' || sortField === 'createdAt') {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            } else {
                aValue = String(aValue).toLowerCase();
                bValue = String(bValue).toLowerCase();
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredNurses(result);
    };
    
    const handleSort = (field: SortField) => {
        if (sortField === field) {        
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {            
            setSortField(field);
            setSortDirection('asc');
        }
    };
    
    const handleOpenModal = (nurse?: Nurse) => {
        if (nurse) {
            setSelectedNurse(nurse);
        } else {
            setSelectedNurse(null);
        }
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedNurse(null);
    };
    
    const handleFormSubmit = async (formData: Nurse) => {
        setIsLoading(true);
        setError('');
        try {
            if (selectedNurse && selectedNurse.id) {                
                await updateNurse(selectedNurse.id, formData);
                setSuccessMessage('Nurse updated successfully!');
            } else {                
                await createNurse(formData);
                setSuccessMessage('Nurse added successfully!');
            }            
            await fetchNurses();
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Failed to save nurse. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this nurse?')) {
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            await deleteNurse(id);
            setSuccessMessage('Nurse deleted successfully!');
            await fetchNurses();
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Failed to delete nurse. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDownloadCSV = () => {
        if (filteredNurses.length === 0) {
            setError('No nurses to download');
            return;
        }

        const csv = convertToCSV(filteredNurses);
        downloadFile(csv, 'nurses.csv', 'text/csv');
        setSuccessMessage('CSV downloaded successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };
    
    const handleDownloadXLSX = () => {
        if (filteredNurses.length === 0) {
            setError('No nurses to download');
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(
            filteredNurses.map(nurse => ({
                ID: nurse.id,
                Name: nurse.name,
                'License Number': nurse.licenseNumber,
                'Date of Birth': new Date(nurse.dob).toLocaleDateString(),
                Age: nurse.age
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Nurses');
        XLSX.writeFile(workbook, 'nurses.xlsx');

        setSuccessMessage('XLSX downloaded successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };
    
    const convertToCSV = (data: Nurse[]): string => {
        const headers = ['ID', 'Name', 'License Number', 'Date of Birth', 'Age'];
        const rows = data.map(nurse => [
            nurse.id,
            nurse.name,
            nurse.licenseNumber,
            new Date(nurse.dob).toLocaleDateString(),
            nurse.age
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        return csvContent;
    };
    
    const downloadFile = (content: string, fileName: string, mimeType: string) => {
        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };
    
    const getSortIndicator = (field: SortField) => {
        if (sortField !== field) return ' ⇅';
        return sortDirection === 'asc' ? ' ↑' : ' ↓';
    };

    return (
        <div className="nurses-page">
            <div className="page-header">
                <h1>Nurses Management</h1>
                <div className="header-actions">
                    <button 
                        className="btn btn-primary" 
                        onClick={() => handleOpenModal()}
                        disabled={isLoading}
                    >
                        + Add Nurse
                    </button>
                </div>
            </div>
            
            {error && (
                <div className="alert alert-danger">
                    {error}
                    <button className="alert-close" onClick={() => setError('')}>✕</button>
                </div>
            )}
            {successMessage && (
                <div className="alert alert-success">
                    {successMessage}
                    <button className="alert-close" onClick={() => setSuccessMessage('')}>✕</button>
                </div>
            )}
            
            <div className="nurses-controls">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by name or license number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="download-buttons">
                    <button 
                        className="btn btn-secondary"
                        onClick={handleDownloadCSV}
                        disabled={isLoading || filteredNurses.length === 0}
                        title="Download as CSV"
                    >
                        📥 CSV
                    </button>
                    <button 
                        className="btn btn-secondary"
                        onClick={handleDownloadXLSX}
                        disabled={isLoading || filteredNurses.length === 0}
                        title="Download as Excel"
                    >
                        📥 XLSX
                    </button>
                </div>
            </div>
            
            {isLoading && <div className="loading-spinner">Loading...</div>}
            
            {!isLoading && (
                <div className="table-container">
                    {filteredNurses.length === 0 ? (
                        <div className="no-data">
                            {nurses.length === 0 ? 'No nurses found. Start by adding one!' : 'No nurses match your search.'}
                        </div>
                    ) : (
                        <table className="nurses-table">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort('name')} className="sortable">
                                        Name {getSortIndicator('name')}
                                    </th>
                                    <th onClick={() => handleSort('licenseNumber')} className="sortable">
                                        License Number {getSortIndicator('licenseNumber')}
                                    </th>
                                    <th onClick={() => handleSort('dob')} className="sortable">
                                        Date of Birth {getSortIndicator('dob')}
                                    </th>
                                    <th onClick={() => handleSort('age')} className="sortable">
                                        Age {getSortIndicator('age')}
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredNurses.map((nurse) => (
                                    <tr key={nurse.id}>
                                        <td>{nurse.name}</td>
                                        <td>{nurse.licenseNumber}</td>
                                        <td>{new Date(nurse.dob).toLocaleDateString()}</td>
                                        <td>{nurse.age}</td>
                                        <td className="actions-cell">
                                            <button
                                                className="btn-edit"
                                                onClick={() => handleOpenModal(nurse)}
                                                disabled={isLoading}
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(nurse.id!)}
                                                disabled={isLoading}
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
            
            {!isLoading && filteredNurses.length > 0 && (
                <div className="record-count">
                    Showing {filteredNurses.length} of {nurses.length} nurses
                </div>
            )}
            
            <NurseModal
                isOpen={isModalOpen}
                nurse={selectedNurse}
                onClose={handleCloseModal}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
            />
        </div>
    );
};

export default Nurses;
