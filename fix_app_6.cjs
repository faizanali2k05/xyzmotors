const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

// The replacement content for AdminDashboard
const newAdminDashboard = `const AdminDashboard = ({ adminAuth, setAdminAuth, setAdminOpen, forceUpdate }: any) => {
    const [view, setView] = useState("list");
    const [editCar, setEditCar] = useState<any>(null);
    const [password, setPassword] = useState("");

    // Prevent body scroll when dashboard is open to avoid double scroll glitch
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = "unset"; };
    }, []);

    if (!adminAuth) {
      return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Shield className="w-6 h-6 text-[#1E56A0]" />
            </div>
            <h2 className="text-xl font-bold mb-6 text-center text-[#0D1B2A]">Admin Authentication</h2>
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              className="w-full border border-slate-200 rounded-lg p-3 mb-6 text-[#0D1B2A] focus:outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0]" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  if (password === "xyzadmin") setAdminAuth(true);
                  else alert("Incorrect Password");
                }
              }}
            />
            <div className="flex gap-3">
              <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold p-3 rounded-lg transition-colors" onClick={() => setAdminOpen(false)}>Cancel</button>
              <button className="flex-1 bg-[#1E56A0] hover:bg-[#0F2B4C] text-white font-semibold p-3 rounded-lg transition-colors" onClick={() => {
                if (password === "xyzadmin") setAdminAuth(true);
                else alert("Incorrect Password");
              }}>Login</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-slate-50 z-[100] overflow-y-auto text-[#0D1B2A]">
        {/* Sticky Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1E56A0] rounded flex items-center justify-center">
                <Settings2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-[#0D1B2A] leading-none">XYZ Motors</h1>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { 
                setEditCar({ id: Date.now(), make:"", model:"", variant:"", year:2024, price:0, mileage:0, transmission:"Automatic", fuel:"Petrol", city:"Lahore", condition:"New", bodyType:"Sedan", img:"", featured: false, badge: "" }); 
                setView("edit"); 
              }} className="bg-[#1E56A0] hover:bg-[#0F2B4C] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Car
              </button>
              <button onClick={() => setAdminOpen(false)} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                <X className="w-4 h-4" /> Close
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          {view === "list" && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-bold text-slate-700">Vehicle Inventory ({VEHICLES.length})</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {VEHICLES.map(v => (
                  <div key={v.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                    <img src={v.img} alt="car" className="w-24 h-16 object-cover rounded-md border border-slate-200 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-[#0D1B2A] text-lg leading-none">{v.make} {v.model} <span className="font-medium text-slate-500">{v.year}</span></h3>
                        {v.badge && <span className="px-2 py-0.5 text-[10px] font-bold rounded-sm bg-blue-100 text-[#1E56A0] uppercase">{v.badge}</span>}
                      </div>
                      <p className="text-sm text-slate-500 font-medium">
                        {v.variant} • Rs. {v.price.toLocaleString()} • {v.city} • {v.condition}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <button onClick={() => { setEditCar({...v}); setView("edit"); }} className="bg-white border border-slate-200 hover:border-[#1E56A0] hover:text-[#1E56A0] text-slate-600 px-3 py-1.5 rounded text-xs font-bold transition-colors">Edit</button>
                      <button onClick={() => {
                        v.badge = "Hot Sale";
                        forceUpdate((p: number) => p + 1);
                      }} className="bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-600 hover:text-white px-3 py-1.5 rounded text-xs font-bold transition-colors">Hot Sale</button>
                      <button onClick={() => {
                        v.badge = "Sold Out";
                        forceUpdate((p: number) => p + 1);
                      }} className="bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded text-xs font-bold transition-colors">Mark Sold</button>
                      <button onClick={() => {
                        if(confirm('Are you sure you want to delete this car?')) {
                          VEHICLES = VEHICLES.filter(x => x.id !== v.id);
                          forceUpdate((p: number) => p + 1);
                        }
                      }} className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded text-xs font-bold transition-colors">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "edit" && editCar && (
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold mb-6 text-[#0D1B2A]">{editCar.id > 1000000000 ? "Add New Vehicle" : "Edit Vehicle Details"}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Make</label>
                  <input value={editCar.make} onChange={e => setEditCar({...editCar, make: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Model</label>
                  <input value={editCar.model} onChange={e => setEditCar({...editCar, model: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Variant</label>
                  <input value={editCar.variant} onChange={e => setEditCar({...editCar, variant: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Year</label>
                  <input type="number" value={editCar.year} onChange={e => setEditCar({...editCar, year: parseInt(e.target.value) || new Date().getFullYear()})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Price (PKR)</label>
                  <input type="number" value={editCar.price} onChange={e => setEditCar({...editCar, price: parseInt(e.target.value) || 0})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mileage (km)</label>
                  <input type="number" value={editCar.mileage} onChange={e => setEditCar({...editCar, mileage: parseInt(e.target.value) || 0})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image URL</label>
                  <input value={editCar.img} onChange={e => setEditCar({...editCar, img: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">City</label>
                  <input value={editCar.city} onChange={e => setEditCar({...editCar, city: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Condition</label>
                  <select value={editCar.condition} onChange={e => setEditCar({...editCar, condition: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]">
                    <option value="New">New</option><option value="Used">Used</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Body Type</label>
                  <select value={editCar.bodyType} onChange={e => setEditCar({...editCar, bodyType: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]">
                    <option value="Sedan">Sedan</option><option value="SUV">SUV</option><option value="Hatchback">Hatchback</option><option value="Crossover">Crossover</option><option value="Pickup">Pickup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Transmission</label>
                  <select value={editCar.transmission} onChange={e => setEditCar({...editCar, transmission: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]">
                    <option value="Automatic">Automatic</option><option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Fuel Type</label>
                  <select value={editCar.fuel} onChange={e => setEditCar({...editCar, fuel: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]">
                    <option value="Petrol">Petrol</option><option value="Diesel">Diesel</option><option value="Hybrid">Hybrid</option><option value="Electric">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Custom Badge</label>
                  <input placeholder="e.g. Best Seller" value={editCar.badge || ''} onChange={e => setEditCar({...editCar, badge: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <input type="checkbox" id="featured" checked={editCar.featured || false} onChange={e => setEditCar({...editCar, featured: e.target.checked})} className="w-5 h-5 accent-[#1E56A0] rounded" />
                <label htmlFor="featured" className="font-bold text-[#0D1B2A] cursor-pointer">Mark as Featured Vehicle (Shows on Home Page)</label>
              </div>

              <div className="flex gap-3 justify-end pt-6 border-t border-slate-200">
                <button onClick={() => setView("list")} className="px-6 py-3 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button onClick={() => {
                  const idx = VEHICLES.findIndex(x => x.id === editCar.id);
                  if (idx >= 0) VEHICLES[idx] = editCar;
                  else VEHICLES.unshift(editCar);
                  forceUpdate((p: number) => p + 1);
                  setView("list");
                }} className="px-8 py-3 rounded-lg font-bold text-white bg-[#1E56A0] hover:bg-[#0F2B4C] transition-colors shadow-lg shadow-blue-900/20">Save Vehicle</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };`;

content = content.replace(/const AdminDashboard = \(\{ adminAuth, setAdminAuth, setAdminOpen, forceUpdate \}: any\) => \{[\s\S]*?    \);\n  \};\n/, newAdminDashboard + '\n');

fs.writeFileSync('src/app/App.tsx', content);
console.log("Done updates 6");
