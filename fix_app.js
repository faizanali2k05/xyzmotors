const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

// 1. Remove dash line & hyphens in dealership wording (and keep simple)
content = content.replace('<div className="w-8 h-px bg-[#1E56A0]" />', '');

// 2 & 3 & 8. We can use multi_replace_file_content for these, or do it here.
// Let's just do it all in Node to be robust!

// 4. Remove Bank Partners section
content = content.replace(/\{\/\* BANK PARTNERS \*\/\}[\s\S]*?\{\/\* STATISTICS \*\/\}/, '{/* STATISTICS */}');

// 5. Remove Latest News & Buying Guides section (BLOG)
content = content.replace(/\{\/\* BLOG \*\/\}[\s\S]*?\{\/\* CTA BANNER \*\/\}/, '{/* CTA BANNER */}');

// 6. Compact Categories Bar (Sedans, SUVs)
content = content.replace(/<div className="grid grid-cols-3 sm:grid-cols-6 gap-3">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
`<div className="flex overflow-x-auto snap-x hide-scrollbar gap-3 pb-2">
            {[
              { icon: Car, label: "Sedans", count: 7 },
              { icon: Package, label: "SUVs", count: 8 },
              { icon: Gauge, label: "Hatchbacks", count: 4 },
              { icon: Navigation, label: "Crossovers", count: 3 },
              { icon: Wrench, label: "Pickups", count: 2 },
              { icon: Wallet, label: "Budget Cars", count: 5 },
            ].map(({ icon: Icon, label, count }) => (
              <button key={label} onClick={() => setPage("inventory")} className="flex items-center gap-3 py-2 px-4 rounded-full bg-slate-50 hover:bg-[#1E56A0] group transition-all duration-200 border border-slate-200 hover:border-[#1E56A0] flex-shrink-0 snap-center">
                <Icon className="w-4 h-4 text-[#1E56A0] group-hover:text-white transition-colors" />
                <span className="text-xs font-bold text-slate-700 group-hover:text-white transition-colors">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>`);

// 7. Fix Dream word
content = content.replace('<span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.5)" }}>Dream</span>', '<span>Dream</span>');

// 8. Modify Our Values
content = content.replace(/\{\/\* Values \*\/\}[\s\S]*?\{\/\* Team \*\/\}/, 
`{/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeader eyebrow="Our Values" title="Customer First Philosophy" subtitle="Everything we do is guided by these core principles." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{ icon: Shield, label: "Trust", desc: "We operate with complete transparency no hidden fees no misleading claims." }, { icon: Award, label: "Excellence", desc: "Certified processes ensure every interaction exceeds your expectations." }, { icon: ThumbsUp, label: "Integrity", desc: "Honest valuations and fair pricing always. Our reputation is our greatest asset." }, { icon: Headphones, label: "Care", desc: "Our relationship with customers doesn't end at sale it begins there." }].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300 text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-[#1E56A0] transition-colors duration-300">
                  <Icon className="w-8 h-8 text-[#1E56A0] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-black text-[#0D1B2A] mb-3">{label}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}`);

// 9 & 10. Footer changes
content = content.replace(/<footer className="bg-\[#060E1A\] text-white">[\s\S]*?<\/footer>/,
`<footer className="bg-[#060E1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-400">© 2026 XYZ Motors. All rights reserved.</p>
        <p className="text-sm font-medium text-slate-400">
          Designed and Developed by <a href="https://www.instagram.com/norvexmanagement/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Norvex Management</a>
        </p>
      </div>
    </footer>`);

// 11. Taskbar "Design Premium Car Dealership" (actually "Certified Dealership" in App.tsx) -> "XYZ Motors" only
// Wait, the navbar has `<span className="text-[10px] font-semibold text-slate-400 tracking-[0.15em] uppercase">Certified Dealership</span>`. I will remove that.
content = content.replace('<span className="text-[10px] font-semibold text-slate-400 tracking-[0.15em] uppercase">Certified Dealership</span>', '');

// 2. Pakistan's Most Trusted Dealership 8 boxes
content = content.replace(/<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*\{\/\* TESTIMONIALS \*\/\}/, 
`<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Verified Vehicles", desc: "Every car undergoes a rigorous 150 point inspection before listing. No hidden damage no surprises." },
              { icon: Banknote, title: "Easy Financing", desc: "Bank loan approvals within 48 hours through HBL UBL Meezan Bank and Bank Alfalah." },
              { icon: Award, title: "Certified Dealership", desc: "PAMA registered and ISO certified dealership with over 18 years of industry presence in Pakistan." },
              { icon: Headphones, title: "24/7 After Sale Support", desc: "Our dedicated support team is available around the clock for any post purchase assistance." },
              { icon: BadgeCheck, title: "Transparent Pricing", desc: "Fixed no negotiation pricing with complete cost breakdown. No hidden fees or surprise charges." },
              { icon: Globe, title: "Nationwide Delivery", desc: "We deliver your purchased or rented vehicle to any major city across Pakistan within 48 hours." },
              { icon: Wrench, title: "Free Inspection", desc: "Complimentary pre purchase vehicle health check for all certified pre owned vehicles at our workshops." },
              { icon: FileText, title: "Clear Documentation", desc: "We handle all transfer paperwork tax clearance and registration formalities on your behalf." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="relative bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-[#1E56A0] transition-colors duration-300 shadow-sm">
                  <Icon className="w-6 h-6 text-[#1E56A0] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="relative text-base font-extrabold text-[#0D1B2A] mb-3 tracking-tight">{title}</h3>
                <p className="relative text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}`);

// 3. Simple Steps to Your New Car
content = content.replace(/<div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              { step: "01", icon: Search, title: "Browse & Select", desc: "Search our verified listings by brand model price city and more." },
              { step: "02", icon: Eye, title: "Book Inspection", desc: "Schedule a free vehicle inspection or a test drive at your convenience." },
              { step: "03", icon: Calculator, title: "Apply for Finance", desc: "Get pre approved for a bank loan within 48 hours through our partner banks." },
              { step: "04", icon: Car, title: "Drive Home", desc: "Complete the paperwork make your payment and drive off in your new car." },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -mr-8 -mt-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="text-5xl font-black text-slate-100 absolute -bottom-4 -right-4 group-hover:-translate-y-2 transition-transform duration-300">{step}</div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1E56A0] to-[#0F2B4C] flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-3 relative z-10">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium relative z-10">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>`);

// Make VEHICLES a 'let'
content = content.replace('const VEHICLES: Vehicle[] = [', 'let VEHICLES: Vehicle[] = [');

// Add Admin Dashboard logic
// Let's insert a state in App and an Admin Modal
content = content.replace('export default function App() {', 
`export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "a") {
        setAdminOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const AdminDashboard = () => {
    const [view, setView] = useState("list");
    const [editCar, setEditCar] = useState<any>(null);

    if (!adminAuth) {
      return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Admin Login</h2>
            <input type="password" placeholder="Password" className="w-full border rounded p-2 mb-4" value={password} onChange={e => setPassword(e.target.value)} />
            <div className="flex gap-2">
              <button className="flex-1 bg-slate-200 p-2 rounded" onClick={() => setAdminOpen(false)}>Cancel</button>
              <button className="flex-1 bg-blue-600 text-white p-2 rounded" onClick={() => {
                if (password === "xyzadmin") setAdminAuth(true);
                else alert("Incorrect Password");
              }}>Login</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-4">
              <button onClick={() => { setEditCar({ id: Date.now(), make:"", model:"", variant:"", year:2024, price:0, mileage:0, transmission:"Automatic", fuel:"Petrol", city:"", condition:"New", bodyType:"Sedan", img:"" }); setView("edit"); }} className="bg-green-600 text-white px-4 py-2 rounded font-bold">+ Add Car</button>
              <button onClick={() => setAdminOpen(false)} className="bg-red-600 text-white px-4 py-2 rounded font-bold">Close</button>
            </div>
          </div>

          {view === "list" && (
            <div className="grid gap-4">
              {VEHICLES.map(v => (
                <div key={v.id} className="flex items-center gap-4 border p-4 rounded bg-slate-50">
                  <img src={v.img} alt="car" className="w-24 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-bold">{v.make} {v.model} {v.year}</h3>
                    <p className="text-sm text-slate-500">Rs. {v.price.toLocaleString()} | {v.condition}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditCar({...v}); setView("edit"); }} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => {
                      VEHICLES = VEHICLES.filter(x => x.id !== v.id);
                      forceUpdate(p => p + 1);
                    }} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                    <button onClick={() => {
                      v.badge = "Sold Out";
                      forceUpdate(p => p + 1);
                    }} className="bg-orange-500 text-white px-3 py-1 rounded">Mark Sold</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === "edit" && editCar && (
            <div className="max-w-2xl bg-slate-50 p-6 rounded border">
              <h2 className="font-bold mb-4">{editCar.id > 1000 ? "Edit Car" : "Add New Car"}</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input placeholder="Make" value={editCar.make} onChange={e => setEditCar({...editCar, make: e.target.value})} className="border p-2 rounded" />
                <input placeholder="Model" value={editCar.model} onChange={e => setEditCar({...editCar, model: e.target.value})} className="border p-2 rounded" />
                <input placeholder="Variant" value={editCar.variant} onChange={e => setEditCar({...editCar, variant: e.target.value})} className="border p-2 rounded" />
                <input placeholder="Year" type="number" value={editCar.year} onChange={e => setEditCar({...editCar, year: parseInt(e.target.value)})} className="border p-2 rounded" />
                <input placeholder="Price" type="number" value={editCar.price} onChange={e => setEditCar({...editCar, price: parseInt(e.target.value)})} className="border p-2 rounded" />
                <input placeholder="Mileage" type="number" value={editCar.mileage} onChange={e => setEditCar({...editCar, mileage: parseInt(e.target.value)})} className="border p-2 rounded" />
                <input placeholder="Image URL" value={editCar.img} onChange={e => setEditCar({...editCar, img: e.target.value})} className="border p-2 rounded col-span-2" />
                <input placeholder="City" value={editCar.city} onChange={e => setEditCar({...editCar, city: e.target.value})} className="border p-2 rounded" />
                <select value={editCar.condition} onChange={e => setEditCar({...editCar, condition: e.target.value})} className="border p-2 rounded"><option>New</option><option>Used</option></select>
                <select value={editCar.bodyType} onChange={e => setEditCar({...editCar, bodyType: e.target.value})} className="border p-2 rounded"><option>Sedan</option><option>SUV</option><option>Hatchback</option><option>Crossover</option><option>Pickup</option></select>
                <select value={editCar.transmission} onChange={e => setEditCar({...editCar, transmission: e.target.value})} className="border p-2 rounded"><option>Automatic</option><option>Manual</option></select>
                <select value={editCar.fuel} onChange={e => setEditCar({...editCar, fuel: e.target.value})} className="border p-2 rounded"><option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>CNG</option></select>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  const idx = VEHICLES.findIndex(x => x.id === editCar.id);
                  if (idx >= 0) VEHICLES[idx] = editCar;
                  else VEHICLES.unshift(editCar);
                  forceUpdate(p => p + 1);
                  setView("list");
                }} className="bg-green-600 text-white px-4 py-2 rounded font-bold">Save</button>
                <button onClick={() => setView("list")} className="bg-slate-300 px-4 py-2 rounded font-bold">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

`);

// Also need to render AdminDashboard in App
content = content.replace('{/* WhatsApp FAB */}', 
`{adminOpen && <AdminDashboard />}
      {/* WhatsApp FAB */}`);

fs.writeFileSync('src/app/App.tsx', content);

let htmlContent = fs.readFileSync('index.html', 'utf8');
htmlContent = htmlContent.replace('<title>Design Premium Car Dealership Website</title>', '<title>XYZ Motors</title>\n      <link rel="icon" type="image/png" href="https://static.vecteezy.com/system/resources/thumbnails/027/385/442/small/car-stainless-logo-png.png" />');
fs.writeFileSync('index.html', htmlContent);

console.log("Done updates!");
