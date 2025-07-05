
# 📊 SEUSL Academic Results Portal

A modern and user-friendly academic portal for students at South Eastern University of Sri Lanka (SEUSL) to view their semester results, GPA/CGPA progress, and academic status. Built with ease-of-use and clarity in mind, the system features both a **Student Login** interface and an **Admin Panel** for result uploads.

![Login Page Screenshot](./assets/login.png)
![Dashboard Screenshot](./assets/dashboard.png)

---

## 🔧 Features

### 🎓 Student Portal
- Secure login using student ID and password.
- View current **CGPA**, **SGPA**, and **academic standing**.
- See semester-wise result breakdown.
- Visual chart showing **SGPA trends** across semesters.
- Track **credit completion progress**.

### 🛠️ Admin Panel
- Upload semester results using CSV files.
- Automatically calculate GPA/CGPA for each student.
- Add, edit, and delete student result records.
- Role-based access control.

---

## 💡 Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js / Express.js *(optional depending on deployment setup)*
- **Database**: Firebase / MongoDB / Google Sheets API *(depending on your choice)*
- **Authentication**: Firebase Auth / Custom Auth
- **Deployment**: Netlify

---

## 📁 CSV Format for Admin Upload

CSV uploads must follow this structure:

```
StudentID, Semester, CourseCode, CourseTitle, Grade, Credit
SEU/IS/20/EG/078, 4, IS401, Database Systems, B+, 3
...
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/seusl-results-portal.git
cd seusl-results-portal
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm start
```

---

## 📦 Folder Structure

```
src/
├── components/
│   ├── LoginForm.jsx
│   ├── Dashboard.jsx
│   ├── ResultTable.jsx
│   └── Chart.jsx
├── pages/
│   ├── AdminPanel.jsx
│   └── StudentPortal.jsx
├── utils/
│   └── GPAcalculator.js
├── assets/
│   └── logo.png
```

---

## ✅ Future Improvements

- Email notification system for result release
- Password reset via email
- Mobile-friendly UI enhancements
- Faculty-wise filtering & analytics

---

## 👨‍💻 Author

**S. Mithushan**  
SEU/IS/20/EG/078 – Electrical and Electronics Engineering  
South Eastern University of Sri Lanka  

---

## 📝 License

This project is licensed under the MIT License.
