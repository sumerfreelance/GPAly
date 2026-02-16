# GPAly

# 🎓 Academic GPA Calculator Web App

A modern, responsive, and user-friendly **GPA Calculator** built using **HTML, CSS, and JavaScript**.
This application allows students to calculate their GPA accurately, generate a **professional academic transcript in PDF format**, and submit feedback via **Google Forms or Email**.

Designed with **clean UI**, **mobile responsiveness**, and **real-world university grading logic** in mind.

## 🌐 Live Preview

> Example:
> 🔗 [GPAly](https://gp-aly.vercel.app/)

## 📌 Features

### ✅ Core Functionality

* Dynamic subject input (supports any number of subjects)
* Credit-hour–based GPA calculation
* University-standard grading logic
* Duplicate subject name validation
* Full input validation (marks, credit hours, subject names)

### 📊 Transcript Generation

* Auto-generated academic transcript
* Clean, professional table layout
* **Final GPA calculation**
* System-generated disclaimer

### 📄 PDF Export

* Download transcript as **PDF**
* Application logo as **watermark**
* Themed colors matching the UI
* Feedback section included in the PDF
* Clickable feedback links (Google Form & Email)

### 💬 Feedback System

* Feedback section integrated in the website
* Google Form submission support
* Email feedback support (`mailto`)
* Same links included inside the generated PDF

### 🎨 UI & UX

* Animated welcome screen
* Modern gradient design
* Smooth scrolling
* Custom scrollbar styling
* Fully responsive for:

  * Desktop
  * Tablets
  * Mobile devices

## 📱 Responsive Design

This application is optimized for **all screen sizes**, including:

* Large desktops
* Tablets (iPad & similar)
* Mobile devices
* Small-screen iPhones (e.g., iPhone 12 Pro)

Special care has been taken to avoid:

* Overflow issues
* Cut-off content
* Broken layouts on smaller screens

## 🛠️ Tech Stack

| Technology       | Purpose                  |
| ---------------- | ------------------------ |
| HTML5            | Structure                |
| CSS3             | Styling & Responsiveness |
| JavaScript (ES6) | Logic & Interactivity    |
| jsPDF            | PDF generation           |
| jsPDF AutoTable  | Transcript table         |
| Font Awesome     | Icons                    |

## 📂 Project Structure

```
academic-gpa-calculator/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   └── logo.png
│
├── README.md
```

## ⚙️ How It Works

1. User enters the number of subjects
2. Dynamic input fields are generated
3. User enters:

   * Subject name
   * Credit hours
   * Marks percentage
4. GPA is calculated using weighted credit logic
5. Transcript is displayed on screen
6. User can:

   * Download the transcript as PDF
   * Share feedback via Google Form or Email

## 📐 GPA Calculation Logic

```
Weighted GPA = (Grade Point × Credit Hours)
Final GPA = Total Weighted Points / Total Credit Hours
```

Grading follows a **standard university grading scale**.

## 📄 PDF Features Explained

* Centered title and subtitle
* Logo watermark with opacity
* Auto-generated table
* Final GPA highlight
* Feedback section with clickable links
* Footer disclaimer

## 💬 Feedback & Suggestions

Your feedback helps improve this project.

* 📋 **Google Form**
  [https://forms.gle/n6USbix9sTrg9S7F6](https://forms.gle/n6USbix9sTrg9S7F6)

* 📧 **Email**
  [sumerfreelance@gmail.com](mailto:sumerfreelance@gmail.com)

These links are accessible both:

* On the website
* Inside the downloaded PDF

## 🔒 Data Privacy

* No data is stored
* No backend or database
* All calculations are performed client-side
* Completely safe and private

## 🚀 Future Enhancements (Planned)

* Multiple semester GPA
* CGPA calculation
* Grade scale customization
* Dark mode
* University-specific grading presets
* Backend integration (optional)

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 👨‍💻 Author

**Syed Umer Shah**
Web Developer

* GitHub: *[GitHub profile](https://github.com/sumerfreelance)*
* Email: [sumerfreelance@gmail.com](mailto:sumerfreelance@gmail.com)

## ⭐ Support

If you found this project helpful:

* Give it a ⭐ on GitHub
* Share it with others
* Submit feedback for improvements

> *This project was built with a focus on learning, usability, and real-world academic needs.*
