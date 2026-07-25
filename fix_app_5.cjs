const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

// 1. Categories UI boxy
content = content.replace(/rounded-full bg-slate-50 hover:\[#1E56A0\] group/g, 'rounded bg-slate-50 hover:bg-[#1E56A0] group');
// Wait, the exact string is: className="flex items-center gap-3 py-2 px-4 rounded-full bg-slate-50 hover:bg-[#1E56A0] group transition-all duration-200 border border-slate-200 hover:border-[#1E56A0] flex-shrink-0 snap-center"
content = content.replace('rounded-full bg-slate-50', 'rounded bg-slate-50');

// 2. Remove Finance from everywhere

// Page type
content = content.replace(' | "finance"', '');

// Testimonial 2
content = content.replace('Got my Honda Civic financed through Meezan Bank at a great rate.', 'The purchasing process was quick and completely hassle free.');
// Testimonial 6
content = content.replace('The finance calculator on their website helped me plan my budget perfectly. Got approved for a loan within 48 hours through HBL.', 'The website helped me find the perfect car for my family. Got my vehicle delivered within 48 hours.');

// Head of Finance -> Head of Operations
content = content.replace('role: "Head of Finance"', 'role: "Head of Operations"');

// Navbar Link
content = content.replace('    { label: "Finance", page: "finance" },\n', '');

// Why Choose Us - Finance Feature -> Fast Process
content = content.replace(/\{ icon: Banknote, title: "Easy Financing", desc: "Bank loan approvals within 48 hours through HBL UBL Meezan Bank and Bank Alfalah." \},/,
  '{ icon: Banknote, title: "Fast Process", desc: "Complete your car purchase in less than 24 hours with our streamlined and efficient process." },');

// CarDetailsPage: Loan Calculator block
content = content.replace(/\{\/\* Loan Calculator \*\/\}[\s\S]*?<\/\div>\n\s*<\/\div>\n\n\s*\{\/\* Right: Pricing \+ Actions \*\/\}/, '</div>\n\n          {/* Right: Pricing + Actions */}');

// CarDetailsPage: Apply for Finance button
content = content.replace(/<button onClick=\{\(\) => setPage\("finance"\)\} className="w-full border border-\[#1E56A0\] text-\[#1E56A0\] hover:bg-blue-50 font-bold text-sm py-3 rounded transition-colors flex items-center justify-center gap-2">[\s\S]*?<\/button>\n\s*/, '');

// FinancePage Component
content = content.replace(/\/\/ ─── FINANCE PAGE ─────────────────────────────────────────────────────────────[\s\S]*?\/\/ ─── ABOUT PAGE/, '// ─── ABOUT PAGE');

// Footer Link
content = content.replace('["Car Financing", "finance"], ', '');

// App component: render FinancePage
content = content.replace('      {page === "finance" && <FinancePage setPage={navigate} />}\n', '');

// Also remove from App description text (like line 319, 1420, 1437)
content = content.replace(', bank financing,', ',');
content = content.replace(', and seamless financing', '');
content = content.replace('Launched car financing partnerships with HBL, UBL, and Meezan Bank. ', '');


fs.writeFileSync('src/app/App.tsx', content);
console.log("Done updates 5");
