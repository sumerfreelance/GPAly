/* ===== SHOW APP AFTER WELCOME ANIMATION ===== */
setTimeout(() => {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
}, 6500);

/* ===== CREATE SUBJECT INPUTS ===== */
function createSubjects() {
    const count = document.getElementById("subjectCount").value;
    if (!count || count <= 0) {
        alert("Please enter a valid number of subjects");
        return;
    }

    document.getElementById("countSection").classList.add("hidden");
    document.getElementById("subjectsSection").classList.remove("hidden");

    document.getElementById("message").innerText =
        `Great! You have ${count} subjects. Enter details below`;

    const form = document.getElementById("subjectsForm");
    form.innerHTML = "";

    for (let i = 1; i <= count; i++) {
        form.innerHTML += `
            <div class="subject-row">
                <input placeholder="Subject ${i} Name" required>
                <input type="number" placeholder="Credit Hours" min="1" max="3" required>
                <input type="number" placeholder="Marks %" min="0" max="100" required>
            </div>
        `;
    }
}

/* ===== GRADING LOGIC ===== */
function getGradeAndGPA(m) {
    if (m >= 91) return ["A", 4.0];
    if (m >= 80) return ["A-", 3.7];
    if (m >= 75) return ["B+", 3.3];
    if (m >= 71) return ["B", 3.0];
    if (m >= 68) return ["B-", 2.7];
    if (m >= 64) return ["C+", 2.3];
    if (m >= 61) return ["C", 2.0];
    if (m >= 58) return ["C-", 1.7];
    if (m >= 54) return ["D+", 1.3];
    if (m >= 50) return ["D", 1.0];
    return ["F", 0.0];
}

/* ===== CALCULATE GPA ===== */
function calculateGPA() {
    const rows = document.querySelectorAll(".subject-row");
    const subjectNames = new Set();

    let totalCredits = 0;
    let totalWeightedPoints = 0;

    const body = document.getElementById("transcriptBody");
    body.innerHTML = "";

    for (let row of rows) {
        const inputs = row.querySelectorAll("input");

        const subject = inputs[0].value.trim();
        const credit = Number(inputs[1].value);
        const marks = Number(inputs[2].value);

        /* ===== VALIDATIONS ===== */

        // Subject name
        if (!subject) {
            alert("Subject name cannot be empty");
            return;
        }

        if (subjectNames.has(subject.toLowerCase())) {
            alert(`Duplicate subject name found: ${subject}`);
            return;
        }
        subjectNames.add(subject.toLowerCase());

        // Credit hours
        if (!credit || credit < 1 || credit > 3) {
            alert(`Credit hours must be 1, 2, or 3 for subject: ${subject}`);
            return;
        }

        // Marks
        if (isNaN(marks) || marks < 0 || marks > 100) {
            alert(`Marks must be between 0 and 100 for subject: ${subject}`);
            return;
        }

        /* ===== GRADE & GPA ===== */
        const [grade, gradePoint] = getGradeAndGPA(marks);

        /* ===== WEIGHTED GPA LOGIC (UNIVERSITY STANDARD) ===== */
        const weightedPoints = gradePoint * credit;

        totalCredits += credit;
        totalWeightedPoints += weightedPoints;

        body.innerHTML += `
            <tr>
                <td>${subject}</td>
                <td>${credit}</td>
                <td>${marks}</td>
                <td>${grade}</td>
                <td>${gradePoint.toFixed(2)}</td>
            </tr>
        `;
    }

    /* ===== FINAL GPA ===== */
    const finalGPA = (totalWeightedPoints / totalCredits).toFixed(2);

    document.getElementById("subjectsSection").classList.add("hidden");
    document.getElementById("resultSection").classList.remove("hidden");
    document.getElementById("finalGPA").innerText = finalGPA;
}

/* ===== DOWNLOAD TRANSCRIPT PDF ===== */
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    /* ===== THEME COLORS ===== */
    const primaryColor = [102, 126, 234]; // #667eea
    const darkGray = [60, 60, 60];

    /* ===== LOGO WATERMARK ===== */
    const logo = new Image();
    logo.src = "./assets/logo.png";

    logo.onload = () => {

        /* ===== WATERMARK SETTINGS ===== */
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const logoWidth = 90;
        const logoHeight = 90;

        const x = (pageWidth - logoWidth) / 2;
        const y = (pageHeight - logoHeight) / 2;

        doc.setGState(new doc.GState({ opacity: 0.5 }));
        doc.addImage(logo, "PNG", x, y, logoWidth, logoHeight);
        doc.setGState(new doc.GState({ opacity: 1 }));

        /* ===== HEADER ===== */
        doc.setFontSize(18);
        doc.setTextColor(...primaryColor);
        doc.text("Academic Transcript", 105, 20, { align: "center" });

        doc.setFontSize(11);
        doc.setTextColor(...darkGray);
        doc.text("Generated by GPA Calculator", 105, 28, { align: "center" });

        /* ===== TABLE DATA ===== */
        const tableData = [];
        document.querySelectorAll("#transcriptBody tr").forEach(row => {
            const cols = row.querySelectorAll("td");
            tableData.push([
                cols[0].innerText,
                cols[1].innerText,
                cols[2].innerText,
                cols[3].innerText,
                cols[4].innerText
            ]);
        });

        /* ===== TABLE ===== */
        doc.autoTable({
            startY: 40,
            head: [["Subject", "Credit Hrs", "Marks %", "Grade", "GPA"]],
            body: tableData,
            headStyles: {
                fillColor: primaryColor,
                textColor: [255, 255, 255],
                fontSize: 11,
                halign: "center"
            },
            bodyStyles: {
                fontSize: 10,
                textColor: [50, 50, 50],
                halign: "center"
            },
            alternateRowStyles: {
                fillColor: [245, 247, 255]
            },
            styles: {
                lineWidth: 0.1,
                lineColor: [200, 200, 200]
            }
        });

        /* ===== FINAL GPA ===== */
        let currentY = doc.lastAutoTable.finalY + 15;
        const finalGPA = document.getElementById("finalGPA").innerText;

        doc.setFontSize(14);
        doc.setTextColor(...primaryColor);
        doc.text(`Final GPA: ${finalGPA}`, 105, currentY, { align: "center" });

        currentY += 20;

        /* ================================================= */
        /* ================ FEEDBACK SECTION =============== */
        /* ================================================= */

        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(0.4);
        doc.line(25, currentY, 185, currentY);

        currentY += 10;

        doc.setFontSize(13);
        doc.setTextColor(...primaryColor);
        doc.text("Feedback & Suggestions", 105, currentY, { align: "center" });

        currentY += 8;

        doc.setFontSize(10);
        doc.setTextColor(...darkGray);
        doc.text(
            "Your feedback helps us improve this GPA Calculator. Share your experience using the options below:",
            105,
            currentY,
            { align: "center", maxWidth: 170 }
        );

        currentY += 10;

        doc.setTextColor(0, 0, 255);

        doc.textWithLink(
            "Submit Feedback via Google Form",
            105,
            currentY,
            {
                url: "https://forms.gle/n6USbix9sTrg9S7F6",
                align: "center"
            }
        );

        currentY += 7;

        doc.textWithLink(
            "Send Feedback via Email",
            105,
            currentY,
            {
                url: "mailto:sumerfreelance@gmail.com?subject=GPA Calculator Feedback",
                align: "center"
            }
        );

        /* ===== FOOTER ===== */
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(
            "This is a system-generated transcript and does not require signature.",
            105,
            285,
            { align: "center" }
        );

        doc.save("Academic_Transcript.pdf");
    };
}
