# Nurse Management System - React Frontend

A comprehensive React-based nurse management system with TypeScript, featuring complete CRUD operations, advanced filtering, sorting, and data export capabilities.

## 🚀 Features

### Core Functionality
- ✅ **List All Nurses** - View complete list of nurses in a responsive table
- ✅ **Add Nurse** - Create new nurse records via modal form
- ✅ **Edit Nurse** - Update existing nurse information
- ✅ **Delete Nurse** - Remove nurse records with confirmation
- ✅ **Search** - Filter nurses by name or license number

### Advanced Features
- 🔄 **Sorting** - Click table headers to sort by any field (Name, License Number, DOB, Age, Created Date)
- 📥 **Download CSV** - Export nurse data as CSV file
- 📊 **Download XLSX** - Export nurse data as Excel file
- 🎨 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Async/Await & Promises** - Promise-based API calls with async/await patterns
- ✨ **Form Validation** - Real-time input validation with error messages
- 📱 **Loading States** - Visual feedback during API operations
- 🔔 **Success/Error Messages** - User-friendly notifications

## 📋 Fields

Each nurse record contains:
- **ID** - Auto-generated unique identifier
- **Name** - Full name of the nurse
- **License Number** - Professional license number
- **Date of Birth** - DOB for age verification
- **Age** - Current age
- **Timestamps** - Creation and update timestamps

## 🛠️ Tech Stack

- **React 18.2.0** - UI Framework
- **TypeScript** - Type-safe development
- **Axios** - HTTP client for API calls
- **Bootstrap 5.3.3** - CSS framework
- **XLSX** - Excel file generation
- **React Router v6** - Client-side routing

## 📦 Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   
   Create a `.env` file in the project root:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:4000
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```
   Opens [http://localhost:3000](http://localhost:3000)

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🌐 API Endpoints

The application connects to a Node.js backend with the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/nurses` | Fetch all nurses |
| GET | `/nurses/:id` | Fetch specific nurse |
| POST | `/nurses` | Create new nurse |
| PUT | `/nurses/:id` | Update nurse |
| DELETE | `/nurses/:id` | Delete nurse |



## 🎯 Usage

### Access Nurses Management

1. Navigate to Admin Section
   ```
   http://localhost:3000/admin/nurses
   ```

2. **Add New Nurse**
   - Click "+ Add Nurse" button
   - Fill in all required fields
   - Click "Save"

3. **Edit Nurse**
   - Click edit icon (✏️) on any nurse row
   - Update fields as needed
   - Click "Save"

4. **Delete Nurse**
   - Click delete icon (🗑️) on any nurse row
   - Confirm deletion

5. **Search Nurses**
   - Use search box to filter by name or license number

6. **Sort Nurses**
   - Click any column header to toggle sort
   - Indicators (↑/↓) show current sort direction

7. **Export Data**
   - Click "📥 CSV" to download as CSV
   - Click "📥 XLSX" to download as Excel

## 🔐 Authentication

Currently configured with hardcoded admin access. For production:
- Implement JWT-based authentication
- Store user roles in database
- Validate admin status on backend
- Implement proper login form

## 🎨 Customization

### Change API Base URL
Edit `.env` file:
```env
REACT_APP_API_BASE_URL=http://your-api-url:port
```

### Modify Styles
- Global styles: `src/assets/styles/nurses-page.css`
- Modal styles: `src/assets/styles/nurse-modal.css`


## 🚀 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

## 🐛 Troubleshooting

### API Connection Error
- Ensure backend is running on port 4000
- Check `.env` file for correct API URL
- Verify MySQL database is connected

### Nurses Not Loading
- Check browser console for error messages
- Verify API response format matches expected structure
- Ensure backend `/nurses` endpoint is working

### Modal Not Opening
- Clear browser cache
- Check console for JavaScript errors
- Verify React state management

## 📚 Dependencies

See [package.json](package.json) for complete list of dependencies.

Key dependencies:
- react: ^18.2.0
- axios: ^1.6.8
- typescript: ^4.9.5
- xlsx: ^0.18.5
- bootstrap: ^5.3.3

## 🔄 Async/Await Examples

All API calls use async/await pattern:

```typescript
// Example: Fetch all nurses
const nurses = await getAllNurses();

// Example: Create new nurse with promise handling
await createNurse(nurseData).then(() => {
    fetchNurses(); // Refresh list
}).catch((error) => {
    console.error('Error:', error);
});
```

## 📄 License

ISC

## 👨‍💻 Author

Isakki Muthu M
