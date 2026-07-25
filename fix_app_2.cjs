const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

// 1. Move AdminDashboard outside App
content = content.replace(/const AdminDashboard = \(\) => \{[\s\S]*?    \};\s*const \[page, setPage\]/, 
`const [page, setPage]`); // removed AdminDashboard from inside App

// Inject AdminDashboard above App
content = content.replace('export default function App() {', 
`const AdminDashboard = ({ adminAuth, setAdminAuth, setAdminOpen, forceUpdate }: any) => {
    const [view, setView] = useState("list");
    const [editCar, setEditCar] = useState<any>(null);
    const [password, setPassword] = useState("");

    if (!adminAuth) {
      return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-[#0D1B2A]">Admin Login</h2>
            <input type="password" placeholder="Password" className="w-full border rounded p-2 mb-4 text-[#0D1B2A]" value={password} onChange={e => setPassword(e.target.value)} />
            <div className="flex gap-2">
              <button className="flex-1 bg-slate-200 text-[#0D1B2A] p-2 rounded" onClick={() => setAdminOpen(false)}>Cancel</button>
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
      <div className="fixed inset-0 bg-white z-[100] overflow-y-auto text-[#0D1B2A]">
        <div className="max-w-5xl mx-auto p-6">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-4">
              <button onClick={() => { setEditCar({ id: Date.now(), make:"", model:"", variant:"", year:2024, price:0, mileage:0, transmission:"Automatic", fuel:"Petrol", city:"", condition:"New", bodyType:"Sedan", img:"", featured: false, badge: "" }); setView("edit"); }} className="bg-green-600 text-white px-4 py-2 rounded font-bold">+ Add Car</button>
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
                    <p className="text-sm text-slate-500">Rs. {v.price.toLocaleString()} | {v.condition} {v.badge ? \`| Badge: \${v.badge}\` : ""}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => { setEditCar({...v}); setView("edit"); }} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => {
                      VEHICLES = VEHICLES.filter(x => x.id !== v.id);
                      forceUpdate((p: number) => p + 1);
                    }} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                    <button onClick={() => {
                      v.badge = "Sold Out";
                      forceUpdate((p: number) => p + 1);
                    }} className="bg-orange-500 text-white px-3 py-1 rounded">Mark Sold</button>
                    <button onClick={() => {
                      v.badge = "Hot Sale";
                      forceUpdate((p: number) => p + 1);
                    }} className="bg-purple-600 text-white px-3 py-1 rounded">Hot Sale</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === "edit" && editCar && (
            <div className="max-w-2xl bg-slate-50 p-6 rounded border">
              <h2 className="font-bold mb-4">{editCar.id > 1000 ? "Add New Car" : "Edit Car"}</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input placeholder="Make" value={editCar.make} onChange={e => setEditCar({...editCar, make: e.target.value})} className="border p-2 rounded" />
                <input placeholder="Model" value={editCar.model} onChange={e => setEditCar({...editCar, model: e.target.value})} className="border p-2 rounded" />
                <input placeholder="Variant" value={editCar.variant} onChange={e => setEditCar({...editCar, variant: e.target.value})} className="border p-2 rounded" />
                <input placeholder="Year" type="number" value={editCar.year} onChange={e => setEditCar({...editCar, year: parseInt(e.target.value)})} className="border p-2 rounded" />
                <input placeholder="Price" type="number" value={editCar.price} onChange={e => setEditCar({...editCar, price: parseInt(e.target.value)})} className="border p-2 rounded" />
                <input placeholder="Mileage" type="number" value={editCar.mileage} onChange={e => setEditCar({...editCar, mileage: parseInt(e.target.value)})} className="border p-2 rounded" />
                <input placeholder="Image URL" value={editCar.img} onChange={e => setEditCar({...editCar, img: e.target.value})} className="border p-2 rounded col-span-2" />
                <input placeholder="City" value={editCar.city} onChange={e => setEditCar({...editCar, city: e.target.value})} className="border p-2 rounded" />
                <select value={editCar.condition} onChange={e => setEditCar({...editCar, condition: e.target.value})} className="border p-2 rounded"><option value="New">New</option><option value="Used">Used</option></select>
                <select value={editCar.bodyType} onChange={e => setEditCar({...editCar, bodyType: e.target.value})} className="border p-2 rounded"><option value="Sedan">Sedan</option><option value="SUV">SUV</option><option value="Hatchback">Hatchback</option><option value="Crossover">Crossover</option><option value="Pickup">Pickup</option></select>
                <select value={editCar.transmission} onChange={e => setEditCar({...editCar, transmission: e.target.value})} className="border p-2 rounded"><option value="Automatic">Automatic</option><option value="Manual">Manual</option></select>
                <select value={editCar.fuel} onChange={e => setEditCar({...editCar, fuel: e.target.value})} className="border p-2 rounded"><option value="Petrol">Petrol</option><option value="Diesel">Diesel</option><option value="Hybrid">Hybrid</option><option value="CNG">CNG</option></select>
                <input placeholder="Badge (Optional)" value={editCar.badge || ''} onChange={e => setEditCar({...editCar, badge: e.target.value})} className="border p-2 rounded" />
                <label className="flex items-center gap-2"><input type="checkbox" checked={editCar.featured || false} onChange={e => setEditCar({...editCar, featured: e.target.checked})} /> Featured</label>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  const idx = VEHICLES.findIndex(x => x.id === editCar.id);
                  if (idx >= 0) VEHICLES[idx] = editCar;
                  else VEHICLES.unshift(editCar);
                  forceUpdate((p: number) => p + 1);
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

export default function App() {`);

// Also fix AdminDashboard call in App
content = content.replace('{adminOpen && <AdminDashboard />}', '{adminOpen && <AdminDashboard adminAuth={adminAuth} setAdminAuth={setAdminAuth} setAdminOpen={setAdminOpen} forceUpdate={forceUpdate} />}');

// Remove unused state in App
content = content.replace('const [password, setPassword] = useState("");\n', '');

// 2. Remove "Pakistan's Premium Dealership" line
content = content.replace('<span className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400">Pakistan\'s Premium Dealership</span>', '');

// 3. Update SectionHeader
content = content.replace('function SectionHeader({ eyebrow, title, subtitle, light = false }: { eyebrow: string; title: string; subtitle?: string; light?: boolean }) {', 
`function SectionHeader({ eyebrow, title, subtitle, light = false, center = false }: { eyebrow: string; title: string; subtitle?: string; light?: boolean; center?: boolean }) {`);
content = content.replace('{subtitle && <p className={`mt-3 text-base ${light ? "text-slate-300" : "text-slate-500"} max-w-2xl`}>{subtitle}</p>}', 
`{subtitle && <p className={\`mt-3 text-base \${light ? "text-slate-300" : "text-slate-500"} max-w-2xl \${center ? "mx-auto" : ""}\`}>{subtitle}</p>}`);

// Fix where SectionHeader is centered:
// Simple Steps to Your New Car
content = content.replace('<SectionHeader eyebrow="Buying Process" title="Simple Steps to Your New Car" subtitle="We have streamlined the buying process so you can drive home your dream car in as little as 24 hours." />', 
'<SectionHeader eyebrow="Buying Process" title="Simple Steps to Your New Car" subtitle="We have streamlined the buying process so you can drive home your dream car in as little as 24 hours." center={true} />');

// Our Values
content = content.replace('<SectionHeader eyebrow="Our Values" title="Customer First Philosophy" subtitle="Everything we do is guided by these core principles." />', 
'<SectionHeader eyebrow="Our Values" title="Customer First Philosophy" subtitle="Everything we do is guided by these core principles." center={true} />');

// 4. Redesign Buying Process steps to be super simple
content = content.replace(/<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, 
`<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", icon: Search, title: "Browse & Select", desc: "Search our verified listings by brand model price city and more." },
              { step: "02", icon: Eye, title: "Book Inspection", desc: "Schedule a free vehicle inspection or a test drive at your convenience." },
              { step: "03", icon: Calculator, title: "Apply for Finance", desc: "Get pre approved for a bank loan within 48 hours through our partner banks." },
              { step: "04", icon: Car, title: "Drive Home", desc: "Complete the paperwork make your payment and drive off in your new car." },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center group">
                <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[#1E56A0] transition-colors duration-300">
                  <Icon className="w-8 h-8 text-[#1E56A0] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="inline-block px-3 py-1 bg-slate-100 text-[#1E56A0] font-bold text-xs rounded-full mb-3">{step}</div>
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[250px] mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>`);

// Fix handleKeyDown missing typings
content = content.replace('const handleKeyDown = (e) => {', 'const handleKeyDown = (e: KeyboardEvent) => {');


fs.writeFileSync('src/app/App.tsx', content);
console.log("Done updates 2!");
